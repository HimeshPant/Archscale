export default function Header() {
  return (
    <header className="border-b border-[var(--color-line)] bg-[var(--color-panel)]">
      <div className="mx-auto max-w-5xl px-6 py-5 flex items-baseline justify-between">
        <div className="flex items-baseline gap-3">
          <h1 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-ink)]">
            PulseBoard
          </h1>
          <span className="text-sm text-[var(--color-ink-soft)]">
            project communication, structured
          </span>
        </div>
        <p className="hidden sm:block text-sm text-[var(--color-ink-soft)] max-w-xs text-right">
          One thread in, everything that matters out.
        </p>
      </div>
    </header>
  )
}
