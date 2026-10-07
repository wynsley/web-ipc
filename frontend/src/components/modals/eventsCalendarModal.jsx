import { useEffect } from "react";
import { createPortal } from "react-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
  FaTimes,
} from "react-icons/fa";
import { useClickOutside } from "@/hooks/modal/usClickOutside";
import { CalendarGrid } from "@/components/molecules/events/calendarGrid";
import { EventListCard } from "@/components/molecules/events/eventListCard";
import { useEventsCalendar } from "@/hooks/events/useEventCalendar";
import { downloadIcs } from "../../../utils/calendarLinks";
import { formatCalendarTitle, formatDayLong } from "../../../utils/calendarDates";

const VIEWS = [
  { id: "day", label: "Día" },
  { id: "week", label: "Semana" },
  { id: "month", label: "Mes" },
];

const navButton =
  "flex h-8 w-8 items-center justify-center text-blue-deep transition hover:bg-blue-deep/10";

function DayAgenda({ dayKey, entries, selectedId, onSelectEvent }) {
  return (
    <section aria-label={`Eventos del ${formatDayLong(dayKey)}`}>
      <h3 className="mb-3 font-hani text-lg font-bold text-blue-deep">
        {formatDayLong(dayKey)}
      </h3>

      {entries.length === 0 ? (
        <p className="bg-blue-deep/5 px-4 py-6 text-center font-poppins text-sm text-neutral-600">
          No hay eventos programados para este día.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {entries.map(({ event }) => (
            <li key={event.id}>
              <EventListCard
                event={event}
                active={event.id === selectedId}
                onSelect={onSelectEvent}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/**
 * Modal con el calendario de todos los eventos.
 *
 * Props:
 *  - toggleModal    : cierra el modal (mismo patrón que ModalMessage)
 *  - events         : lista completa de eventos (estática hoy, API mañana)
 *  - initialEventId : evento que se muestra seleccionado al abrir
 */
function EventsCalendarModal({ toggleModal, events, initialEventId }) {
  const modalRef = useClickOutside(toggleModal);
  const cal = useEventsCalendar(events, initialEventId);

  // Bloquea el scroll de la página y cierra con Escape.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") toggleModal();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [toggleModal]);

  // En móvil la lista queda debajo del calendario: al elegir un evento, sube.
  const handleSelectFromList = (event) => {
    cal.selectEvent(event);
    modalRef.current?.scrollTo?.({ top: 0, behavior: "smooth" });
  };

  const showingUpcoming = cal.listMode === "upcoming";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Calendario de eventos"
      className="fixed inset-0 z-1000 flex items-center justify-center bg-black/50 p-3 sm:p-6"
    >
      <div
        ref={modalRef}
        // Evita que un re-render que reemplaza el nodo clicado cuente como "clic fuera".
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-y-auto bg-white shadow-2xl md:h-[88vh] md:flex-row md:overflow-hidden"
      >
        <button
          type="button"
          onClick={toggleModal}
          aria-label="Cerrar calendario"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center bg-white text-blue-deep transition hover:bg-blue-deep hover:text-white"
        >
          <FaTimes aria-hidden="true" />
        </button>

        {/* Calendario */}
        <section className="order-1 flex-1 p-4 sm:p-6 md:order-2 md:overflow-y-auto">
          <div className="flex flex-wrap items-center justify-between gap-3 pr-11">
            <div className="flex items-center gap-1">
              <h2 className="mr-2 font-hani text-xl font-bold text-blue-deep sm:text-2xl">
                {formatCalendarTitle(cal.view, cal.cursor)}
              </h2>
              <button
                type="button"
                onClick={() => cal.shift(-1)}
                aria-label="Anterior"
                className={navButton}
              >
                <FaChevronLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => cal.shift(1)}
                aria-label="Siguiente"
                className={navButton}
              >
                <FaChevronRight aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={cal.goToday}
                className="ml-1 border border-blue-deep/30 px-3 py-1 font-poppins text-xs font-semibold text-blue-deep transition hover:bg-blue-deep hover:text-white"
              >
                Hoy
              </button>
            </div>

            <div
              role="group"
              aria-label="Vista del calendario"
              className="flex bg-blue-deep/10 p-1"
            >
              {VIEWS.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={cal.view === id}
                  onClick={() => cal.setView(id)}
                  className={`px-3 py-1.5 font-poppins text-xs font-semibold transition sm:px-4 sm:text-sm ${
                    cal.view === id
                      ? "bg-blue-deep text-white"
                      : "text-neutral-600 hover:text-blue-deep"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {cal.view !== "day" && (
            <div className="mt-5">
              <CalendarGrid
                view={cal.view}
                cells={cal.cells}
                eventsByDay={cal.eventsByDay}
                today={cal.today}
                selectedDay={cal.selectedDay}
                selectedId={cal.selectedId}
                onSelectDay={cal.selectDay}
                onSelectEvent={cal.selectEvent}
              />
            </div>
          )}

          {cal.agendaKey && (
            <div className="mt-5">
              <DayAgenda
                dayKey={cal.agendaKey}
                entries={cal.agendaEntries}
                selectedId={cal.selectedId}
                onSelectEvent={cal.selectEvent}
              />
            </div>
          )}
        </section>

        {/* Lista de eventos */}
        <aside className="order-2 bg-blue-deep/5 p-4 sm:p-6 md:order-1 md:w-96 md:shrink-0 md:overflow-y-auto">
          <h2 className="font-hani text-2xl font-bold text-blue-deep">
            {showingUpcoming ? "Próximos eventos" : "Eventos pasados"}
          </h2>
          <p className="font-poppins text-sm text-neutral-600">
            {showingUpcoming ? "No te pierdas la agenda" : "Revive lo que ya vivimos"}
          </p>

          <div
            role="group"
            aria-label="Tipo de eventos"
            className="mt-4 flex bg-blue-deep/10 p-1"
          >
            {[
              { id: "upcoming", label: `Próximos (${cal.upcoming.length})` },
              { id: "past", label: `Pasados (${cal.past.length})` },
            ].map(({ id, label }) => (
              <button
                key={id}
                type="button"
                aria-pressed={cal.listMode === id}
                onClick={() => cal.setListMode(id)}
                className={`flex-1 px-3 py-1.5 font-poppins text-xs font-semibold transition sm:text-sm ${
                  cal.listMode === id
                    ? "bg-blue-deep text-white"
                    : "text-neutral-600 hover:text-blue-deep"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {cal.listEvents.length === 0 ? (
            <p className="mt-4 bg-white px-4 py-6 text-center font-poppins text-sm text-neutral-600">
              {showingUpcoming
                ? "Por ahora no hay eventos próximos."
                : "Todavía no hay eventos pasados."}
            </p>
          ) : (
            <ul className="mt-4 flex flex-col gap-3">
              {cal.listEvents.map((event) => (
                <li key={event.id}>
                  <EventListCard
                    event={event}
                    active={event.id === cal.selectedId}
                    onSelect={handleSelectFromList}
                  />
                </li>
              ))}
            </ul>
          )}

          {showingUpcoming && cal.upcoming.length > 0 && (
            <button
              type="button"
              onClick={() => downloadIcs(cal.upcoming)}
              className="mt-4 flex w-full items-center justify-center gap-2 border border-blue-deep/30 px-4 py-2.5 font-poppins text-sm font-semibold text-blue-deep transition hover:bg-blue-deep hover:text-white"
            >
              <FaDownload aria-hidden="true" />
              Descargar todos los próximos (.ics)
            </button>
          )}
        </aside>
      </div>
    </div>,
    document.body,
  );
}

export { EventsCalendarModal };