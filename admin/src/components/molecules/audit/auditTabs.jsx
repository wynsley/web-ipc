import { useRef } from "react";
import { AUDIT_CATEGORY_TABS } from "../../../helpers/auditMeta";

export function AuditTabs({ active, counts, disabled, onChange }) {
  const buttonRefs = useRef([]);

  function handleKeyDown(event, index) {
    let next = null;
    if (event.key === "ArrowRight")
      next = (index + 1) % AUDIT_CATEGORY_TABS.length;
    else if (event.key === "ArrowLeft")
      next =
        (index - 1 + AUDIT_CATEGORY_TABS.length) % AUDIT_CATEGORY_TABS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = AUDIT_CATEGORY_TABS.length - 1;
    if (next === null) return;
    event.preventDefault();
    buttonRefs.current[next]?.focus();
    onChange(AUDIT_CATEGORY_TABS[next].id);
  }

  return (
    <div
      role="tablist"
      aria-label="Módulos de auditoría"
      className="mt-5 flex flex-wrap gap-2 rounded-xl border border-line bg-card p-1.5"
    >
      {AUDIT_CATEGORY_TABS.map((tab, index) => {
        const selected = active === tab.id;
        const count = counts?.[tab.id];
        return (
          <button
            key={tab.id}
            ref={(el) => {
              buttonRefs.current[index] = el;
            }}
            type="button"
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            disabled={disabled}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={`inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-lg px-3 py-2 font-poppins text-sm font-semibold transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-55 ${
              selected
                ? "border border-blue-light/25 bg-blue text-white"
                : "border border-transparent text-muted hover:bg-soft hover:text-ink"
            }`}
          >
            <span>{tab.label}</span>
            {typeof count === "number" && (
              <span
                className={`rounded-md px-1.5 py-0.5 text-xs tabular-nums ${
                  selected ? "bg-white/15 text-white" : "bg-soft text-muted"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
