import { EventImageField } from "../../molecules/events/eventImageField";
import { uploadImage } from "../../../services/images";
import { useEffect, useRef, useState } from "react";
import { CheckboxField } from "../../molecules/checkboxField";
import { Field } from "../../molecules/field";
import { TextareaField } from "../../molecules/textareaField";
import { Button } from "../../atoms/button";
import { Title } from "../../atoms/titles";
import { StatusBanner } from "../../molecules/statusBanner";
import { createEvent, editEvent } from "../../../services/events";

import { useDraftGuard } from "../../../context/unsavedChangesContext";
import {
  normalizeEventErrors,
  validateEventForm,
  focusEventError,
} from "../../../helpers/eventFormErrors";
import {
  fromLimaInputValue,
  toLimaInputValue,
} from "../../../helpers/eventDates";

const TRACKED_FIELDS = [
  "title",
  "startsAt",
  "endsAt",
  "location",
  "description",
  "highlights",
  "featured",
];

function buildFormSnapshot(form, currentImage) {
  const fields = [...new FormData(form)].filter(([name]) =>
    TRACKED_FIELDS.includes(name),
  );
  return JSON.stringify({
    fields,
    url: currentImage.url,
    crop: currentImage.crop ?? { x: 50, y: 50, zoom: 1 },
  });
}

export function EventForm({ event, inline = false, onSaved, onCancel }) {
  const [image, setImage] = useState({
    url: event?.imageUrl ?? "",
    file: null,
    crop: event?.imageCrop ?? { x: 50, y: 50, zoom: 1 },
  });
  const formRef = useRef(null);
  const initialImageRef = useRef(image);
  const initialSnapshot = useRef(null);
  const [dirty, setDirty] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const confirmExit = useDraftGuard(dirty, busy);
  function trackChanges(nextImage = image) {
    const snapshot = buildFormSnapshot(formRef.current, nextImage);
    initialSnapshot.current ??= snapshot;
    setDirty(Boolean(nextImage.file) || snapshot !== initialSnapshot.current);
  }
  useEffect(() => {
    initialSnapshot.current ??= buildFormSnapshot(
      formRef.current,
      initialImageRef.current,
    );
    formRef.current?.scrollIntoView?.({ behavior: "smooth", block: "nearest" });
  }, []);
  useEffect(() => {
    if (!busy && (error || Object.keys(fieldErrors).length))
      focusEventError(formRef.current, fieldErrors);
  }, [fieldErrors, error, busy]);
  const originalTime = toLimaInputValue(event?.startsAt);
  const originalEnd = toLimaInputValue(event?.endsAt);
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
    data.startsAt = fromLimaInputValue(
      data.startsAt,
      originalTime,
      event?.startsAt,
    );
    data.endsAt = fromLimaInputValue(data.endsAt, originalEnd, event?.endsAt);
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
        if (TRACKED_FIELDS.includes(event.target.name)) trackChanges();
      }}
      onSubmit={submit}
      className={
        inline
          ? "grid max-w-2xl gap-4"
          : "mt-5 grid max-w-2xl gap-4 rounded-xl border border-line bg-card p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
      }
    >
      <div className="border-b border-line/60 pb-3">
        <Title
          level="h4"
          text={event ? `Editar borrador: ${event.title}` : "Nuevo evento"}
        />
      </div>
      <fieldset disabled={busy} className="contents">
        <Field
          label="Título"
          name="title"
          errorMessage={fieldErrors.title}
          defaultValue={event?.title}
          maxLength={160}
          required
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
        </div>
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
        <div className="flex flex-wrap gap-3 border-t border-line/60 pt-4">
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
