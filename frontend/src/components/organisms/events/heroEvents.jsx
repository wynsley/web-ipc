import { staggerContainer } from "@/components/animations/animation";
import {
  formatEventDay,
  formatEventMonth,
  formatEventYear,
} from "@/data/events/evenst";
import heroImage from "@assets/images/events/hero-events.webp";
import { motion as Motion } from "motion/react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

function HeroEvents({ event, onRegister }) {
  return (
    <section className="relative z-0 select-none">
      <div
        className="relative flex items-center overflow-hidden bg-blue-deep
          h-[60vh] py-12 sm:min-h-[70vh] md:min-h-[72vh] xl:min-h-[75vh]
          "
      >
        {/* Imagen de fondo */}
        <img
          src={heroImage}
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Degradado de marca */}
        <div className="absolute inset-0 bg-linear-to-r from-blue-deep via-blue-deep/10 to-blue-deep/10" />

        {/* Banda + contenido */}
        <div className="relative z-10 w-[96%] sm:w-[88%] lg:w-[78%] xl:w-[72%]">
          {/* Banda inclinada */}
          <Motion.div
            aria-hidden="true"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="
              absolute inset-0
              bg-linear-to-r from-blue-deep via-blue-deep/90 to-blue/40
              [clip-path:polygon(0_0,100%_0,92%_100%,0_100%)]
            "
          />

          {/* Contenido */}
          <Motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative py-10 pl-6 pr-[14%] sm:py-12 sm:pl-12 lg:pl-20 xl:pl-[max(5rem,calc((100vw-80rem)/2+2rem))]"
          >

            {/* Título grande */}
            <h1 className="mt-3 max-w-2xl font-hani text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              Conoce nuestros{" "}
              <span className="text-orange">eventos más recientes</span>
            </h1>

            {/* Línea decorativa */}
            <span
              aria-hidden="true"
              className="mt-4 block h-1 w-44 rounded-full bg-linear-to-r from-orange to-orange/0 sm:w-64"
            />

            {/* Descripción */}
            <p className="mt-5 max-w-xl font-poppins text-sm leading-relaxed text-white/80 sm:text-base">
              {event.description}
            </p>

            {/* Píldora blanca: de qué trata + fecha */}
            <div className="mt-8 flex w-full max-w-2xl flex-col gap-3 rounded-3xl bg-white p-2 pl-5 shadow-xl sm:flex-row sm:items-center sm:justify-between sm:rounded-full">
              {/* Izquierda: nombre del evento */}
              <div className="flex min-w-0 items-center gap-3 pt-2 sm:pt-0">
                <FaMapMarkerAlt
                  className="shrink-0 text-orange"
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className="truncate font-hani text-sm font-bold text-neutral-800 sm:text-base">
                    {event.title}{" "}
                    <span className="text-blue">{event.highlight}</span>
                  </p>
                  <p className="truncate font-poppins text-xs text-neutral-500">
                    {event.category} · {event.location}
                  </p>
                </div>
              </div>

              {/* Derecha: fecha */}
              <button
                type="button"
                onClick={() => onRegister?.(event)}
                aria-label={`Inscribirse a ${event.title} ${event.highlight}`}
                className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 font-hani text-xs font-bold text-white transition hover:brightness-110 sm:text-sm"
              >
                <FaCalendarAlt aria-hidden="true" />
                <span className="capitalize">
                  {formatEventDay(event.date)} {formatEventMonth(event.date)}{" "}
                  {formatEventYear(event.date)}
                </span>
              </button>
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
}

export { HeroEvents };