import { staggerContainer } from "@/components/animations/animation";
import { Paragraph } from "@/components/atoms/paragraph";
import { Title } from "@/components/atoms/titles";
import { motion as Motion } from "motion/react";
import { OUR_TEAM } from "@/data/aboutUs/ourTeam";
import { useCardsPerView } from "@/hooks/globals/useCardPowerView";
import { useCarousel } from "@/hooks/globals/useCarrusel";
import { CardOurTeam } from "@/components/molecules/aboutUs/cardOurTeam";
import { Dost } from "@/components/molecules/shared/dots";

function OurTeam () {

  const cardsPerView = useCardsPerView();

  const {
    extendedSlides,
    activeDot,
    cardWidthExpr,
    translateX,
    goTo,
    setUserPaused,
    withTransition,
  } = useCarousel({
    slides: OUR_TEAM,
    cardsPerView,
    getSrc: (grad) => grad.photo,
  });

  const description = `Docentes profesionales y apasionados, comprometidos con guiar e inspirar a 
  cada estudiante hacia su máximo potencial.`
  return(
    <section
      className="mx-auto w-[92%] md:w-[90%] max-w-6xl py-0 md:py-10
      flex flex-col gap-8
      "
    >
      <Motion.div
        variants={staggerContainer}
        initial= "hidden"
        whileInView="visible"
        viewport={{once: true, amount: 0.2}}
      >
        <Title
          level="h2"
          text="Nuestro Equipo"
          weight="bold"
          className="font-hani"
        />
        <Paragraph
          size="base"
          text={description}
          className="w-full md:w-[70%]"
        />
      </Motion.div>
      <div
        onMouseEnter={() => setUserPaused(true)}
        onMouseLeave={() => setUserPaused(false)}
      >
        <div className="overflow-hidden px-1 py-6 -my-6">
          <div
            className="flex"
            style={{
              gap: "1.25rem",
              transform: `translateX(${translateX})`,
              transition: withTransition
                ? "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)"
                : "none",
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
                <CardOurTeam {...grad} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Dost
            dots={OUR_TEAM}
            next={null}
            current={activeDot}
            goTo={goTo}
            className="mt-8"
          />
        </div>
      </div>
    </section>
  )
}

export {OurTeam}