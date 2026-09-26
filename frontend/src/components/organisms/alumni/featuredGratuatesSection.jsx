
import { FEATURED_GRADUATES } from "../../../data/alumni/featuredGraduates";
import { GraduateCard } from "../../molecules/alumni/graduateCard";
import { Dost } from "../../molecules/shared/dots";
import { useCardsPerView } from "../../../hooks/globals/useCardPowerView";
import { useCarousel } from "../../../hooks/globals/useCarrusel";

function FeaturedGraduatesSection() {

  const cardsPerView = useCardsPerView();

  const {
    extendedSlides,
    activeDot,
    cardWidthExpr,
    translateX,
    goTo,
    setUserPaused,
  } = useCarousel({
    slides: FEATURED_GRADUATES,
    cardsPerView,
    getSrc: (grad) => grad.photo,
  });

  return (
    <section className="mx-auto w-[92%] md:w-[90%] max-w-7xl py-0 md:py-10">
      <div className="text-center mb-10 md:mb-15">
        <h2 className="font-hani text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-black">
          Egresados Destacados
        </h2>
        <p className="mt-3 font-poppins text-neutral-dark/70 max-w-xl mx-auto">
          Conoce a quienes hoy destacan en el mundo laboral gracias a la
          formación que recibieron con nosotros.
        </p>
      </div>

      <div
        onMouseEnter={() => setUserPaused(true)}
        onMouseLeave={() => setUserPaused(false)}
      >
        {/* padding vertical generoso: evita que overflow-hidden corte las sombras de las cards */}
        <div className="overflow-hidden px-1 py-6 -my-6">
          <div
            className="flex"
            style={{
              gap: "1.25rem",
              transform: `translateX(${translateX})`,
              transition:
                "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {extendedSlides.map((grad, i) => (
              <div
                key={`${grad.id}-${i}`}
                className="shrink-0"
                style={{
                  width: `calc(${cardWidthExpr})`,
                }}
              >
                <GraduateCard {...grad} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Dost
          dots={FEATURED_GRADUATES}
          next={null}
          current={activeDot}
          goTo={goTo}
          className="mt-8"
        />
        </div>
      </div>
    </section>
  );
}

export { FeaturedGraduatesSection };