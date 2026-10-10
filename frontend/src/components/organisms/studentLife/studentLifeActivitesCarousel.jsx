import { useEffect, useRef } from "react"
import { ActivityCard } from "@/components/molecules/studentLife/activitieCard"
import { useCarousel } from "@/hooks/globals/useCarrusel"
import { Dost } from "@/components/molecules/shared/dots"

const GAP_REM = 1.25
const TRANSITION_MS = 700
const AUTOPLAY_MS = 3000
const RESUME_AFTER_INTERACTION_MS = 4000

function ActivitiesCarousel({ slides, cardsPerView }) {
  const {
    extendedSlides,
    activeDot,
    next,
    goTo,
    dragHandlers,
    cardWidthExpr,
    translateX,
    withTransition,
    setUserPaused,
  } = useCarousel({
    slides,
    cardsPerView,
    gapRem: GAP_REM,
    autoplayDelay: AUTOPLAY_MS,
    transitionMs: TRANSITION_MS,
    getSrc: (slide) => slide.image,
  })

  // useCarousel pausa el autoplay al interactuar; aquí lo reanudamos.
  const resumeTimer = useRef(null)
  useEffect(() => () => clearTimeout(resumeTimer.current), [])

  const resumeLater = () => {
    clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(
      () => setUserPaused(false),
      RESUME_AFTER_INTERACTION_MS
    )
  }

  // Dost llama goTo(i) sin saber de "byUser" ni del autoplay: lo envolvemos.
  const handleDotClick = (i) => {
    goTo(i, true)
    resumeLater()
  }

  const handlers = {
    ...dragHandlers,
    // Desktop: pausa mientras el mouse está encima; reanuda al salir.
    onMouseEnter: () => {
      clearTimeout(resumeTimer.current)
      setUserPaused(true)
    },
    onMouseLeave: () => {
      dragHandlers.onMouseLeave()
      setUserPaused(false)
    },
    // Touch: tras deslizar, reanuda a los 4 s.
    onTouchStart: (e) => {
      clearTimeout(resumeTimer.current)
      dragHandlers.onTouchStart(e)
    },
    onTouchEnd: (e) => {
      dragHandlers.onTouchEnd(e)
      resumeLater()
    },
  }

  return (
    <div
      role="region"
      aria-roledescription="carrusel"
      aria-label="Actividades"
    >
      {/* pr-4: deja espacio al marco azul de la última card visible */}
      <div
        {...handlers}
        className="touch-pan-y select-none overflow-hidden py-6 pr-4"
      >
        <div
          className="flex cursor-grab active:cursor-grabbing"
          style={{
            gap: `${GAP_REM}rem`,
            transform: `translateX(${translateX})`,
            transition: withTransition
              ? `transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
              : "none",
          }}
        >
          {extendedSlides.map((slide, i) => (
            <div
              key={`${slide.id}-${i}`}
              // Las cards clonadas (zona duplicada del final) no se anuncian dos veces
              aria-hidden={i >= slides.length}
              style={{ flex: `0 0 calc(${cardWidthExpr})` }}
            >
              <ActivityCard
                title={slide.title}
                description={slide.description}
                image={slide.image}
                alt={slide.alt}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2">
        <Dost
          dots={slides}
          current={activeDot}
          next={next}
          goTo={handleDotClick}
        />
      </div>
    </div>
  )
}

export { ActivitiesCarousel }