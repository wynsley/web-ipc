import { CareerCard } from "../../molecules/home/homeCareerCards"
import { CareersCarousel } from "./careersCarousel"
import { careers } from "../../../data/careers"
import { Title } from "../../atoms/titles"
import { Paragraph } from "../../atoms/paragraph"
import { Button } from "../../atoms/button"
import { ScrollReveal } from "../../layouts/scrollReveal"

function CareersSection() {
  const title = 'CARRERAS'
  const slogan = 'Elige hoy tu futuro profesional técnico'

  return (
    <section className="mx-auto bg-[#F0F2F3] rounded-xl w-[96%] md:max-w-8xl">
      <div className="w-[90%] md:w-[90%] md:max-w-7xl mx-auto py-10">

        {/* HEADER: título a la izquierda, texto descriptivo a la derecha */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <Title
              level="h2"
              weight="bold"
              text={title}
              className="font-hani"
            />
            <Paragraph
              size="large"
              text={slogan}
              className="font-euro"
            />
          </div>

          <div className="md:text-right md:max-w-xs">
            <Paragraph
              size="small"
              variant="secondary"
              text="Formación técnica de calidad, pensada para insertarte rápido al mundo laboral."
            />
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:grid grid-cols-4 gap-6 mt-10">
          {careers.map((career, i) => (
            <ScrollReveal key={i} delay={0.2 * i} y={60}>
              <CareerCard career={career} />
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile */}
        <div className="lg:hidden min-w-md sm:min-w-lg md:max-w-4xl mx-auto mt-10">
          <CareersCarousel />
        </div>

        {/* FOOTER: botón de acción a la izquierda */}
        <div className="flex items-center justify-between mt-10">
          <Button
            text="Admisión"
            variant="primary"
          />

          <Paragraph
            variant="danger"
            weight="semi"
            size="slogan"
            text="¡El lugar donde estudias transforma tu camino!"
            className="hidden sm:block italic"
          />
        </div>
      </div>
    </section>
  )
}

export { CareersSection }