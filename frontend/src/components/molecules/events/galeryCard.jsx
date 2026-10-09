import { CategoryBadge } from "@/components/atoms/categoryBadge";
import { Title } from "@/components/atoms/titles";
import { formatEventDate } from "@/data/events/evenst";

function GalleryCard({ event, aspect, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Ver fotos de ${event.title}`}
      className={`group relative block w-full overflow-hidden bg-slate-200 shadow-sm shadow-blue-deep
        outline-none focus-visible:ring-2 focus-visible:ring-orange ${aspect}`
      }
    >
      <img
        src={event.image}
        alt={event.title}
        loading="lazy"
        draggable={false}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105
        drop-shadow-aria
        "
      />

      {/* Solo aparece con mouse (hover) o con teclado (focus) */}
      <div className="absolute inset-0 flex flex-col justify-end gap-1 bg-linear-to-t from-blue-deep/85 via-blue-deep/35 to-transparent p-4 text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <CategoryBadge>{event.category}</CategoryBadge>
        <Title
          text={event.title}
          level="h4"
          weight="bold"
          className="font-euro"
          variant="primary"
        />
        <p className="font-poppins text-xs text-white/80">
          {formatEventDate(event.date)}
        </p>
      </div>
    </button>
  );
}

export { GalleryCard };