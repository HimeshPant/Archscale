export async function extractFromConversation(rawText) {
  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rawText }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "Could not extract project information.")
  }

  return data
}