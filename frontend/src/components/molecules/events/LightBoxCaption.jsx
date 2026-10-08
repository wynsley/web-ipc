
import { CategoryBadge } from "@/components/atoms/categoryBadge";
import { formatEventDate } from "@/data/events/evenst";

function LightboxCaption({ event }) {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 pb-6 pt-4 text-white">
      <CategoryBadge>{event.category}</CategoryBadge>
      <h3 className="mt-2 font-hani text-xl leading-tight sm:text-2xl">
        {event.title}
      </h3>
      <p className="mt-1 font-poppins text-xs text-white/70 sm:text-sm">
        {formatEventDate(event.date)} · {event.location}
      </p>
      <p className="mt-2 max-h-24 overflow-y-auto font-poppins text-sm leading-relaxed text-white/85">
        {event.longDescription}
      </p>
    </div>
  );
}

export { LightboxCaption };