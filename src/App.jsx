import { useEffect, useState } from "react"
import Header from "./components/Header"
import ConversationInput from "./components/ConversationInput"
import ResultsPanel from "./components/ResultsPanel"
import HistoryPanel from "./components/HistoryPanel"
import { extractFromConversation } from "./lib/gemini"
import { loadHistory, saveEntry, searchHistory } from "./lib/storage"
import { SAMPLE_CONVERSATION, SAMPLE_RESULT } from "./lib/sample"

export default function App() {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [notice, setNotice] = useState("")
  const [result, setResult] = useState(null)

  const [query, setQuery] = useState("")
  const [history, setHistory] = useState([])
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    setHistory(loadHistory())
  }, [])

  const filtered = query ? searchHistory(query) : history

  function loadSampleDemo(message = "Showing preloaded sample data — Gemini was not called.") {
    const entry = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      sourceExcerpt: SAMPLE_CONVERSATION,
      ...SAMPLE_RESULT,
      isDemo: true,
    }

    const nextHistory = saveEntry(entry)

    setText(SAMPLE_CONVERSATION)
    setError("")
    setNotice(message)
    setResult(entry)
    setHistory(nextHistory)
    setActiveId(entry.id)
  }

  async function handleExtract() {
    setLoading(true)
    setError("")
    setNotice("")

    try {
      const extracted = await extractFromConversation(text)

      const entry = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        sourceExcerpt: text,
        ...extracted,
      }

      const nextHistory = saveEntry(entry)

      setHistory(nextHistory)
      setResult(entry)
      setActiveId(entry.id)
    } catch (error) {
      const isSampleConversation =
        text.trim() === SAMPLE_CONVERSATION.trim()

      if (isSampleConversation) {
        loadSampleDemo(
          "Gemini is unavailable, so PulseBoard is showing clearly labelled preloaded sample data."
        )
      } else {
        setError(error.message || "Something went wrong while extracting.")
      }
    } finally {
      setLoading(false)
    }
  }

  function handleClearWorkspace() {
    setText("")
    setResult(null)
    setError("")
    setNotice("")
    setActiveId(null)
  }

  function handleSelectHistory(entry) {
    setResult(entry)
    setActiveId(entry.id)
    setText(entry.sourceExcerpt)
    setError("")
    setNotice(
      entry.isDemo
        ? "Showing preloaded sample data — Gemini was not called."
        : ""
    )
  }

  return (
    <div className="min-h-full">
      <Header />

      <ConversationInput
        value={text}
        onChange={setText}
        onSubmit={handleExtract}
        onLoadSampleDemo={() => loadSampleDemo()}
        onClearWorkspace={handleClearWorkspace}
        loading={loading}
        error={error}
        notice={notice}
        hasContent={Boolean(text || result || error || notice)}
      />

      <ResultsPanel result={result} />

      <HistoryPanel
        query={query}
        onQueryChange={setQuery}
        results={filtered}
        onSelect={handleSelectHistory}
        activeId={activeId}
      />
    </div>
  )
}