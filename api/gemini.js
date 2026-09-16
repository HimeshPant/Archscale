const MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash"

const SOURCE_FIELDS = {
  source: {
    type: "string",
    description: "Source in the format 'Channel · Speaker', for example 'WhatsApp - Site Group · Suresh (Supplier)'.",
  },
  sourceQuote: {
    type: "string",
    description: "A short exact quote from the source conversation supporting this item.",
  },
}

const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    summary: {
      type: "string",
      description: "A concise 2-4 sentence factual summary of the conversation.",
    },
    tasks: {
      type: "array",
      items: {
        type: "object",
        properties: {
          task: { type: "string" },
          owner: { type: "string" },
          deadline: { type: "string" },
          ...SOURCE_FIELDS,
        },
        required: ["task", "owner", "deadline", "source", "sourceQuote"],
      },
    },
    decisions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          item: { type: "string" },
          status: {
            type: "string",
            enum: ["decided", "pending_approval", "rejected"],
          },
          ...SOURCE_FIELDS,
        },
        required: ["item", "status", "source", "sourceQuote"],
      },
    },
    risks: {
      type: "array",
      items: {
        type: "object",
        properties: {
          issue: { type: "string" },
          impact: { type: "string" },
          actionNeeded: { type: "string" },
          deadline: { type: "string" },
          ...SOURCE_FIELDS,
        },
        required: [
          "issue",
          "impact",
          "actionNeeded",
          "deadline",
          "source",
          "sourceQuote",
        ],
      },
    },
    pending: {
      type: "array",
      items: {
        type: "object",
        properties: {
          item: { type: "string" },
          waitingOn: { type: "string" },
          ...SOURCE_FIELDS,
        },
        required: ["item", "waitingOn", "source", "sourceQuote"],
      },
    },
  },
  required: ["summary", "tasks", "decisions", "risks", "pending"],
}

const SYSTEM_INSTRUCTION = `You are an extraction engine for a construction and architecture project communication tool.

Extract a factual summary, tasks, decisions, risks, and pending items.

For EVERY extracted task, decision, risk, and pending item:
- include "source" in the format "Channel · Speaker";
- include "sourceQuote", a short exact quote from the provided conversation proving the extraction.

Never invent people, dates, facts, source names, quotes, decisions, impacts, or deadlines.
Use "Unassigned" when no task owner is stated.
Use "No deadline given" when no deadline is stated.
Use "Impact not stated" when a risk impact is absent.
Use "No action stated" when risk action is absent.
Use "Not specified" when a pending dependency is absent.
Return empty arrays when no items are present.`

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const rawText = req.body?.rawText?.trim()

  if (!rawText) {
    return res.status(400).json({
      error: "Conversation text is required.",
    })
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({
      error: "GEMINI_API_KEY is not configured on the server.",
    })
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }],
          },
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Extract structured project intelligence from this conversation:\n\n${rawText}`,
                },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: RESPONSE_SCHEMA,
            temperature: 0.2,
          },
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Gemini API error:", response.status, errorText)

      return res.status(502).json({
        error: "Gemini could not process this conversation.",
      })
    }

    const data = await response.json()
    const output = data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!output) {
      return res.status(502).json({
        error: "Gemini returned no content.",
      })
    }

    return res.status(200).json(JSON.parse(output))
  } catch (error) {
    console.error("Project extraction error:", error)

    return res.status(500).json({
      error: "Could not extract project information.",
    })
  }
}