import { useEventsManager } from "../../../hooks/useEventsManager";
import { Button } from "../../atoms/button";
import { Paragraph } from "../../atoms/paragraph";
import { Title } from "../../atoms/titles";
import { EventCard } from "../../molecules/events/eventCard";
import { EventTabs } from "../../molecules/events/eventTabs";
import { StatusBanner } from "../../molecules/statusBanner";
import { EventForm } from "./eventForm";

const EMPTY_MESSAGES = {
  published: "No hay eventos publicados vigentes en este momento.",
  drafts: "No hay borradores guardados.",
  past: "Todavía no hay eventos finalizados.",
  all: "Todavía no hay eventos en esta página.",
};

export function EventsPanel() {
  const {
    scope,
    page,
    list,
    counts,
    editor,
    operation,
    historyEvent,
    deletingId,
    busy,
    error,
    notice,
    setNotice,
    setEditor,
    setOperation,
    setHistoryEvent,
    setDeletingId,
    refresh,
    selectTab,
    goToPage,
    openNewEvent,
    openEditEvent,
    openScheduleAction,
    openHistory,
    openDeleteConfirm,
    togglePublication,
    confirmDelete,
  } = useEventsManager();

  const creatingNew = Boolean(editor && !editor.id);

  return (
    <section className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Title level="h3" text="Agenda institucional" />
          <Paragraph
            size="sm"
            text="Organiza publicaciones vigentes, borradores y eventos finalizados."
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
            setNotice("Borrador guardado en la pestaña Borradores.");
            refresh("drafts");
          }}
        />
      )}

      <EventTabs
        active={scope}
        counts={counts}
        disabled={busy}
        onChange={selectTab}
      />

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
          <Button
            variant="link"
            text="Actualizar lista"
            onClick={() => refresh()}
          />
        </div>
      )}
      {!list && !error && (
        <Paragraph role="status" text="Cargando eventos…" className="mt-5" />
      )}
      {list && !list.events.length && (
        <div className="mt-5 rounded-xl border border-line bg-card p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
          <Paragraph text={EMPTY_MESSAGES[scope] ?? EMPTY_MESSAGES.all} />
        </div>
      )}
      {list && list.events.length > 0 && (
        <ul className="mt-5 grid gap-4">
          {list.events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              busy={busy}
              isEditing={editor?.id === event.id}
              activeAction={
                operation?.event.id === event.id ? operation.action : null
              }
              isShowingHistory={historyEvent?.id === event.id}
              isConfirmingDelete={deletingId === event.id}
              onEdit={openEditEvent}
              onCancelEdit={() => setEditor(null)}
              onSavedEdit={() => {
                setNotice("Borrador guardado.");
                refresh();
              }}
              onScheduleAction={openScheduleAction}
              onCancelSchedule={() => setOperation(null)}
              onSavedSchedule={() => {
                setNotice("Situación del evento actualizada.");
                refresh();
              }}
              onToggleHistory={openHistory}
              onCloseHistory={() => setHistoryEvent(null)}
              onToggleDelete={openDeleteConfirm}
              onCancelDelete={() => setDeletingId(null)}
              onConfirmDelete={confirmDelete}
              onTogglePublication={togglePublication}
            />
          ))}
        </ul>
      )}
      <div className="mt-5 flex gap-3">
        {page > 1 && (
          <Button
            variant="secondary"
            size="sm"
            text="Anterior"
            disabled={busy}
            onClick={() => goToPage(page - 1)}
          />
        )}
        {list?.hasMore && (
          <Button
            variant="secondary"
            size="sm"
            text="Siguiente"
            disabled={busy}
            onClick={() => goToPage(page + 1)}
          />
        )}
      </div>
    </section>
  );
}
