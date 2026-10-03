import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Dost } from "@/components/molecules/shared/dots";
import { Button } from "@/components/atoms/button";

function EventsControls({ events, current, next, goTo, goNext, goPrev }) {
  return (
    <div className="mt-8 flex items-center justify-center gap-3 sm:gap-6">
      <Button
        type="button"
        onClick={() => goPrev()}
        aria-label="Evento anterior"
        variant="ternary"
        className="rounded-full"
      >
        <FaChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
      </Button>

      <Dost
        dots={events}
        next={next}
        current={current}
        goTo={(i) => goTo(i, true)}
      />

      <Button
        type="button"
        onClick={() => goNext(true)}
        aria-label="Siguiente evento"
        variant="ternary"
      >
        <span className="hidden sm:inline">Siguiente evento</span>
        <FaChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Button>
    </div>
  );
}

export { EventsControls };