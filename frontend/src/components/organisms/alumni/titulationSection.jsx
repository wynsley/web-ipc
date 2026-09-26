import { Title } from "../../atoms/titles";
import { Paragraph } from "../../atoms/paragraph";
import { FeatureCard } from "../../molecules/alumni/featureCard";
import { TITULATION_STEPS } from "../../../data/alumni/titulationSteps";

function TitulationSection() {
  return (
    <section
      className="
        relative
        mx-auto w-[92%] md:w-[90%] max-w-7xl
        pt-6 sm:pt-10 md:pt-14
        pb-16 sm:pb-20 md:pb-24
      "
    >
      <div
        className="
          absolute top-0 right-0
          -translate-y-24 sm:-translate-y-32 md:-translate-y-35
          w-40 sm:w-52 md:w-60
          pointer-events-none select-none
        "
      >
        <div className="relative flex justify-center">
          <div
            className="
              absolute bottom-2 left-1/2 -translate-x-1/2
              h-6 w-[70%] sm:h-8 sm:w-[75%]
              rounded-full bg-blue-deep/30
              blur-md
            "
            aria-hidden="true"
          />

          <img
            src="/CUP.webp"
            alt="Birrete institucional"
            className="relative w-full drop-shadow-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end mt-20">
        <div>
          <span
            className="
              inline-flex items-center gap-2
              rounded-full bg-blue-deep/10
              px-4 py-1.5 mb-2
              font-hani text-xs sm:text-sm font-bold uppercase tracking-wide
              text-blue-deep
            "
          >
            ● Nuestro proceso
          </span>

          <Title
            level="h2"
            weight="bold"
            text="PROCESO DE TITULACIÓN"
            className="font-hani text-neutral-black leading-tight text-3xl sm:text-4xl md:text-5xl"
          />
        </div>

        <Paragraph
          size="compact"
          className="font-poppins text-neutral-dark/70 leading-relaxed max-w-lg lg:justify-self-end lg:text-right"
        >
          Obtén tu título profesional siguiendo nuestro proceso estructurado
          y con el acompañamiento de nuestro equipo académico especializado.
          Los requisitos, guías del proceso y cronogramas están aquí.
        </Paragraph>
      </div>

      {/* Cards */}
      <div
        className="
          mt-14 sm:mt-16 lg:mt-20
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          gap-6 lg:gap-8
        "
      >
        {TITULATION_STEPS.map((step) => (
          <FeatureCard key={step.title} {...step} />
        ))}
      </div>
    </section>
  );
}

export { TitulationSection };