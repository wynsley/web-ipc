import { AnimatePresence, motion as Motion } from "motion/react";
import { FaCheckCircle, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { SLIDE_EASE, slideVariants } from "@/components/animations/eventsSlides";
import { Reveal } from "@/components/molecules/events/reveal";
import { EventsControls } from "./eventsControls";
import { useEventsCarousel } from "@/hooks/events/useEventCarousel";
import { formatEventDate } from "@/data/events/evenst";
import { EventsCountdownBand } from "@/components/molecules/events/eventCountDown";

function EventsShowcase({ onRegister, onMore }) {
  const {
    events, event, direction, current, next,
    goTo, goNext, goPrev, dragHandlers, hoverHandlers,
  } = useEventsCarousel();

  return (
    // Fondo gris a todo el ancho
    <section
      aria-roledescription="carousel"
      aria-label="Próximos eventos"
      {...hoverHandlers}
      className="relative w-full overflow-hidden  pb-14 sm:px-6 md:pb-20 lg:px-16"
    >
      <EventsCountdownBand event={event} direction={direction} />
      <div className=" bg-blue-deep/20 ">

        <div className="mx-auto max-w-6xl mt-14 grid items-center gap-10 md:mt-20 md:grid-cols-[1.4fr_1fr] md:gap-14
          py-10
        ">
          <div>
            <AnimatePresence mode="wait" custom={direction}>
              <div key={event.id}>
                <Reveal direction={direction}>
                  <span className="font-poppins text-sm text-orange">
                    [{event.category}]
                  </span>
                </Reveal>

                <Reveal direction={direction} delay={0.08} className="mt-2">
                  <h2 className="font-hani text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl">
                    {event.title}{" "}
                    <span className="text-blue">{event.highlight}</span>
                  </h2>
                </Reveal>

                <Reveal direction={direction} delay={0.16} className="mt-4">
                  <p className="font-poppins text-sm leading-relaxed text-neutral-600 sm:text-base">
                    {event.longDescription}
                  </p>
                </Reveal>

                <Reveal direction={direction} delay={0.2} className="mt-5">
                  <div className="flex flex-wrap gap-x-6 gap-y-2 font-poppins text-sm text-neutral-700">
                    <span className="flex items-center gap-2">
                      <FaCalendarAlt className="text-orange" aria-hidden="true" />
                      {formatEventDate(event.date)}
                    </span>
                    <span className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-orange" aria-hidden="true" />
                      {event.location}
                    </span>
                  </div>
                </Reveal>

                <Reveal direction={direction} delay={0.26} className="mt-6">
                  <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {event.highlights?.map((item) => (
                      <li
                        key={item}
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
                </Reveal>

                <Reveal direction={direction} delay={0.32} className="mt-8">
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => onRegister?.(event)}
                      className="rounded-full bg-blue-deep px-7 py-3 font-hani text-sm font-bold text-white transition hover:brightness-125"
                    >
                      Inscríbete
                    </button>
                    <button
                      type="button"
                      onClick={() => onMore?.(event)}
                      className="rounded-full border border-blue-deep px-7 py-3 font-hani text-sm font-bold text-blue-deep transition hover:bg-blue-deep hover:text-white"
                    >
                      Más información
                    </button>
                  </div>
                </Reveal>
              </div>
            </AnimatePresence>

            {/* Anterior · puntos · Siguiente evento */}
            <div className="mt-8 [&>div]:justify-start">
              <EventsControls
                events={events}
                current={current}
                next={next}
                goTo={goTo}
                goNext={goNext}
                goPrev={goPrev}
              />
            </div>
          </div>

          <div
            {...dragHandlers}
            className="relative mx-auto  h-full w-full  "
          >
            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
              <Motion.img
                key={event.id}
                src={event.image}
                alt={`${event.title} ${event.highlight}`}
                draggable={false}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: SLIDE_EASE }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export { EventsShowcase };