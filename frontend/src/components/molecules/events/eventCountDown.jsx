import { Fragment } from "react";
import { AnimatePresence, motion as Motion } from "motion/react";
import { useCountdown } from "@/hooks/events/useCountDown";
import { slideVariants, SLIDE_EASE } from "@/components/animations/eventsSlides";

const UNITS = [
  { key: "days", label: "Días" },
  { key: "hours", label: "Horas" },
  { key: "minutes", label: "Minutos" },
  { key: "seconds", label: "Segundos" },
];

const pad = (n) => String(n).padStart(2, "0");

function EventsCountdownBand({ event, direction }) {
  const timeLeft = useCountdown(event.date);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between  px-5 lg:px-6 py-3 text-center sm:py-8 w-full bg-blue-deep
    [clip-path:polygon(0_28px,28px_0,100%_0,100%_calc(100%_-_28px),calc(100%_-_28px)_100%,0_100%)]
    sm:[clip-path:polygon(0_48px,48px_0,100%_0,100%_calc(100%_-_48px),calc(100%_-_48px)_100%,0_100%)]
    md:w-[75%] lg:w-[62%] xl:w-[52%]
    ">
      <div>
        <p className="font-poppins text-xs text-white/70">
          Próximo evento:
        </p>
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <Motion.p
            key={event.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: SLIDE_EASE }}
            className="mt-1 font-hani text-lg font-bold text-white sm:text-xl"
          >
            {event.title} <span className="text-orange">{event.highlight}</span>
          </Motion.p>
        </AnimatePresence>
      </div>

      <div role="timer" className="flex items-start justify-center gap-3 xl:gap-6">
        {UNITS.map(({ key, label }, i) => (
          <Fragment key={key}>
            <div className="flex min-w-14 flex-col items-center sm:min-w-18">
              <span className="font-hani text-[1.5em] md:text-3xl font-bold leading-none tabular-nums text-white ">
                {pad(timeLeft[key])}
              </span>
              <span className="mt-2 font-poppins text-[0.65rem] uppercase tracking-wide text-white/60 sm:text-xs">
                {label}
              </span>
            </div>
            {i < UNITS.length - 1 && (
              <span
                aria-hidden="true"
                className="hidden font-hani text-4xl leading-none text-white/20 md:block"
              >
                :
              </span>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export { EventsCountdownBand };