import { motion as Motion } from "motion/react"
import { ScrollReveal } from "@/components/layouts/scrollReveal"
import { staggerContainer } from "@/components/animations/animation"
import { Title } from "@/components/atoms/titles"
import { Paragraph } from "@/components/atoms/paragraph"
import { activities } from "@/data/studentLife/activities"
import { useCardsPerView } from "@/hooks/globals/useCardPowerView"
import { ActivitiesCarousel } from "./studentLifeActivitesCarousel"

const ACTIVITIES_VIEW = { base: 1.15, 640: 2.15, 1024: 3 }

function StudentLifeActivities() {

  const cardsPerView = useCardsPerView(ACTIVITIES_VIEW)
  const title = "APRENDE, PARTICIPAR Y VIVE NUESTRAS EXPERIENCIAS"
  return (
    <section aria-label="Actividades" className="bg-white">
      <div className="mx-auto w-[92%] md:w-[90%] max-w-6xl pt-6 sm:pt-10 md:pt-14 pb-16 sm:pb-20 md:pb-24">
        {/* Encabezado */}
          <Motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Title
              text={title} 
              level="h2" 
              weight="bold" 
              className="font-hani w-[90%] md:max-w-3xl"
            />
            
          </Motion.div>

        {/* Carrusel. key: al cambiar de breakpoint se remonta y reinicia el hook */}
        <ScrollReveal y={40} className="mt-8 md:mt-12">
          <ActivitiesCarousel
            key={cardsPerView}
            slides={activities}
            cardsPerView={cardsPerView}
          />
        </ScrollReveal>
      </div>
    </section>
  )
}

export { StudentLifeActivities }