import { useEffect, useRef, useState } from "react";
import {
  FiCheck,
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiCopy,
  FiCpu,
  FiUser,
} from "react-icons/fi";
import { ROLE_LABELS } from "../../../data/workspaceAreas";
import { auditActionInfo } from "../../../helpers/auditMeta";
import { formatLimaDateTime } from "../../../helpers/eventDates";
import { formatRelativeElapsed } from "../../../helpers/inquiryElapsedTime";
import { Badge } from "../../atoms/badge";
import { Button } from "../../atoms/button";
import { Code } from "../../atoms/code";

function CopyIdButton({ value, label, copiedKey, activeKey, onCopy }) {
  const copied = copiedKey === activeKey;
  return (
    <button
      type="button"
      onClick={() => onCopy(activeKey, value)}
      aria-label={`Copiar ${label}`}
      className="inline-flex min-h-7 cursor-pointer items-center gap-1 rounded-md border border-line bg-soft px-2 py-0.5 font-poppins text-xs text-muted transition-colors hover:border-blue-light/40 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
    >
      {copied ? (
        <>
          <FiCheck aria-hidden="true" className="text-[#6ee7b7]" />
          <span className="text-[#6ee7b7]">Copiado</span>
        </>
      ) : (
        <>
          <FiCopy aria-hidden="true" />
          <span>Copiar</span>
        </>
      )}
    </button>
  );
}

export function AuditEntryRow({ entry, nowMs, isExpanded, onToggle }) {
  const [copiedKey, setCopiedKey] = useState("");
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  async function handleCopy(key, text) {
    try {
      await navigator.clipboard?.writeText(text);
      setCopiedKey(key);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopiedKey(""), 2000);
    } catch {
      // Sin permiso de portapapeles en contextos restringidos.
    }
  }

  const meta = auditActionInfo(entry.action, entry.category);
  const createdMs = Date.parse(entry.createdAt);
  const relative = Number.isFinite(createdMs)
    ? formatRelativeElapsed(nowMs - createdMs)
    : "";
  const exact = formatLimaDateTime(entry.createdAt);
  const showTargetAccount =
    entry.targetAdmin && entry.targetAdmin.id !== entry.actorId;

  return (
    <li
      className={`overflow-hidden rounded-xl border border-line border-l-4 bg-card shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] ${meta.accent}`}
    >
      <div className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-poppins text-sm font-semibold text-ink">
              {meta.label}
            </span>
            <Badge variant={meta.variant} text={meta.categoryLabel} />
            <Code
              text={entry.action}
              className="rounded-md border border-line/70 bg-surface px-1.5 py-0.5 text-xs text-muted"
            />
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-poppins text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              {entry.actor ? (
                <>
                  <FiUser aria-hidden="true" className="text-blue-light" />
                  <span className="font-medium text-ink">
                    {entry.actor.name}
                  </span>
                  <span>
                    ({ROLE_LABELS[entry.actor.role] || entry.actor.role}
                    {entry.actor.isActive ? "" : " · inactiva"})
                  </span>
                </>
              ) : (
                <>
                  <FiCpu aria-hidden="true" className="text-muted" />
                  <span className="font-medium text-ink">
                    Sistema / Público
                  </span>
                </>
              )}
            </span>

            {showTargetAccount && (
              <span>
                Cuenta afectada:{" "}
                <strong className="font-semibold text-ink">
                  {entry.targetAdmin.name}
                </strong>
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:shrink-0">
          <span
            title={exact}
            className="inline-flex items-center gap-1 font-poppins text-xs text-muted tabular-nums"
          >
            <FiClock aria-hidden="true" />
            <span>{relative}</span>
            <span className="hidden text-muted/75 xl:inline">· {exact}</span>
          </span>

          <Button
            variant={isExpanded ? "secondary" : "outline"}
            size="sm"
            aria-expanded={isExpanded}
            onClick={() => onToggle(entry.id)}
            className="min-h-8 px-2.5 py-1 text-xs"
          >
            {isExpanded ? (
              <>
                <FiChevronUp aria-hidden="true" />
                Ocultar
              </>
            ) : (
              <>
                <FiChevronDown aria-hidden="true" />
                Trazabilidad
              </>
            )}
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="grid gap-3 border-t border-line bg-surface/55 px-4 py-3 sm:grid-cols-3 sm:px-5">
          <div className="space-y-1">
            <span className="block font-poppins text-xs font-semibold text-muted">
              Fecha exacta (America/Lima)
            </span>
            <span className="font-poppins text-xs text-ink tabular-nums">
              {exact}
            </span>
          </div>

          <div className="min-w-0 space-y-1">
            <span className="block font-poppins text-xs font-semibold text-muted">
              ID de solicitud
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <Code text={entry.requestId} className="text-xs" />
              <CopyIdButton
                value={entry.requestId}
                label="ID de solicitud"
                copiedKey={copiedKey}
                activeKey="requestId"
                onCopy={handleCopy}
              />
            </div>
          </div>

          <div className="min-w-0 space-y-1">
            <span className="block font-poppins text-xs font-semibold text-muted">
              ID de recurso afectado
            </span>
            {entry.targetId ? (
              <div className="flex flex-wrap items-center gap-2">
                <Code text={entry.targetId} className="text-xs" />
                <CopyIdButton
                  value={entry.targetId}
                  label="ID de recurso"
                  copiedKey={copiedKey}
                  activeKey="targetId"
                  onCopy={handleCopy}
                />
              </div>
            ) : (
              <span className="font-poppins text-xs text-muted">
                Sin recurso específico
              </span>
            )}
          </div>
        </div>
      )}
    </li>
  );
}
