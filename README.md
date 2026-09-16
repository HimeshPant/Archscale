# PulseBoard

Paste a messy project conversation — WhatsApp thread, email chain, or meeting notes —
and get a structured summary, action items, decisions, risks, pending dependencies,
and source evidence. Every extraction is saved locally and searchable later as a
lightweight project memory.

Built for the ArchScale Guild Intern Technology Hackathon — AS-02:
“Make project communication intelligent, not overwhelming.”

## The problem

Important project information is often buried in long conversations: missing approvals,
outdated drawings, supplier delays, unclear ownership, and upcoming deadlines.
PulseBoard turns this communication into information that a project team can act on.

## Run it

```bash
npm install
npx vercel dev
Create a .env file in the project root:
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
Get a Gemini API key from Google AI Studio.
Use npx vercel dev for live Gemini extraction. npm run dev runs the UI only.
The Load sample demo button always works without Gemini.

What it does
- Extracts a factual conversation summary
- Identifies tasks, owners, and deadlines
- Captures decisions and pending approvals
- Flags project risks and required actions
- Shows pending drawings, sign-offs, and dependencies
- Adds source speaker/channel and supporting quote to extracted items
- Saves past extractions in localStorage for searchable project memory
- Includes a preloaded sample demo for reliable presentations
How it works
React + Vite interface
        ↓
POST /api/gemini
        ↓
Vercel serverless function
        ↓
Gemini structured JSON output
        ↓
Results dashboard + localStorage project memory
Key decisions
- Structured Gemini JSON: reliable fields instead of parsing free-text AI output.
- Serverless API endpoint: keeps the Gemini key out of the browser.
- localStorage: enough to demonstrate project memory without adding backend scope.
- Source traceability: lets reviewers verify each AI result against its source message.
- Sample demo: provides a transparent fallback when network or API access is unavailable.
AI usage
Gemini is used to extract project intelligence from raw communication into structured
summary, tasks, decisions, risks, and pending items.
AI also helped during development with prompt refinement, schema design, product
feedback, and UI/content review. Final implementation and scope decisions were made
by the project author.
Project structure
api/
  gemini.js                 secure Gemini serverless endpoint

src/
  components/
    ConversationInput.jsx   input, sample demo, clear action
    ResultsPanel.jsx        dashboard, tasks, risks, source evidence
    HistoryPanel.jsx        searchable project memory
  lib/
    gemini.js               browser request to /api/gemini
    sample.js               preloaded demo data
    storage.js              localStorage history and search
  App.jsx                   application state and workflow
Deliberately out of scope
- Live WhatsApp or Gmail integrations
- Authentication and multi-user collaboration
- Database and complex backend
- Semantic/vector search
- Full task-management system
The goal is one complete workflow:
Messy project conversation
→ AI extraction
→ clear, actionable project intelligence
What I would build next
- Convert extracted items into tracked project tasks
- Add approval/review controls before committing AI results
- Add live WhatsApp, Gmail, and meeting-note ingestion
- Add semantic search for questions such as “What did we decide about the bathroom?”
- Add deadline alerts for unresolved risks and approvals
Submission links

- Deployed prototype: ADD_VERCEL_URL
- 3–5 minute walkthrough video: ADD_VIDEO_URL