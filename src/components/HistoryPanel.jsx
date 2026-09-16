export default function HistoryPanel({ query, onQueryChange, results, onSelect, activeId }) {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-16">
      <div className="flex items-center justify-between">
        <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--color-ink)]">
          Project memory
        </h3>
        <span className="text-xs text-[var(--color-ink-soft)]">
          {results.length} {results.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      <input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search past decisions, tasks, or discussions…"
        className="mt-3 w-full rounded-md border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-soft)] focus:outline-none focus:border-[var(--color-blueprint)]"
      />

      {results.length === 0 ? (
        <p className="mt-6 text-sm text-[var(--color-ink-soft)]">
          {query ? "Nothing matches that search yet." : "Extractions you run will show up here, searchable later."}
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-[var(--color-line)] border border-[var(--color-line)] rounded-lg bg-[var(--color-panel)]">
          {results.map((entry) => (
            <li key={entry.id}>
              <button
                onClick={() => onSelect(entry)}
                className={`w-full text-left px-4 py-3 hover:bg-[var(--color-paper)] transition-colors ${
                  activeId === entry.id ? "bg-[var(--color-blueprint-soft)]" : ""
                }`}
              >
                <p className="text-sm text-[var(--color-ink)] line-clamp-2">{entry.summary}</p>
                <p className="mt-1 text-xs text-[var(--color-ink-soft)]">
                  {new Date(entry.createdAt).toLocaleString()} · {entry.tasks.length} tasks ·{" "}
                  {entry.decisions.length} decisions
                </p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
