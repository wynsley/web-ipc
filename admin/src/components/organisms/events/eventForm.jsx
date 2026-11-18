import { EventImageField } from "../../molecules/events/eventImageField";
import { uploadImage } from "../../../services/images";
import { useEffect, useRef, useState } from "react";
import { CheckboxField } from "../../molecules/checkboxField";
import { Field } from "../../molecules/field";
import { TextareaField } from "../../molecules/textareaField";
import { Button } from "../../atoms/button";
import { StatusBanner } from "../../molecules/statusBanner";
import { createEvent, editEvent } from "../../../services/events";

import { useDraftGuard } from "../../../context/unsavedChanges";
import {
  normalizeEventErrors,
  validateEventForm,
  focusEventError,
} from "../../../helpers/eventFormErrors";

const localTime = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "America/Lima",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});
export function EventForm({ event, onSaved, onCancel }) {
  const [image, setImage] = useState({
    url: event?.imageUrl ?? "",
    file: null,
    crop: event?.imageCrop ?? { x: 50, y: 50, zoom: 1 },
  });
  const formRef = useRef(null);
  const initialSnapshot = useRef(null);
  const [dirty, setDirty] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const confirmExit = useDraftGuard(dirty, busy);
  function trackChanges(nextImage = image) {
    const fields = [...new FormData(formRef.current)].filter(([name]) =>
      [
        "title",
        "startsAt",
        "endsAt",
        "location",
        "description",
        "highlights",
        "featured",
      ].includes(name),
    );
    const snapshot = JSON.stringify({
      fields,
      url: nextImage.url,
      crop: nextImage.crop ?? { x: 50, y: 50, zoom: 1 },
    });
    initialSnapshot.current ??= snapshot;
    setDirty(Boolean(nextImage.file) || snapshot !== initialSnapshot.current);
  }
  useEffect(() => {
    trackChanges();
  }, []);
  useEffect(() => {
    if (!busy && (error || Object.keys(fieldErrors).length))
      focusEventError(formRef.current, fieldErrors);
  }, [fieldErrors, error, busy]);
  const originalTime = event
    ? localTime.format(new Date(event.startsAt)).replace(" ", "T")
    : "";
  const originalEnd = event?.endsAt
    ? localTime.format(new Date(event.endsAt)).replace(" ", "T")
    : "";
  async function submit(e) {
    e.preventDefault();
    if (busy) return;
    const validation = validateEventForm(e.currentTarget);
    setFieldErrors(validation);
    if (Object.keys(validation).length) {
      setError("Revisa los campos indicados antes de guardar.");
      return;
    }
    const fields = new FormData(e.currentTarget);
    const data = Object.fromEntries(
      [
        "title",
        "startsAt",
        "endsAt",
        "location",
        "description",
        "highlights",
        "featured",
      ].map((name) => [name, fields.get(name)]),
    );
    data.featured = data.featured === "on";
    data.imageCrop = image.crop ?? { x: 50, y: 50, zoom: 1 };
    data.imageUrl = image.url.trim() || null;
    data.highlights = data.highlights
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    data.startsAt =
      event && originalTime === data.startsAt
        ? event.startsAt
        : data.startsAt + ":00-05:00";
    data.endsAt = data.endsAt
      ? event && originalEnd === data.endsAt
        ? event.endsAt
        : data.endsAt + ":00-05:00"
      : null;
    setBusy(true);
    setError("");
    try {
      if (image.file) {
        const uploaded = await uploadImage(image.file);
        data.imageUrl = uploaded.imageUrl;
        setImage({ ...image, url: uploaded.imageUrl, file: null });
      }
      if (event) await editEvent(event, data);
      else await createEvent(data);
      onSaved();
    } catch (failure) {
      setFieldErrors(normalizeEventErrors(failure.fields));
      setError(failure.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <form
      ref={formRef}
      noValidate
      aria-busy={busy}
      onChange={(event) => {
        if (
          [
            "title",
            "startsAt",
            "endsAt",
            "location",
            "description",
            "highlights",
            "featured",
          ].includes(event.target.name)
        )
          trackChanges();
      }}
      onSubmit={submit}
      className="mt-5 grid max-w-xl gap-4 rounded-lg border border-line bg-white p-5"
    >
      <fieldset disabled={busy} className="contents">
        <Field
          label="Título"
          name="title"
          errorMessage={fieldErrors.title}
          defaultValue={event?.title}
          maxLength={160}
          required
        />
        <Field
          label="Inicio (hora de Lima)"
          name="startsAt"
          errorMessage={fieldErrors.startsAt}
          type="datetime-local"
          defaultValue={originalTime}
          required
        />
        <Field
          label="Finalización (hora de Lima)"
          name="endsAt"
          type="datetime-local"
          defaultValue={originalEnd}
          errorMessage={fieldErrors.endsAt}
          required
        />
        <Field
          label="Lugar"
          name="location"
          errorMessage={fieldErrors.location}
          defaultValue={event?.location}
          maxLength={200}
          required
        />
        <TextareaField
          label="Descripción"
          name="description"
          errorMessage={fieldErrors.description}
          defaultValue={event?.description}
          maxLength={2000}
          required
        />
        <EventImageField
          value={image}
          errorMessage={fieldErrors.imageUrl || fieldErrors.imageCrop}
          onChange={(next) => {
            setImage(next);
            trackChanges(next);
          }}
          disabled={busy}
        />
        <TextareaField
          label="Puntos destacados (hasta cuatro, uno por línea)"
          name="highlights"
          errorMessage={fieldErrors.highlights}
          defaultValue={event?.highlights?.join("\n") ?? ""}
        />
        <CheckboxField
          name="featured"
          defaultChecked={event?.featured ?? false}
          disabled={busy}
          label="Destacar evento"
        />
        {error && (
          <StatusBanner
            role="alert"
            tabIndex={-1}
            variant="danger"
            text={error}
          />
        )}
        <div className="flex flex-wrap gap-3">
          <Button
            type="submit"
            text={busy ? "Guardando…" : "Guardar borrador"}
            disabled={busy}
          />
          <Button
            variant="secondary"
            text="Cancelar"
            disabled={busy}
            onClick={() => {
              if (confirmExit()) onCancel();
            }}
          />
        </div>
      </fieldset>
    </form>
  );
}
