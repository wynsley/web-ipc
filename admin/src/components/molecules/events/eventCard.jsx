import { eventSituation } from "../../../helpers/eventSituation";
import { formatLimaRange } from "../../../helpers/eventDates";
import { Badge } from "../../atoms/badge";
import { Button } from "../../atoms/button";
import { Paragraph } from "../../atoms/paragraph";
import { Title } from "../../atoms/titles";
import { EventForm } from "../../organisms/events/eventForm";
import { EventHistory } from "../../organisms/events/eventHistory";
import { EventScheduleForm } from "../../organisms/events/eventScheduleForm";
import { EventDeleteConfirm } from "./eventDeleteConfirm";

function situationVariant(status) {
  if (status === "cancelled") return "danger";
  if (status === "postponed") return "warning";
  return "institutional";
}

export function EventCard({
  event,
  busy,
  isEditing,
  activeAction,
  isShowingHistory,
  isConfirmingDelete,
  onEdit,
  onCancelEdit,
  onSavedEdit,
  onScheduleAction,
  onCancelSchedule,
  onSavedSchedule,
  onToggleHistory,
  onCloseHistory,
  onToggleDelete,
  onCancelDelete,
  onConfirmDelete,
  onTogglePublication,
}) {
  const situation = eventSituation(event);

  return (
    <li
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
              {(event.status !== "scheduled" ? "Horario anterior: " : "") +
                formatLimaRange(event.startsAt, event.endsAt) +
                " · " +
                event.location}
            </Paragraph>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant={event.published ? "success" : "neutral"}
              text={event.published ? "Publicado" : "Borrador"}
            />
            <Badge variant={situationVariant(event.status)} text={situation} />
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
            text="Para editar el contenido, la foto o eliminarlo, retíralo primero a borrador."
            className="mt-2"
          />
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-surface/65 px-5 py-3.5 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={activeAction === "reschedule" ? "primary" : "secondary"}
            size="sm"
            aria-expanded={activeAction === "reschedule"}
            text={
              event.status === "cancelled"
                ? "Reactivar y reprogramar"
                : "Reprogramar"
            }
            disabled={busy}
            onClick={() => onScheduleAction(event, "reschedule")}
          />
          {event.status === "scheduled" && (
            <Button
              variant={activeAction === "postpone" ? "primary" : "secondary"}
              size="sm"
              aria-expanded={activeAction === "postpone"}
              text="Posponer"
              disabled={busy}
              onClick={() => onScheduleAction(event, "postpone")}
            />
          )}
          {event.status !== "cancelled" && (
            <Button
              variant={activeAction === "cancel" ? "primary" : "secondary"}
              size="sm"
              aria-expanded={activeAction === "cancel"}
              text="Cancelar evento"
              disabled={busy}
              onClick={() => onScheduleAction(event, "cancel")}
            />
          )}
          <Button
            variant="link"
            size="sm"
            aria-expanded={isShowingHistory}
            text={isShowingHistory ? "Ocultar historial" : "Ver historial"}
            disabled={busy}
            onClick={() => onToggleHistory(event)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {!event.published && (
            <>
              <Button
                variant={isEditing ? "primary" : "secondary"}
                size="sm"
                aria-expanded={isEditing}
                text="Editar"
                disabled={busy}
                onClick={() => onEdit(event)}
              />
              <Button
                variant={isConfirmingDelete ? "danger" : "outline"}
                size="sm"
                aria-expanded={isConfirmingDelete}
                text="Eliminar"
                disabled={busy}
                onClick={() => onToggleDelete(event)}
              />
            </>
          )}
          <Button
            variant={event.published ? "secondary" : "primary"}
            size="sm"
            text={event.published ? "Retirar de la web" : "Publicar"}
            disabled={busy}
            onClick={() => onTogglePublication(event)}
          />
        </div>
      </div>

      {!event.published && isConfirmingDelete && (
        <EventDeleteConfirm
          event={event}
          busy={busy}
          onConfirm={() => onConfirmDelete(event)}
          onCancel={onCancelDelete}
        />
      )}

      {isEditing && (
        <div className="border-t border-line bg-surface/45 p-5 sm:p-6">
          <EventForm
            key={event.id}
            event={event}
            inline
            onCancel={onCancelEdit}
            onSaved={onSavedEdit}
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
            onCancel={onCancelSchedule}
            onSaved={onSavedSchedule}
          />
        </div>
      )}

      {isShowingHistory && (
        <div className="border-t border-line bg-surface/45 p-5 sm:p-6">
          <EventHistory
            key={event.id}
            event={event}
            inline
            onClose={onCloseHistory}
          />
        </div>
      )}
    </li>
  );
}
