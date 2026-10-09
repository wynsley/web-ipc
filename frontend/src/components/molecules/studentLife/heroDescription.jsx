import { FiArrowRight } from "react-icons/fi"
import { motion as Motion } from "motion/react"
import { Paragraph } from "@/components/atoms/paragraph"
import { staggerContainer } from "@/components/animations/animation"
import { Title } from "@/components/atoms/titles"
import { Button } from "@/components/atoms/button"

function HeroDescription({ anchorRef, isMenuOpen, onMenuOpen, onMenuLeave }) {
  const description = `En el Instituto Privado Celendín, cada actividad y espacio de
        convivencia desarrolla conocimientos, habilidades y valores que te
        acompañan en tu formación profesional. Descubre la comunidad que
        forma parte de ti.`

  return (
    <Motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative z-10 flex flex-col items-start mb-8"
    >
      <Paragraph
        text="Vida Estudiantil"
        className="uppercase tracking-[0.3em] text-sky"
        weight="bold"
      />

      <Title variant="primary" weight="bold" className="font-poppins mt-4">
        Una experiencia que va{" "}
        <span className="box-decoration-clone bg-gradient-to-r from-sky to-blue bg-clip-text text-transparent">
          más allá del aula
        </span>
      </Title>

      <Paragraph
        text={description}
        className="leading-relaxed font-poppins mt-5"
        variant="primary"
      />

      <div
        ref={anchorRef}
        className="mt-7"
        onMouseEnter={onMenuOpen}
        onMouseLeave={onMenuLeave}
      >
        <Button
          onClick={onMenuOpen}
          aria-haspopup="true"
          aria-expanded={isMenuOpen}
          className="group inline-flex items-center gap-2 rounded-full bg-blue-deep px-7 py-3
          font-hani text-sm font-semibold text-white shadow-[2px_2px_10px] shadow-white/40
          transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange sm:text-base"
        >
          Conoce nuestras carreras
          <FiArrowRight
            aria-hidden="true"
            className={`transition-transform group-hover:translate-x-1 ${
              isMenuOpen ? "rotate-90" : ""
            }`}
          />
        </Button>
      </div>
    </Motion.div>
  )
}

export { HeroDescription }