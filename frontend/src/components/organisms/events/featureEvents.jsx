import { useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useCarousel } from "@/hooks/globals/useCarrusel";
import { useCardsPerView } from "@/hooks/globals/useCardPowerView";
import { FEATURED_EVENTS } from "@/data/events/featureEvents";
import { Dost } from "@/components/molecules/shared/dots";
import { Title } from "@/components/atoms/titles";
import { Paragraph } from "@/components/atoms/paragraph";
import { motion as Motion } from "motion/react";
import { staggerContainer } from "@/components/animations/animation";

const GAP_REM = 1.25;
const TRANSITION_MS = 700;

function FeatureEvents() {
  const cardsPerView = useCardsPerView("default");

  const {
    extendedSlides,
    cardWidthExpr,
    translateX,
    withTransition,
    activeDot,
    goTo,
    dragHandlers,
    userPaused,
    setUserPaused,
  } = useCarousel({
    slides: FEATURED_EVENTS,
    getSrc: (item) => item.image,
    cardsPerView,
    gapRem: GAP_REM,
    autoplayDelay: 4000,
    transitionMs: TRANSITION_MS,
  });

  useEffect(() => {
    if (!userPaused) return;
    const t = setTimeout(() => setUserPaused(false), 8000);
    return () => clearTimeout(t);
  }, [userPaused, activeDot, setUserPaused]);

  const total = FEATURED_EVENTS.length;

  
  return (
    <section className="mx-auto w-full py-0 md:py-8 sm:w-[96%] md:w-[90%] md:max-w-6xl ">
      {/* Encabezado */}
      <Motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-8 flex flex-col gap-4 px-4 sm:px-0 md:flex-row md:items-start md:justify-between md:gap-10"
      >
        <Title
          text="EVENTOS DESTACADOS"
          level="h2"
          weight="bold"
          className="font-hani"
        />
        <Paragraph
          text="Revive nuestros eventos más destacados y los momentos que dejaron huella en nuestra comunidad."
          className="max-w-sm font-poppins"
          variant="secondary"
          size="base"
        />
      </Motion.div>

      {/* Carrusel */}
      <div
        {...dragHandlers}
        onMouseEnter={() => setUserPaused(true)}
        onMouseLeave={(e) => {
          dragHandlers.onMouseLeave(e);
          setUserPaused(false);
        }}
        role="region"
        aria-roledescription="carousel"
        aria-label="Eventos destacados"
        className="touch-pan-y cursor-grab select-none overflow-hidden px-4 py-3 active:cursor-grabbing sm:px-0"
      >
        <div
          className="flex"
          style={{
            gap: `${GAP_REM}rem`,
            transform: `translateX(${translateX})`,
            transition: withTransition
              ? `transform ${TRANSITION_MS}ms ease-in-out`
              : "none",
          }}
        >
          {extendedSlides.map((item, i) => {
            const isClone = i >= total;

            return (
              <article
                key={i}
                aria-hidden={isClone || undefined}
                tabIndex={isClone ? -1 : 0}
                className="group relative aspect-3/4 shrink-0 overflow-hidden bg-blue-deep shadow-lg outline-none"
                style={{ width: `calc(${cardWidthExpr})` }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  draggable={false}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Degradado inicial (se desvanece al hacer hover) */}
                <div className="pointer-events-none absolute inset-0 
                  bg-linear-to-t from-blue-deep via-blue-deep/40 to-transparent 
                  transition-opacity duration-300 group-hover:opacity-0 group-focus-within:opacity-0"
                />

                <div className="absolute inset-x-0 bottom-0">
                  <div className="relative p-5 text-white">
                    {/* Fondo sólido que aparece en hover */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-blue-deep opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
                    />

                    <div className="relative">
                      <Title
                        level="h4"
                        text={item.title}
                        variant="primary"
                        weight="bold"
                        className="font-hani"
                      />

                      {/* Descripción: la altura se ajusta al contenido */}
                      <div
                        className="grid grid-rows-[0fr] transition-[grid-template-rows] 
                        duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]"
                      >
                        <div className="min-h-0 overflow-hidden">
                          <Paragraph
                            text={item.description}
                            className="font-poppins"
                            size="small"
                            variant="ternary"
                          />
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-2 font-poppins text-xs text-white/70">
                        <span>{item.category}</span>
                        <span aria-hidden="true">|</span>
                        <FaMapMarkerAlt aria-hidden="true" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="mt-6" >
        <Dost
          dots={FEATURED_EVENTS}
          current={activeDot}
          next={null}
          goTo={(i) => goTo(i, true)}
        />
      </div>
    </section>
  );
}

export { FeatureEvents };