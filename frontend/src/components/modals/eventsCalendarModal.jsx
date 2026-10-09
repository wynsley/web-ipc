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
import { Title } from "../atoms/titles";
import { Button } from "../atoms/button";
import { Paragraph } from "../atoms/paragraph";

const VIEWS = [
  { id: "day", label: "Día" },
  { id: "week", label: "Semana" },
  { id: "month", label: "Mes" },
];

const navButton ="flex h-8 w-8 items-center justify-center text-blue-deep transition hover:bg-blue-deep/10";

function DayAgenda({ dayKey, entries, selectedId, onSelectEvent }) {
  return (
    <section aria-label={`Eventos del ${formatDayLong(dayKey)}`}>
      <Title
        text={formatDayLong(dayKey)}
        level="h4"
        className="font-poppins"
      />

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
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-y-auto bg-white shadow-2xl 
        md:h-[88vh] md:flex-row md:overflow-hidden"
      >
        <button
          type="button"
          onClick={toggleModal}
          aria-label="Cerrar calendario"
          className="absolute right-4 top-3 z-10 flex h-9 w-9 rounded-full items-center justify-center bg-white text-blue-deep/50 
          transition hover:bg-blue-deep/80 hover:text-white"
        >
          <FaTimes aria-hidden="true" size={25} />
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
              <Button
                text="Hoy"
                type="button"
                variant="danger"
                onClick={cal.goToday}
              />
            </div>

            <div
              role="group"
              aria-label="Vista del calendario"
              className="flex gap-2"
            >
              {VIEWS.map(({ id, label }) => (
                <Button
                  key={id}
                  type="button"
                  aria-pressed={cal.view === id}
                  variant="danger"
                  onClick={() => cal.setView(id)}
                  className={` ${
                    cal.view === id
                      ? "bg-blue-deep text-white"
                      : "text-white hover:text-white"
                  }`}
                >
                  {label}
                </Button>
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
          <Title
            text={showingUpcoming ? "Próximos eventos" : "Eventos pasados"}
            level="h3"
            weight="bold"
            className="font-poppins"
          />
          <Paragraph
            text={showingUpcoming ? "No te pierdas la agenda" : "Revive lo que ya vivimos"}
            variant="secondary"
            size="small"
            className="font-poppins"
          />

          <div
            role="group"
            aria-label="Tipo de eventos"
            className="mt-4 flex gap-2"
          >
            {[
              { id: "upcoming", label: `Próximos (${cal.upcoming.length})` },
              { id: "past", label: `Pasados (${cal.past.length})` },
            ].map(({ id, label }) => (
              <Button
                key={id}
                text={label}
                variant="danger"
                type="button"
                aria-pressed={cal.listMode === id}
                onClick={() => cal.setListMode(id)}
                className={`${
                  cal.listMode === id
                    ? "bg-blue-deep text-white"
                    : "text-white hover:text-white"
                }`}
              />
            ))}
          </div>

          {cal.listEvents.length === 0 ? (
            <p className="mt-4 bg-white px-4 py-6 text-center font-poppins text-sm text-neutral-600">
              {showingUpcoming
                ? "Por ahora no hay eventos próximos."
                : "Todavía no hay eventos pasados."}
            </p>
          ) : (
            <ul className="mt-4 flex flex-col gap-2">
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