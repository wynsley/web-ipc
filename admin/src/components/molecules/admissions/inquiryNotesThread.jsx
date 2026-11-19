import { useState } from "react";
import { useDraftGuard } from "../../../context/unsavedChangesContext";
import { formatLimaDateTime } from "../../../helpers/eventDates";
import { Button } from "../../atoms/button";
import { Paragraph } from "../../atoms/paragraph";
import { Title } from "../../atoms/titles";
import { StatusBanner } from "../statusBanner";
import { TextareaField } from "../textareaField";

const MAX_NOTE_LENGTH = 1000;

export function InquiryNotesThread({
  inquiryId,
  detail,
  loading,
  error,
  busy,
  onRetry,
  onAddNote,
}) {
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const dirty = body.trim().length > 0;
  useDraftGuard(dirty, submitting || busy);

  async function handleSubmit(event) {
    event.preventDefault();
    const trimmed = body.trim();
    if (!trimmed) {
      setFormError("Escribe una nota antes de guardar.");
      return;
    }
    setSubmitting(true);
    setFormError("");
    try {
      await onAddNote(inquiryId, trimmed);
      setBody("");
    } catch (failure) {
      setFormError(failure.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Title level="h5" text="Notas internas de seguimiento" />
        {detail?.resolvedAt && (
          <Paragraph
            size="sm"
            className="tabular-nums"
            text={`Resuelta el ${formatLimaDateTime(detail.resolvedAt)}`}
          />
        )}
      </div>

      {loading && (
        <Paragraph role="status" size="sm" text="Cargando detalle y notas…" />
      )}

      {!loading && error && (
        <div role="alert" className="space-y-2">
          <StatusBanner variant="danger" text={error} />
          <Button
            variant="link"
            size="sm"
            text="Reintentar carga de notas"
            onClick={onRetry}
          />
        </div>
      )}

      {!loading && !error && detail && detail.notes.length === 0 && (
        <Paragraph
          size="sm"
          text="Todavía no hay notas internas registradas en esta consulta."
        />
      )}

      {!loading && !error && detail && detail.notes.length > 0 && (
        <ol className="space-y-2.5">
          {detail.notes.map((note) => (
            <li
              key={note.id}
              className="rounded-lg border border-line/80 bg-card px-3.5 py-2.5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-poppins text-xs font-semibold text-ink">
                  {note.authorName}
                </span>
                <span className="font-poppins text-xs text-muted tabular-nums">
                  {formatLimaDateTime(note.createdAt)}
                </span>
              </div>
              <Paragraph
                size="sm"
                variant="ink"
                className="mt-1 whitespace-pre-wrap break-words"
                text={note.body}
              />
            </li>
          ))}
        </ol>
      )}

      <form onSubmit={handleSubmit} className="space-y-3 border-t border-line/80 pt-4">
        <TextareaField
          label="Nueva nota interna"
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
            if (formError) setFormError("");
          }}
          rows={3}
          maxLength={MAX_NOTE_LENGTH}
          disabled={busy || submitting}
          errorMessage={formError}
          placeholder="Registra llamadas, respuestas enviadas u observaciones para el equipo de Admisión…"
        />
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-poppins text-xs text-muted tabular-nums">
            {body.length}/{MAX_NOTE_LENGTH} caracteres · Las notas son solo de
            uso interno y no se editan.
          </span>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            text={submitting ? "Guardando nota…" : "Guardar nota"}
            disabled={busy || submitting || !dirty}
          />
        </div>
      </form>
    </div>
  );
}
