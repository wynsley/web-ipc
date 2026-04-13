import { CareerCard } from "../../molecules/home/homeCareerCards"
import { CareersCarousel } from "./careerCaroussel"
import { careers } from "../../../data/carees"
import { Title } from "../../atoms/titles"
import { Paragraph } from "../../atoms/paragraph"

function CareersSection() {
  const title = 'CARRERAS'
  const slogan = 'Elige hoy tu furuto profecinal técnico'
  return (
    <>
      <section className="w-ful py-10 px-4
      bg-[linear-gradient(to_bottom,rgba(217,217,217,0.32)_65%,#BC9F67_35%)]
    
    ">

      <div className="text-center mb-8">
        <Title
          variant="danger"
          align="center"
          level="h2"
          weight="bold"
          text={title}
          className="font-hani"
        />
        <Title
          align="center"
          level="h3"
          weight="bold"
          text={slogan}
          className="font-poppins"
        />
      </div>

      {/* Desktop */}
      <div className="hidden md:grid grid-cols-4 gap-6 max-w-5xl mx-auto mt-10">
        {careers.map((career, i) => (
          <CareerCard key={i} career={career} />
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden max-w-sm mx-auto">
        <CareersCarousel />
      </div>

      <Paragraph
        variant="danger"
        weight="semi"
        align="center"
        size="slogan"
        text={'¡El lugar donde estudias transforma tu camino!'}
        className="mt-8 italic"
      />
    </section>

    </>
  )
}

export { CareersSection }