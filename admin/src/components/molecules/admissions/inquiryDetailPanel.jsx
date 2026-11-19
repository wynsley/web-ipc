import { useEffect, useRef, useState } from "react";
import { FiCheck, FiCopy, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { formatLimaDateTime } from "../../../helpers/eventDates";
import { Paragraph } from "../../atoms/paragraph";
import { InquiryActionsBar } from "./inquiryActionsBar";
import { InquiryNotesThread } from "./inquiryNotesThread";
import { InquiryQuickReplyButtons } from "./inquiryQuickReplyButtons";

function CopyFieldButton({ value, label, copiedKey, activeKey, onCopy }) {
  const isCopied = copiedKey === activeKey;
  return (
    <button
      type="button"
      onClick={() => onCopy(activeKey, value)}
      aria-label={`Copiar ${label}`}
      className="inline-flex min-h-8 cursor-pointer items-center gap-1 rounded-md border border-line bg-soft px-2 py-1 font-poppins text-xs font-medium text-muted transition-colors hover:border-blue-light/40 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
    >
      {isCopied ? (
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

export function InquiryDetailPanel({
  inquiry,
  isAdmin,
  assignees,
  busy,
  detail,
  detailLoading,
  detailError,
  onAction,
  onAssign,
  onRetryDetail,
  onAddNote,
}) {
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

  const phoneHref = "tel:" + inquiry.phone.replace(/[^\d+]/g, "");

  return (
    <div className="space-y-4 border-t border-line bg-surface/55 p-4 sm:p-5">
      <div className="grid gap-3 rounded-lg border border-line/80 bg-card/70 p-3.5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="min-w-0 space-y-1">
          <span className="flex items-center gap-1.5 font-poppins text-xs font-semibold text-muted">
            <FiMail aria-hidden="true" className="text-blue-light" />
            Correo electrónico
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <span className="min-w-0 break-all font-poppins text-sm text-ink">
              {inquiry.email}
            </span>
            <CopyFieldButton
              value={inquiry.email}
              label="correo electrónico"
              copiedKey={copiedKey}
              activeKey="email"
              onCopy={handleCopy}
            />
          </div>
        </div>

        <div className="min-w-0 space-y-1">
          <span className="flex items-center gap-1.5 font-poppins text-xs font-semibold text-muted">
            <FiPhone aria-hidden="true" className="text-blue-light" />
            Teléfono
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={phoneHref}
              className="font-poppins text-sm text-ink tabular-nums underline-offset-4 hover:text-blue-light hover:underline"
            >
              {inquiry.phone}
            </a>
            <CopyFieldButton
              value={inquiry.phone}
              label="teléfono"
              copiedKey={copiedKey}
              activeKey="phone"
              onCopy={handleCopy}
            />
          </div>
        </div>

        <div className="min-w-0 space-y-1 sm:col-span-2 lg:col-span-1">
          <span className="flex items-center gap-1.5 font-poppins text-xs font-semibold text-muted">
            <FiMapPin aria-hidden="true" className="text-blue-light" />
            Dirección y registro
          </span>
          <Paragraph
            size="sm"
            variant="ink"
            className="break-words"
            text={inquiry.address}
          />
          <Paragraph
            size="sm"
            className="text-xs tabular-nums"
            text={`Recibida el ${formatLimaDateTime(inquiry.createdAt)}`}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line/80 bg-card/70 px-3.5 py-3">
        <InquiryQuickReplyButtons inquiry={inquiry} />
        <span className="font-poppins text-xs text-muted">
          Se abre en una pestaña nueva con un mensaje sugerido editable.
        </span>
      </div>

      <div className="rounded-lg border border-line/80 bg-card px-3.5 py-3">
        <span className="block font-poppins text-xs font-semibold tracking-wide text-muted uppercase">
          Mensaje del postulante
        </span>
        <Paragraph
          size="sm"
          variant="ink"
          className="mt-1 whitespace-pre-wrap break-words"
          text={inquiry.message}
        />
      </div>

      <InquiryActionsBar
        inquiry={inquiry}
        isAdmin={isAdmin}
        assignees={assignees}
        busy={busy}
        onAction={onAction}
        onAssign={onAssign}
      />

      <div className="rounded-lg border border-line/80 bg-card/60 p-3.5 sm:p-4">
        <InquiryNotesThread
          key={inquiry.id}
          inquiryId={inquiry.id}
          detail={detail}
          loading={detailLoading}
          error={detailError}
          busy={busy}
          onRetry={onRetryDetail}
          onAddNote={onAddNote}
        />
      </div>
    </div>
  );
}
