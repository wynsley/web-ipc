import {
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiMessageSquare,
} from "react-icons/fi";
import { formatLimaDateTime } from "../../../helpers/eventDates";
import { inquiryElapsedInfo } from "../../../helpers/inquiryElapsedTime";
import {
  INQUIRY_CAREER_LABELS,
  INQUIRY_SHIFT_LABELS,
  inquiryNextActions,
  inquiryStatusInfo,
} from "../../../helpers/inquiryMeta";
import { Badge } from "../../atoms/badge";
import { Button } from "../../atoms/button";
import { InquiryDetailPanel } from "./inquiryDetailPanel";
import { InquiryQuickReplyButtons } from "./inquiryQuickReplyButtons";

export function InquiryCard({
  inquiry,
  nowMs,
  isAdmin,
  assignees,
  busy,
  isExpanded,
  detail,
  detailLoading,
  detailError,
  onAction,
  onAssign,
  onToggleDetail,
  onRetryDetail,
  onAddNote,
}) {
  const statusMeta = inquiryStatusInfo(inquiry.status);
  const careerLabel = INQUIRY_CAREER_LABELS[inquiry.career] || inquiry.career;
  const shiftLabel = INQUIRY_SHIFT_LABELS[inquiry.shift] || inquiry.shift;
  const elapsed = inquiryElapsedInfo(inquiry, nowMs);
  const primaryAction = inquiryNextActions(inquiry)[0] ?? null;
  const exactTimestamp = formatLimaDateTime(inquiry.createdAt);

  return (
    <li
      className={`overflow-hidden rounded-xl border border-line border-l-4 bg-card shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] ${
        elapsed.isOverdue ? "border-l-[#f87171]" : statusMeta.accent
      }`}
    >
      <div className="space-y-2.5 px-4 py-3.5 sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleDetail(inquiry.id)}
              disabled={busy}
              aria-expanded={isExpanded}
              className="cursor-pointer truncate text-left font-hani text-lg font-bold text-ink transition-colors hover:text-blue-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:pointer-events-none"
            >
              {inquiry.name}
            </button>
            <Badge variant={statusMeta.variant} text={statusMeta.label} />
            <Badge variant="light" text={careerLabel} />
            <Badge variant="neutral" text={shiftLabel} />
            <Badge
              variant={inquiry.assignedTo ? "institutional" : "neutral"}
              text={
                inquiry.assignedTo ? inquiry.assignedTo.name : "Sin asignar"
              }
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 font-poppins text-xs tabular-nums">
            {elapsed.isOverdue && (
              <Badge variant="danger" text="Sin atender > 24 h" />
            )}
            <span
              title={`Recibida el ${exactTimestamp}`}
              className={`inline-flex items-center gap-1 ${
                elapsed.isOverdue
                  ? "font-semibold text-[#fca5a5]"
                  : elapsed.isWarning
                    ? "font-semibold text-[#fbbf24]"
                    : "text-muted"
              }`}
            >
              <FiClock aria-hidden="true" />
              {elapsed.label}
            </span>
            <span
              title={`${inquiry.notesCount} nota(s) interna(s)`}
              className="inline-flex items-center gap-1 rounded-md border border-line/80 bg-soft px-2 py-0.5 text-muted"
            >
              <FiMessageSquare aria-hidden="true" />
              {inquiry.notesCount}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
          {!isExpanded ? (
            <p className="min-w-0 flex-1 truncate font-poppins text-sm text-muted">
              {inquiry.message}
            </p>
          ) : (
            <span className="font-poppins text-xs text-muted tabular-nums">
              Recibida el {exactTimestamp}
            </span>
          )}

          <div className="flex flex-wrap items-center gap-2">
            {!isExpanded && primaryAction && (
              <Button
                variant={primaryAction.variant}
                size="sm"
                text={primaryAction.label}
                disabled={busy}
                onClick={() => onAction(inquiry, primaryAction)}
                className="min-h-9 px-3 py-1.5 text-xs"
              />
            )}
            {!isExpanded && (
              <InquiryQuickReplyButtons inquiry={inquiry} compact />
            )}
            <Button
              variant={isExpanded ? "secondary" : "outline"}
              size="sm"
              aria-expanded={isExpanded}
              disabled={busy}
              onClick={() => onToggleDetail(inquiry.id)}
              className="min-h-9 px-3 py-1.5 text-xs"
            >
              {isExpanded ? (
                <>
                  <FiChevronUp aria-hidden="true" />
                  Ocultar
                </>
              ) : (
                <>
                  <FiChevronDown aria-hidden="true" />
                  Detalle
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <InquiryDetailPanel
          inquiry={inquiry}
          isAdmin={isAdmin}
          assignees={assignees}
          busy={busy}
          detail={detail}
          detailLoading={detailLoading}
          detailError={detailError}
          onAction={onAction}
          onAssign={onAssign}
          onRetryDetail={onRetryDetail}
          onAddNote={onAddNote}
        />
      )}
    </li>
  );
}
