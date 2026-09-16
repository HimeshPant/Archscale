# PulseBoard

Paste a messy project conversation — WhatsApp thread, email chain, meeting notes —
and get back a structured summary, task list with owners and deadlines, and a log
of decisions and pending approvals. Every extraction is saved locally and searchable
later, as a lightweight "project memory."

Built for the ArchScale Guild Intern Technology Hackathon — AS-02, "Make project
communication intelligent, not overwhelming."

## Run it

```bash
npm install
cp .env.example .env.local   # then paste your Gemini API key into .env.local
npm run dev
```

Get a free Gemini API key at https://aistudio.google.com/api-keys — no credit card
required, and the free tier is more than enough for demo use.

## How it works

- One structured-output call to Gemini per conversation, using a JSON schema so the
  response is always parseable — no manual regex/parsing of free-text model output.
- Results are stored in `localStorage` (see `src/lib/storage.js`), which is enough
  to demonstrate a searchable project memory without standing up a backend.
- Everything else is a static React app — deployable as-is to Vercel/Netlify.

## Project structure

```
src/
  lib/
    gemini.js      the extraction call: prompt, schema, response parsing
    storage.js      localStorage-backed history + search
  components/
    Header.jsx
    ConversationInput.jsx   the paste-and-extract panel, with a sample thread
    ResultsPanel.jsx        summary / tasks / decisions cards for the latest run
    HistoryPanel.jsx        searchable list of past extractions
  App.jsx           wires state + the above together
  index.css         design tokens (Tailwind v4 @theme) + base styles
```

## Deliberately out of scope (for the demo)

- Multi-source ingestion (live WhatsApp/Gmail API) — paste-in only, by design
- Auth / multi-user permissions
- Semantic (embedding-based) search — currently plain substring search over
  summaries, tasks, and decisions, which is enough to prove the "searchable
  project memory" requirement end-to-end

## What I'd build next

- Real ingestion connectors so this reads live threads instead of pasted text
- Confidence scoring on extracted deadlines/owners, with a review step before
  tasks are considered final
- Vector search over history for fuzzier queries ("what did we agree on for the
  bathroom?") instead of keyword matching
