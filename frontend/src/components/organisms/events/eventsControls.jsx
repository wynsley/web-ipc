import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Dost } from "@/components/molecules/shared/dots";

function EventsControls({ events, current, next, goTo, goNext, goPrev }) {
  return (
    <div className="mt-8 flex items-center justify-center gap-3 sm:gap-6">
      <button
        type="button"
        onClick={() => goPrev()}
        aria-label="Evento anterior"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-deep text-blue-deep transition hover:bg-blue-deep hover:text-white"
      >
        <FaChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
      </button>

      <Dost
        dots={events}
        next={next}
        current={current}
        goTo={(i) => goTo(i, true)}
      />

      <button
        type="button"
        onClick={() => goNext(true)}
        aria-label="Siguiente evento"
        className="flex h-10 items-center justify-center gap-2 rounded-full border border-blue-deep px-3 font-hani text-sm font-bold text-blue-deep transition hover:bg-blue-deep hover:text-white sm:px-5"
      >
        <span className="hidden sm:inline">Siguiente evento</span>
        <FaChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}

export { EventsControls };