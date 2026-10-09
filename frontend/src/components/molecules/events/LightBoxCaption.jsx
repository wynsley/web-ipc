
import { CategoryBadge } from "@/components/atoms/categoryBadge";
import { Paragraph } from "@/components/atoms/paragraph";
import { Title } from "@/components/atoms/titles";
import { formatEventDate } from "@/data/events/evenst";

function LightboxCaption({ event }) {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 pb-6 pt-4 text-white">
      <CategoryBadge>{event.category}</CategoryBadge>
      <Title
        text={event.title}
        level="h4"
        variant="primary"
        weight="bold"
      />
      <p className="mt-1 font-poppins text-xs text-white/70 sm:text-sm">
        {formatEventDate(event.date)} · {event.location}
      </p>
      <Paragraph
        text={event.longDescription}
        size="small"
        variant="ternary"
        className="font-poppins"
      />
    </div>
  );
}

export { LightboxCaption };