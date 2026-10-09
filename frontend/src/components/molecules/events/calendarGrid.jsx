import { formatEventTime } from "@/data/events/evenst";
import { formatDayLong, WEEKDAYS } from "../../../../utils/calendarDates";
import { getCategoryStyle } from "@/data/events/categoryStiles";

const MAX_CHIPS = { month: 2, week: 8 };

function DayCell({
  cell,
  view,
  entries,
  isToday,
  isSelected,
  selectedId,
  onSelectDay,
  onSelectEvent,
}) {
  const visible = entries.slice(0, MAX_CHIPS[view] ?? 2);
  const extra = entries.length - visible.length;

  const height =
    view === "week"
      ? "min-h-14 sm:min-h-20 md:min-h-56"
      : "min-h-14 sm:min-h-20 md:min-h-24";
  const background = isSelected
    ? "bg-blue-deep/10"
    : cell.inMonth
      ? "bg-white"
      : "bg-neutral-50";
  const numberStyle = isToday
    ? "bg-blue-deep text-white"
    : cell.inMonth
      ? "text-neutral-800"
      : "text-neutral-300";

  return (
    <div
      onClick={() => onSelectDay(cell.key)}
      className={`flex cursor-pointer flex-col gap-1 border-b border-r border-blue-deep/15 p-1 sm:p-1.5 ${height} ${background}`}
    >
      <button
        type="button"
        aria-label={formatDayLong(cell.key)}
        aria-current={isToday ? "date" : undefined}
        onClick={(e) => {
          e.stopPropagation();
          onSelectDay(cell.key);
        }}
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-poppins text-xs font-semibold ${numberStyle}`}
      >
        {cell.day}
      </button>

      {entries.length > 0 && (
        <>
          {/* Móvil: solo puntos de color */}
          <div className="flex flex-wrap gap-0.5 md:hidden" aria-hidden="true">
            {entries.slice(0, 4).map(({ event }) => (
              <span
                key={event.id}
                className={`h-1.5 w-1.5 rounded-full ${getCategoryStyle(event.category).dot}`}
              />
            ))}
          </div>

          {/* Escritorio: chips con título y hora */}
          <ul className="hidden flex-col gap-1 md:flex">
            {visible.map(({ event, isStart }) => (
              <li key={event.id}>
                <button
                  type="button"
                  title={event.title}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectEvent(event);
                  }}
                  className={`block w-full px-1.5 py-1 text-left font-poppins leading-tight ${
                    getCategoryStyle(event.category).chip
                  } ${selectedId === event.id ? "ring-1 ring-blue-deep" : ""}`}
                >
                  <span className="block truncate text-[11px] font-semibold">
                    {event.title}
                  </span>
                  <span className="block truncate text-[10px] opacity-80">
                    {isStart ? formatEventTime(event.date) : "Continúa"}
                  </span>
                </button>
              </li>
            ))}
            {extra > 0 && (
              <li className="px-1 font-poppins text-[10px] font-semibold text-blue-deep">
                +{extra} más
              </li>
            )}
          </ul>
        </>
      )}
    </div>
  );
}

function CalendarGrid({
  view,
  cells,
  eventsByDay,
  today,
  selectedDay,
  selectedId,
  onSelectDay,
  onSelectEvent,
}) {
  return (
    <div aria-label="Calendario de eventos">
      <div className="grid grid-cols-7 border border-b-0 border-blue-deep/15 bg-blue-deep/10">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="py-2 text-center font-poppins text-xs font-semibold text-blue-deep sm:text-sm"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 border-l border-t border-blue-deep/15">
        {cells.map((cell) => (
          <DayCell
            key={cell.key}
            cell={cell}
            view={view}
            entries={eventsByDay[cell.key] ?? []}
            isToday={cell.key === today}
            isSelected={cell.key === selectedDay}
            selectedId={selectedId}
            onSelectDay={onSelectDay}
            onSelectEvent={onSelectEvent}
          />
        ))}
      </div>
    </div>
  );
}

export { CalendarGrid };