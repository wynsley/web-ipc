import {staggerContainer } from "@/components/animations/animation"
import { motion as Motion } from "motion/react"
import {
  formatEventDay,
  formatEventMonth,
  formatEventYear,
} from "@/data/events/evenst";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Title } from "@/components/atoms/titles";
import { Paragraph } from "@/components/atoms/paragraph";
import { ScrollReveal } from "@/components/layouts/scrollReveal";

function DescrioptionHero({event}) {

  const title = "CONOCE NUESTROS EVENTOS"

  return (
    <div>
      <Motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        viewport={{once: true, amount: 0.2}}
        className="relative py-10 pl-6 pr-[14%] sm:py-12 sm:pl-12 lg:pl-20 xl:pl-[max(5rem,calc((100vw-80rem)/2+2rem))]"
      >

        <Title
          text={title}
          variant="primary"
          weight="bold"
        />

        {/* Línea decorativa */}
        <span
          aria-hidden="true"
          className="mt-4 block h-1 w-60 rounded-full bg-linear-to-r from-blue to-orange/0 sm:w-120"
        />

        <ScrollReveal
          delay={0.2}
          duration={0.8}
          y={30}
          className="mt-8 flex w-full max-w-2xl flex-col gap-3  bg-white p-2 pl-5 shadow-xl sm:flex-row sm:items-center sm:justify-between">
          {/* Izquierda: nombre del evento */}
          <div className="flex min-w-0 items-center gap-3 pt-2 sm:pt-0">
            <FaMapMarkerAlt
              className="shrink-0 size-6 text-red-500"
              aria-hidden="true"
            />
            <div className="min-w-0 flex flex-col items-start">
              <Paragraph
                text={event.highlight}
                variant="danger"
                weight="bold"
                size="large"
                className="truncate font-hani "
              />
              <small className="truncate font-poppins text-xs text-neutral-500">
                {event.category} · {event.location}
              </small>
            </div>
          </div>

          {/* Derecha: fecha */}
          <button
            type="button"
            aria-label={`Inscribirse a ${event.title} ${event.highlight}`}
            className="flex shrink-0 items-center justify-center gap-2 bg-orange px-5 py-3 font-hani text-xs font-bold text-white transition hover:brightness-110 sm:text-sm"
          >
            <FaCalendarAlt aria-hidden="true" />
            <span className="capitalize">
              {formatEventDay(event.date)} {formatEventMonth(event.date)}{" "}
              {formatEventYear(event.date)}
            </span>
          </button>
        </ScrollReveal>
      </Motion.div>
    </div>
  )

}

export { DescrioptionHero }