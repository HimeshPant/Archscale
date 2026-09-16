// Lightweight persistence for the demo: everything lives in localStorage
// as "project memory" — no backend needed for a working prototype.

const KEY = "pulseboard_history"

export function loadHistory() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveEntry(entry) {
  const history = loadHistory()
  const next = [entry, ...history]
  localStorage.setItem(KEY, JSON.stringify(next))
  return next
}

export function clearHistory() {
  localStorage.removeItem(KEY)
  return []
}

export function searchHistory(query) {
  const q = query.trim().toLowerCase()
  if (!q) return loadHistory()

  return loadHistory().filter((entry) => {
    const haystack = [
      entry.summary,
      entry.sourceExcerpt,
      ...entry.tasks.map((t) => `${t.task} ${t.owner} ${t.deadline}`),
      ...entry.decisions.map((d) => d.item),
    ]
      .join(" ")
      .toLowerCase()
    return haystack.includes(q)
  })
}
