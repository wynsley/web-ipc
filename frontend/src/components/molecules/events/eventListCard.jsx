import { FaMapMarkerAlt } from "react-icons/fa";
import { AddToCalendarMenu } from "./addToCalendarMenu";
import { formatEventSchedule, isPastEvent } from "@/data/events/evenst";
import { getCategoryStyle } from "@/data/events/categoryStiles";

function EventListCard({ event, active = false, onSelect }) {
  const past = isPastEvent(event);
  const style = getCategoryStyle(event.category);

  return (
    <article
      className={`relative border bg-white transition ${
        active
          ? "border-blue-deep shadow-md"
          : "border-blue-deep/10 hover:border-blue-deep/40"
      }`}
    >
      <button
        type="button"
        onClick={() => onSelect?.(event)}
        aria-pressed={active}
        className={`block w-full p-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-blue-deep ${
          past ? "" : "pr-12"
        }`}
      >
        <span className="flex items-center gap-2 font-poppins text-xs font-medium text-neutral-600">
          <span
            aria-hidden="true"
            className={`h-2.5 w-2.5 shrink-0 rounded-full ${style.dot}`}
          />
          <span>{formatEventSchedule(event)}</span>
        </span>

        <span className="mt-2 block font-hani text-lg font-bold leading-tight text-blue-deep">
          {event.title}
        </span>

        <span className="mt-1 line-clamp-2 font-poppins text-sm text-neutral-600">
          {event.shortDescription}
        </span>

        <span className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-poppins text-xs text-neutral-500">
          <span className="flex items-center gap-1.5">
            <FaMapMarkerAlt className="text-orange" aria-hidden="true" />
            {event.location}
          </span>
          {past && (
            <span className="bg-neutral-200 px-2 py-0.5 font-semibold text-neutral-600">
              Finalizado
            </span>
          )}
        </span>
      </button>

      {!past && (
        <div className="absolute right-2 top-2">
          <AddToCalendarMenu event={event} />
        </div>
      )}
    </article>
  );
}

export { EventListCard };