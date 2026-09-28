import { IoCallOutline } from "react-icons/io5"
import { Button } from "../../atoms/button"
import { Paragraph } from "../../atoms/paragraph"
import { Title } from "../../atoms/titles"
import { motion as Motion } from "motion/react"
import { ctaReveal, paragraphReveal, staggerContainer } from "../../animations/animation"

function HeroContent () {
  return(
    <div 
      className="relative z-30 flex h-full w-full items-center px-6 sm:px-10 lg:px-[6%]">
        <Motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="w-full max-w-xl">

          <Motion.span
            variants={paragraphReveal}
            className="
              inline-block rounded-full bg-white/10 backdrop-blur-sm
              border border-white/20
              px-4 py-1.5 mb-5
              font-hani text-xs sm:text-sm font-bold uppercase tracking-wide
              text-white
            "
          >
            Instituto Privado Celendín
          </Motion.span>

          <Title
            level="h2"
            weight="bold"
            variant="primary"
            text="Egresados que dejan Huella"
            className="font-poppins"
          />

          <Paragraph
            size="compact"
            className="mt-5 max-w-md font-poppins text-white/80 leading-relaxed"
          >
            Formamos profesionales preparados para destacar en el mundo
            laboral, con una formación sólida y orientada al éxito. Nuestros
            egresados son el reflejo del compromiso y la calidad educativa
            que nos caracteriza.
          </Paragraph>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              text="Conoce nuestras carreras"
              variant="danger"
              className="font-hani"
            />

            <Motion.a
              variants={ctaReveal}
              href="tel:+51987654321"
              className="
                flex items-center gap-2
                font-hani font-bold text-white
                border-b-2 border-transparent
                hover:border-orange
                transition-colors duration-200
              "
            >
              <span className="flex items-center justify-center size-9 rounded-full bg-white/10 border border-white/20">
                <IoCallOutline className="size-4" />
              </span>
              (+51) 987 654 321
            </Motion.a>
          </div>
        </Motion.div>
      </div>
  )
}

export {HeroContent}