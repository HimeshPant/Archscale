const STATUS_STYLES = {
  decided: {
    label: "Decided",
    bg: "bg-[var(--color-moss-soft)]",
    fg: "text-[var(--color-moss)]",
  },
  pending_approval: {
    label: "Pending approval",
    bg: "bg-[var(--color-site-soft)]",
    fg: "text-[var(--color-site)]",
  },
  rejected: {
    label: "Rejected",
    bg: "bg-[var(--color-line)]",
    fg: "text-[var(--color-ink-soft)]",
  },
}

function SourceEvidence({ item }) {
  if (!item.source && !item.sourceQuote) return null

  return (
    <div className="mt-2 border-t border-[var(--color-line)] pt-2 text-xs text-[var(--color-ink-soft)]">
      {item.source && <p>Source: {item.source}</p>}
      {item.sourceQuote && (
        <p className="mt-1 italic">“{item.sourceQuote}”</p>
      )}
    </div>
  )
}

export default function ResultsPanel({ result }) {
  if (!result) return null

  const tasks = result.tasks || []
  const decisions = result.decisions || []
  const risks = result.risks || []
  const pending = result.pending || []

  return (
    <section className="mx-auto max-w-5xl px-6 pb-16">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-[var(--color-line)] bg-[var(--color-line)] md:grid-cols-4">
        {[
          ["Tasks", tasks.length, "text-[var(--color-ink)]"],
          ["Decisions", decisions.length, "text-[var(--color-ink)]"],
          ["Risks", risks.length, "text-[var(--color-site)]"],
          ["Pending", pending.length, "text-[var(--color-ink)]"],
        ].map(([label, count, color]) => (
          <div key={label} className="bg-[var(--color-panel)] p-4">
            <p className={`text-2xl font-medium ${color}`}>{count}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-[var(--color-ink-soft)]">
              {label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-[var(--color-line)] bg-[var(--color-panel)] p-6">
        <h3 className="text-sm font-medium text-[var(--color-ink-soft)]">Summary</h3>
        <p className="mt-2 leading-relaxed text-[var(--color-ink)]">{result.summary}</p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-[var(--color-line)] bg-[var(--color-panel)] p-6">
          <h3 className="text-sm font-medium text-[var(--color-ink-soft)]">
            Action items {tasks.length > 0 && `(${tasks.length})`}
          </h3>

          <ul className="mt-3 space-y-3">
            {tasks.map((task, index) => (
              <li key={index} className="border-l-2 border-[var(--color-blueprint)] pl-3">
                <p className="leading-snug text-[var(--color-ink)]">{task.task}</p>
                <p className="mt-1 text-xs text-[var(--color-ink-soft)]">
                  {task.owner} · {task.deadline}
                </p>
                <SourceEvidence item={task} />
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-[var(--color-line)] bg-[var(--color-panel)] p-6">
          <h3 className="text-sm font-medium text-[var(--color-ink-soft)]">
            Decisions & approvals {decisions.length > 0 && `(${decisions.length})`}
          </h3>

          <ul className="mt-3 space-y-3">
            {decisions.map((decision, index) => {
              const style = STATUS_STYLES[decision.status] || STATUS_STYLES.decided

              return (
                <li key={index}>
                  <div className="flex items-start gap-2">
                    <span className={`mt-0.5 shrink-0 rounded px-2 py-0.5 text-xs font-medium ${style.bg} ${style.fg}`}>
                      {style.label}
                    </span>
                    <span className="leading-snug text-[var(--color-ink)]">
                      {decision.item}
                    </span>
                  </div>
                  <SourceEvidence item={decision} />
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-[var(--color-site)] bg-[var(--color-panel)] p-6">
          <h3 className="text-sm font-medium text-[var(--color-site)]">
            ⚠ Project risks {risks.length > 0 && `(${risks.length})`}
          </h3>

          <ul className="mt-3 space-y-4">
            {risks.map((risk, index) => (
              <li key={index} className="border-l-2 border-[var(--color-site)] pl-3">
                <p className="leading-snug text-[var(--color-ink)]">{risk.issue}</p>
                <p className="mt-1 text-xs text-[var(--color-ink-soft)]">
                  <span className="font-medium">Impact:</span> {risk.impact}
                </p>
                <p className="mt-1 text-xs text-[var(--color-ink-soft)]">
                  <span className="font-medium">Action needed:</span> {risk.actionNeeded}
                </p>
                <p className="mt-1 text-xs text-[var(--color-ink-soft)]">
                  <span className="font-medium">Due:</span> {risk.deadline}
                </p>
                <SourceEvidence item={risk} />
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-[var(--color-line)] bg-[var(--color-panel)] p-6">
          <h3 className="text-sm font-medium text-[var(--color-ink-soft)]">
            Pending items {pending.length > 0 && `(${pending.length})`}
          </h3>

          <ul className="mt-3 space-y-3">
            {pending.map((item, index) => (
              <li key={index} className="border-l-2 border-[var(--color-blueprint)] pl-3">
                <p className="leading-snug text-[var(--color-ink)]">{item.item}</p>
                <p className="mt-1 text-xs text-[var(--color-ink-soft)]">
                  <span className="font-medium">Waiting on:</span> {item.waitingOn}
                </p>
                <SourceEvidence item={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}