export default function ConversationInput({
  value,
  onChange,
  onSubmit,
  onLoadSampleDemo,
  onClearWorkspace,
  loading,
  error,
  notice,
  hasContent,
}) {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-8 pt-12">
      <div className="max-w-2xl">
        <h2 className="font-[family-name:var(--font-display)] text-[2.1rem] leading-[1.15] text-[var(--color-ink)]">
          Paste the mess. Get the structure.
        </h2>

        <p className="mt-3 leading-relaxed text-[var(--color-ink-soft)]">
          Drop in a WhatsApp thread, an email chain, or meeting notes exactly as
          they came in — mixed speakers, mixed channels, no cleanup needed.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 rounded-lg border border-[var(--color-blueprint)] bg-[var(--color-panel)] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--color-ink)]">
            Want to see PulseBoard in action?
          </p>
          <p className="mt-1 text-xs text-[var(--color-ink-soft)]">
            Load a realistic project conversation with complete extracted results.
          </p>
        </div>

        <button
          type="button"
          onClick={onLoadSampleDemo}
          className="shrink-0 rounded-md border border-[var(--color-blueprint)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-blueprint)] transition-colors hover:bg-[var(--color-blueprint)] hover:text-white"
        >
          ▶ Load sample demo
        </button>
      </div>

      <div className="mt-4 overflow-hidden rounded-lg border border-[var(--color-line)] bg-[var(--color-panel)]">
        <textarea
          value={value}
          onChange={(event) => {
            onChange(event.target.value)
          }}
          placeholder="Paste a conversation, transcript, or set of messages here..."
          className="h-56 w-full resize-y p-4 text-[15px] leading-relaxed text-[var(--color-ink)] placeholder:text-[var(--color-ink-soft)] focus:outline-none"
        />

        <div className="flex flex-col gap-3 border-t border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onClearWorkspace}
            disabled={!hasContent}
            className="self-start text-sm text-[var(--color-ink-soft)] hover:underline disabled:cursor-not-allowed disabled:opacity-40 sm:self-auto"
          >
            Clear current view
          </button>

          <button
            type="button"
            disabled={!value.trim() || loading}
            onClick={onSubmit}
            className="rounded-md bg-[var(--color-blueprint)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1d4685] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Reading the thread…" : "Extract with Gemini"}
          </button>
        </div>
      </div>

      <p className="mt-3 text-xs text-[var(--color-ink-soft)]">
        The sample demo displays preloaded results and works without Gemini.
      </p>

      {notice && (
        <p className="mt-3 text-sm text-[var(--color-blueprint)]">{notice}</p>
      )}

      {error && (
        <p className="mt-3 text-sm text-[var(--color-site)]">{error}</p>
      )}
    </section>
  )
}