import { AnimatePresence, motion as Motion } from "motion/react";
import { FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";
import { SLIDE_EASE, slideVariants } from "@/components/animations/eventsSlides";
import { Reveal } from "@/components/molecules/events/reveal";
import { EventsControls } from "./eventsControls";
import { useEventsCarousel } from "@/hooks/events/useEventCarousel";
import { formatEventDate } from "@/data/events/evenst";
import { EventsCountdownBand } from "@/components/molecules/events/eventCountDown";
import { Button } from "@/components/atoms/button";
import { Title } from "@/components/atoms/titles";
import { Paragraph } from "@/components/atoms/paragraph";

function EventsShowcase() {
  const {
    events, event, direction, current, next,
    goTo, goNext, goPrev, hoverHandlers,
  } = useEventsCarousel();

  const title = `${event.category} de ${event.highlight}`
  const index = next !== null ? next : current;
  const order = String(index + 1).padStart(2, "0");

  return (
    <section
      {...hoverHandlers}
      className="relative w-full overflow-hidden pb-14 sm:px-6 md:pb-20 lg:px-16"
    >
      <EventsCountdownBand event={event} direction={direction} />

      <div className="bg-blue-deep/10 pb-10">
        <div
          className="
            mx-auto mt-14 grid max-w-6xl items-stretch gap-10 px-5 py-5
            md:mt-20 md:grid-cols-[1.4fr_1fr] md:gap-14 md:py-10
            md:min-h-[26rem] lg:min-h-[30rem]
          "
        >
          {/* Texto */}
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <div key={event.id}>
                <Reveal direction={direction}>

                  <div className="flex items-center gap-2">
                    <span className="font-poppins font-extrabold text-2xl h-12 w-12 text-white bg-blue/40 flex items-center justify-center rounded-full">{order}</span>
                    <span className="font-euro font-extrabold text-xl text-blue">
                    {formatEventDate(event.date)}
                  </span>
                  </div>
                </Reveal>

                <Reveal direction={direction} delay={0.08} className="mt-2">
                  <Title
                    text={title}
                    level="h2"
                    weight="bold"
                    className="font-hani"
                  />
                </Reveal>

                <Reveal direction={direction} delay={0.16} className="mt-4">
                  <Paragraph
                    text={event.longDescription}
                    variant="secondary"
                    className="font-poppins"
                    size="base"
                  />
                </Reveal>

                <Reveal direction={direction} delay={0.2} className="mt-5">
                  <div className="flex flex-wrap gap-x-6 gap-y-2 font-poppins text-sm text-neutral-700">
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
                  <Button 
                    text="Más información" 
                    variant="base" 
                  />
                </Reveal>
              </div>
            </AnimatePresence>
          </div>

          {/* Imagen: altura fija en móvil, ocupa toda la fila desde md */}
          <div className="relative mx-auto h-64 w-full overflow-hidden sm:h-80 md:h-full">
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

        {/* Controles */}
        <div className="mt-6 md:mt-10">
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
    </section>
  );
}

export { EventsShowcase };