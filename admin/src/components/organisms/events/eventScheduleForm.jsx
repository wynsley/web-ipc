import { useEffect, useRef, useState } from "react";
import { Field } from "../../molecules/field";
import { TextareaField } from "../../molecules/textareaField";
import { StatusBanner } from "../../molecules/statusBanner";
import { Button } from "../../atoms/button";
import { Title } from "../../atoms/titles";
import { Paragraph } from "../../atoms/paragraph";
import { useDraftGuard } from "../../../context/unsavedChanges";
import { changeEventSchedule } from "../../../services/events";
const labels = {
  reschedule: "Reprogramar evento",
  postpone: "Posponer evento",
  cancel: "Cancelar evento",
};
const time = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "America/Lima",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});
export function EventScheduleForm({
  event,
  action,
  inline = false,
  onSaved,
  onCancel,
}) {
  const formRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState("");
  const confirmExit = useDraftGuard(dirty, busy);
  useEffect(() => {
    formRef.current?.scrollIntoView?.({ behavior: "smooth", block: "nearest" });
  }, []);
  const start = time.format(new Date(event.startsAt)).replace(" ", "T");
  const end = event.endsAt
    ? time.format(new Date(event.endsAt)).replace(" ", "T")
    : "";
  async function submit(e) {
    e.preventDefault();
    if (busy) return;
    const form = e.currentTarget;
    const fields = new FormData(form);
    const input = { reason: fields.get("reason").trim() };
    if (action === "reschedule") {
      input.startsAt =
        fields.get("startsAt") === start
          ? event.startsAt
          : fields.get("startsAt") + ":00-05:00";
      input.endsAt =
        fields.get("endsAt") === end
          ? event.endsAt
          : fields.get("endsAt") + ":00-05:00";
      if (Date.parse(input.endsAt) <= Date.parse(input.startsAt)) {
        setError("La finalización debe ser posterior al inicio.");
        form.elements.namedItem("endsAt").focus();
        return;
      }
    }
    if (
      !window.confirm(
        labels[action] +
          " «" +
          event.title +
          "»? El aviso será público si el evento está publicado.",
      )
    )
      return;
    setBusy(true);
    setError("");
    try {
      await changeEventSchedule(event, action, input);
      onSaved();
    } catch (failure) {
      setError(failure.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <form
      ref={formRef}
      onSubmit={submit}
      onChange={() => setDirty(true)}
      aria-busy={busy}
      className={
        inline
          ? "grid max-w-2xl gap-4"
          : "mt-5 grid max-w-2xl gap-4 rounded-xl border border-line bg-card p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
      }
    >
      <div className="border-b border-line/60 pb-3">
        <Title level="h4" text={labels[action] + ": " + event.title} />
        <Paragraph
          size="sm"
          className="mt-1"
          text={
            action === "reschedule"
              ? "El nuevo horario reactiva el evento y conserva su publicación. Puedes corregir fechas pasadas o extender la finalización."
              : action === "postpone"
                ? "Quedará pendiente de una nueva fecha, sin cuenta regresiva ni aparición en la galería."
                : "Conservará su aviso público de cancelación y no aparecerá como realizado."
          }
        />
      </div>
      <fieldset disabled={busy} className="contents">
        {action === "reschedule" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field
              label="Nuevo inicio (hora de Lima)"
              name="startsAt"
              type="datetime-local"
              defaultValue={start}
              required
            />
            <Field
              label="Nueva finalización (hora de Lima)"
              name="endsAt"
              type="datetime-local"
              defaultValue={end}
              required
            />
          </div>
        )}
        <TextareaField
          label="Motivo que se mostrará en la web"
          name="reason"
          minLength={5}
          maxLength={500}
          required
        />
        {error && <StatusBanner role="alert" variant="danger" text={error} />}
        <div className="flex flex-wrap gap-3 border-t border-line/60 pt-4">
          <Button
            type="submit"
            text={busy ? "Guardando…" : "Confirmar cambio"}
          />
          <Button
            variant="secondary"
            text="Volver sin cambiar"
            onClick={() => {
              if (confirmExit()) onCancel();
            }}
          />
        </div>
      </fieldset>
    </form>
  );
}
