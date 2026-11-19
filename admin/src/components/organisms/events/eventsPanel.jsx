import { eventSituation } from "../../../helpers/eventSituation";
import { EventScheduleForm } from "./eventScheduleForm";
import { EventHistory } from "./eventHistory";
import { useEffect, useState } from "react";
import { EventForm } from "./eventForm";
import { listEvents, setPublication } from "../../../services/events";
import { useUnsavedChanges } from "../../../context/unsavedChanges";
import { Badge } from "../../atoms/badge";
import { Button } from "../../atoms/button";
import { Title } from "../../atoms/titles";
import { Paragraph } from "../../atoms/paragraph";
import { StatusBanner } from "../../molecules/statusBanner";

const date = new Intl.DateTimeFormat("es-PE", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/Lima",
});

function situationVariant(status) {
  if (status === "cancelled") return "danger";
  if (status === "postponed") return "warning";
  return "institutional";
}

export function EventsPanel() {
  const { confirmExit } = useUnsavedChanges();
  const [page, setPage] = useState(1);
  const [revision, setRevision] = useState(0);
  const [list, setList] = useState(null);
  const [editor, setEditor] = useState(null);
  const [operation, setOperation] = useState(null);
  const [historyEvent, setHistoryEvent] = useState(null);
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

  function openNewEvent() {
    if (busy || !confirmExit()) return;
    setOperation(null);
    setHistoryEvent(null);
    setNotice("");
    setEditor((current) => (current && !current.id ? null : {}));
  }

  function openEditEvent(event) {
    if (busy || !confirmExit()) return;
    setOperation(null);
    setHistoryEvent(null);
    setNotice("");
    setEditor((current) => (current?.id === event.id ? null : event));
  }

  function openScheduleAction(event, action) {
    if (busy || !confirmExit()) return;
    setEditor(null);
    setHistoryEvent(null);
    setNotice("");
    setOperation((current) =>
      current?.event.id === event.id && current?.action === action
        ? null
        : { event, action },
    );
  }

  function openHistory(event) {
    if (busy || !confirmExit()) return;
    setEditor(null);
    setOperation(null);
    setHistoryEvent((current) => (current?.id === event.id ? null : event));
  }

  async function toggle(event) {
    if (busy || !confirmExit()) return;
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

  const creatingNew = Boolean(editor && !editor.id);

  return (
    <section className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Title level="h3" text="Agenda institucional" />
          <Paragraph
            size="sm"
            text="Borradores, publicaciones vigentes y cambios de programación."
            className="mt-0.5"
          />
        </div>
        <Button
          variant={creatingNew ? "secondary" : "primary"}
          text={creatingNew ? "Cerrar nuevo evento" : "Crear evento"}
          disabled={busy}
          onClick={openNewEvent}
        />
      </div>

      {creatingNew && (
        <EventForm
          key="new"
          event={null}
          onCancel={() => setEditor(null)}
          onSaved={() => {
            setNotice("Borrador guardado.");
            refresh();
          }}
        />
      )}

      {notice && (
        <StatusBanner
          role="status"
          variant="success"
          text={notice}
          className="mt-5"
        />
      )}
      {error && (
        <div role="alert" className="mt-5">
          <StatusBanner variant="danger" text={error} />
          <Button variant="link" text="Actualizar lista" onClick={refresh} />
        </div>
      )}
      {!list && !error && (
        <Paragraph role="status" text="Cargando eventos…" className="mt-5" />
      )}
      {list && !list.events.length && (
        <div className="mt-5 rounded-xl border border-line bg-card p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
          <Paragraph text="Todavía no hay eventos en esta página." />
        </div>
      )}
      {list && list.events.length > 0 && (
        <ul className="mt-5 grid gap-4">
          {list.events.map((event) => {
            const situation = eventSituation(event);
            const isEditingThis = editor?.id === event.id;
            const activeAction =
              operation?.event.id === event.id ? operation.action : null;
            const isShowingHistory = historyEvent?.id === event.id;

            return (
              <li
                key={event.id}
                className={`overflow-hidden rounded-xl border border-line bg-card shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] ${
                  event.published
                    ? "border-l-4 border-l-blue-light"
                    : "border-l-4 border-l-muted/50"
                }`}
              >
                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Title level="h4" text={event.title} />
                      <Paragraph size="sm" className="mt-1 tabular-nums">
                        {(event.status !== "scheduled"
                          ? "Horario anterior: "
                          : "") +
                          date.format(new Date(event.startsAt)) +
                          (event.endsAt
                            ? " → " + date.format(new Date(event.endsAt))
                            : "") +
                          " · " +
                          event.location}
                      </Paragraph>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant={event.published ? "success" : "neutral"}
                        text={event.published ? "Publicado" : "Borrador"}
                      />
                      <Badge
                        variant={situationVariant(event.status)}
                        text={situation}
                      />
                      {event.featured && (
                        <Badge variant="institutional" text="Destacado" />
                      )}
                    </div>
                  </div>

                  {event.scheduleNotice && (
                    <Paragraph
                      size="small"
                      variant="ink"
                      text={"Aviso vigente: " + event.scheduleNotice}
                      className="mt-3 rounded-md border border-line/80 bg-surface px-3 py-2"
                    />
                  )}

                  {event.published && (
                    <Paragraph
                      size="small"
                      text="Para editar el contenido o la foto, retíralo primero a borrador."
                      className="mt-2"
                    />
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-surface/65 px-5 py-3.5 sm:px-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      variant={
                        activeAction === "reschedule" ? "primary" : "secondary"
                      }
                      size="sm"
                      aria-expanded={activeAction === "reschedule"}
                      text={
                        event.status === "cancelled"
                          ? "Reactivar y reprogramar"
                          : "Reprogramar"
                      }
                      disabled={busy}
                      onClick={() => openScheduleAction(event, "reschedule")}
                    />
                    {event.status === "scheduled" && (
                      <Button
                        variant={
                          activeAction === "postpone" ? "primary" : "secondary"
                        }
                        size="sm"
                        aria-expanded={activeAction === "postpone"}
                        text="Posponer"
                        disabled={busy}
                        onClick={() => openScheduleAction(event, "postpone")}
                      />
                    )}
                    {event.status !== "cancelled" && (
                      <Button
                        variant={
                          activeAction === "cancel" ? "primary" : "secondary"
                        }
                        size="sm"
                        aria-expanded={activeAction === "cancel"}
                        text="Cancelar evento"
                        disabled={busy}
                        onClick={() => openScheduleAction(event, "cancel")}
                      />
                    )}
                    <Button
                      variant="link"
                      size="sm"
                      aria-expanded={isShowingHistory}
                      text={
                        isShowingHistory ? "Ocultar historial" : "Ver historial"
                      }
                      disabled={busy}
                      onClick={() => openHistory(event)}
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {!event.published && (
                      <Button
                        variant={isEditingThis ? "primary" : "secondary"}
                        size="sm"
                        aria-expanded={isEditingThis}
                        text="Editar"
                        disabled={busy}
                        onClick={() => openEditEvent(event)}
                      />
                    )}
                    <Button
                      variant={event.published ? "secondary" : "primary"}
                      size="sm"
                      text={event.published ? "Retirar de la web" : "Publicar"}
                      disabled={busy}
                      onClick={() => toggle(event)}
                    />
                  </div>
                </div>

                {isEditingThis && (
                  <div className="border-t border-line bg-surface/45 p-5 sm:p-6">
                    <EventForm
                      key={event.id}
                      event={event}
                      inline
                      onCancel={() => setEditor(null)}
                      onSaved={() => {
                        setNotice("Borrador guardado.");
                        refresh();
                      }}
                    />
                  </div>
                )}

                {activeAction && (
                  <div className="border-t border-line bg-surface/45 p-5 sm:p-6">
                    <EventScheduleForm
                      key={event.id + activeAction}
                      event={event}
                      action={activeAction}
                      inline
                      onCancel={() => setOperation(null)}
                      onSaved={() => {
                        setNotice("Situación del evento actualizada.");
                        refresh();
                      }}
                    />
                  </div>
                )}

                {isShowingHistory && (
                  <div className="border-t border-line bg-surface/45 p-5 sm:p-6">
                    <EventHistory
                      key={event.id}
                      event={event}
                      inline
                      onClose={() => setHistoryEvent(null)}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
      <div className="mt-5 flex gap-3">
        {page > 1 && (
          <Button
            variant="secondary"
            size="sm"
            text="Anterior"
            disabled={busy}
            onClick={() => {
              if (confirmExit()) setPage(page - 1);
            }}
          />
        )}
        {list?.hasMore && (
          <Button
            variant="secondary"
            size="sm"
            text="Siguiente"
            disabled={busy}
            onClick={() => {
              if (confirmExit()) setPage(page + 1);
            }}
          />
        )}
      </div>
    </section>
  );
}
