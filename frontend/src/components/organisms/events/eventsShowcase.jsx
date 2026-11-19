import { AnimatePresence, motion as Motion } from "motion/react";
import { FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";
import {
  SLIDE_EASE,
  slideVariants,
} from "@/components/animations/eventsSlides";
import { EventsControls } from "./eventsControls";
import { useEventsCarousel } from "@/hooks/events/useEventCarousel";
import { formatEventDate } from "@/data/events/evenst";
import { EventsCountdownBand } from "@/components/molecules/events/eventCountDown";
import { Image } from "@/components/atoms/image";
import { Button } from "@/components/atoms/button";
import { Title } from "@/components/atoms/titles";
import { Paragraph } from "@/components/atoms/paragraph";

// El modal ya no vive aquí: lo renderiza EventsPage y este componente solo lo pide.
function EventsShowcase({ publishedEvents, now, clockOffset = 0, onOpenCalendar }) {
  const {
    events,
    event,
    direction,
    current,
    next,
    goTo,
    goNext,
    goPrev,
    hoverHandlers,
    manualPaused,
    togglePause,
  } = useEventsCarousel(publishedEvents);

  if (!event) return null;

  const index = next !== null ? next : current;
  const order = String(index + 1).padStart(2, "0");
  const countdownEvent =
    Date.parse(event.date) > now
      ? event
      : events.find((item) => Date.parse(item.date) > now);

  return (
    <section
      {...hoverHandlers}
      className="relative w-full overflow-hidden pb-14 sm:px-6 md:pb-20 lg:px-16"
    >
      {countdownEvent && (
        <EventsCountdownBand
          event={countdownEvent}
          direction={direction}
          clockOffset={clockOffset}
        />
      )}

      <div className="bg-blue-deep/10 pb-10">
        <div
          className="
            mx-auto mt-14 grid max-w-6xl items-stretch gap-10 px-5 py-5
            md:mt-20 md:grid-cols-[1.4fr_1fr] md:gap-14 md:py-10
            md:min-h-[26rem] lg:min-h-[30rem]
          "
        >
          {/* Texto: un único Motion.div directo dentro de AnimatePresence evita bloqueos al actualizar datos */}
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <Motion.div
                key={event.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: SLIDE_EASE }}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue/40 font-poppins text-2xl font-extrabold text-white">
                    {order}
                  </span>
                  <span className="font-euro text-xl font-extrabold text-blue">
                    {formatEventDate(event.date)}
                  </span>
                  {event.scheduleNotice && (
                    <span className="rounded-full border border-orange/35 bg-orange/15 px-2.5 py-0.5 font-poppins text-xs font-semibold text-orange">
                      Horario actualizado
                    </span>
                  )}
                </div>

                <div className="mt-2">
                  <Title
                    text={event.title}
                    level="h2"
                    weight="bold"
                    className="font-hani"
                  />
                </div>

                <div className="mt-4">
                  <Paragraph
                    text={event.longDescription}
                    variant="secondary"
                    className="font-poppins"
                    size="base"
                  />
                </div>

                <div className="mt-5">
                  <div className="flex flex-wrap gap-x-6 gap-y-2 font-poppins text-sm text-neutral-700">
                    <span className="flex items-center gap-2">
                      <FaMapMarkerAlt
                        className="text-orange"
                        aria-hidden="true"
                      />
                      {event.location}
                    </span>
                  </div>
                </div>

                {event.highlights?.length > 0 && (
                  <div className="mt-6">
                    <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                      {event.highlights.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 font-poppins text-sm font-medium text-neutral-800"
                        >
                          <FaCheckCircle
                            className="shrink-0 text-blue-deep"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-8">
                  <Button
                    text="Ver todos los eventos"
                    variant="base"
                    onClick={() => onOpenCalendar(event.id)}
                  />
                </div>
              </Motion.div>
            </AnimatePresence>
          </div>

          {/* Imagen: altura fija en móvil, ocupa toda la fila desde md */}
          <div className="relative mx-auto h-64 w-full overflow-hidden sm:h-80 md:h-full">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <Motion.div
                key={event.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: SLIDE_EASE }}
                className="absolute inset-0"
              >
                <Image
                  fill
                  crop={event.imageCrop}
                  src={event.image}
                  alt={event.image ? event.title : ""}
                  draggable={false}
                />
              </Motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Controles */}
        <div className="mt-6 md:mt-10">
          {events.length > 1 && (
            <EventsControls
              events={events}
              current={current}
              next={next}
              goTo={goTo}
              goNext={goNext}
              goPrev={goPrev}
              paused={manualPaused}
              onTogglePause={togglePause}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export { EventsShowcase };
