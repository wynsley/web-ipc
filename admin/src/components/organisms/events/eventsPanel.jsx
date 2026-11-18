import { eventSituation } from "../../../helpers/eventSituation";
import { EventScheduleForm } from "./eventScheduleForm";
import { EventHistory } from "./eventHistory";
import { useEffect, useState } from "react";
import { EventForm } from "./eventForm";
import { listEvents, setPublication } from "../../../services/events";
import { Button } from "../../atoms/button";
import { Title } from "../../atoms/titles";
import { Paragraph } from "../../atoms/paragraph";
import { StatusBanner } from "../../molecules/statusBanner";

const date = new Intl.DateTimeFormat("es-PE", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/Lima",
});
export function EventsPanel() {
  const [page, setPage] = useState(1);
  const [revision, setRevision] = useState(0);
  const [list, setList] = useState(null);
  const [editor, setEditor] = useState(null);
  const [operation, setOperation] = useState(null);
  const [historyEvent, setHistoryEvent] = useState(null);
  const editing = !!editor || !!operation;
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  useEffect(() => {
    let current = true;
    setList(null);
    setError("");
    listEvents(page)
      .then((data) => {
        if (current) setList(data);
      })
      .catch((failure) => {
        if (current) setError(failure.message);
      });
    return () => {
      current = false;
    };
  }, [page, revision]);
  function refresh() {
    setEditor(null);
    setOperation(null);
    setHistoryEvent(null);
    setRevision((value) => value + 1);
  }
  async function toggle(event) {
    if (busy) return;
    if (
      event.published &&
      !window.confirm(
        `¿Retirar «${event.title}» de la web? Quedará como borrador y podrás volver a publicarlo.`,
      )
    )
      return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await setPublication(event);
      setNotice(
        event.published
          ? "Evento retirado de la web."
          : "Evento publicado en la web.",
      );
      refresh();
    } catch (failure) {
      setError(failure.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="mt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Title level="h3" text="Agenda institucional" />
        <Button
          text="Crear evento"
          disabled={editing || busy}
          onClick={() => {
            setEditor({});
            setNotice("");
          }}
        />
      </div>
      {editor && (
        <EventForm
          key={editor.id ?? "new"}
          event={editor.id ? editor : null}
          onCancel={() => setEditor(null)}
          onSaved={() => {
            setNotice("Borrador guardado.");
            refresh();
          }}
        />
      )}
      {operation && (
        <EventScheduleForm
          key={operation.event.id + operation.action}
          event={operation.event}
          action={operation.action}
          onCancel={() => setOperation(null)}
          onSaved={() => {
            setNotice("Situación del evento actualizada.");
            refresh();
          }}
        />
      )}
      {historyEvent && (
        <EventHistory
          key={historyEvent.id}
          event={historyEvent}
          onClose={() => setHistoryEvent(null)}
        />
      )}
      {notice && (
        <StatusBanner
          role="status"
          variant="success"
          text={notice}
          className="mt-4"
        />
      )}
      {error && (
        <div role="alert">
          <StatusBanner variant="danger" text={error} />
          <Button variant="link" text="Actualizar lista" onClick={refresh} />
        </div>
      )}
      {!list && !error && <Paragraph role="status" text="Cargando eventos…" />}
      {list && !list.events.length && (
        <Paragraph text="Todavía no hay eventos en esta página." />
      )}
      <ul className="mt-4 grid gap-3">
        {list?.events.map((event) => (
          <li
            key={event.id}
            className="rounded-lg border border-line bg-white p-5"
          >
            <Title level="h4" text={event.title} />
            <Paragraph
              text={
                (event.status !== "scheduled" ? "Horario anterior: " : "") +
                date.format(new Date(event.startsAt)) +
                " · " +
                event.location
              }
            />
            <Paragraph
              text={
                (event.published ? "Publicado" : "Borrador") +
                " · " +
                eventSituation(event)
              }
            />
            {event.published && (
              <Paragraph
                size="small"
                text="Para editar el contenido o la foto, retíralo primero a borrador."
                className="mt-1"
              />
            )}
            <div className="mt-2 flex flex-wrap gap-3">
              <Button
                variant="secondary"
                text={
                  event.status === "cancelled"
                    ? "Reactivar y reprogramar"
                    : "Reprogramar"
                }
                disabled={busy || editing}
                onClick={() => {
                  setHistoryEvent(null);
                  setOperation({ event, action: "reschedule" });
                }}
              />
              {event.status === "scheduled" && (
                <Button
                  variant="secondary"
                  text="Posponer"
                  disabled={busy || editing}
                  onClick={() => setOperation({ event, action: "postpone" })}
                />
              )}
              {event.status !== "cancelled" && (
                <Button
                  variant="secondary"
                  text="Cancelar evento"
                  disabled={busy || editing}
                  onClick={() => setOperation({ event, action: "cancel" })}
                />
              )}
              <Button
                variant="link"
                text="Ver historial"
                disabled={busy || editing}
                onClick={() => setHistoryEvent(event)}
              />
              {!event.published && (
                <Button
                  variant="secondary"
                  text="Editar"
                  disabled={busy || editing}
                  onClick={() => setEditor(event)}
                />
              )}
              <Button
                text={event.published ? "Retirar de la web" : "Publicar"}
                disabled={busy || editing}
                onClick={() => toggle(event)}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex gap-3">
        {page > 1 && (
          <Button
            variant="secondary"
            text="Anterior"
            disabled={busy || editing}
            onClick={() => setPage(page - 1)}
          />
        )}
        {list?.hasMore && (
          <Button
            variant="secondary"
            text="Siguiente"
            disabled={busy || editing}
            onClick={() => setPage(page + 1)}
          />
        )}
      </div>
    </section>
  );
}
