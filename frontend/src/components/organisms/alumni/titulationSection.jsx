import { Title } from "../../atoms/titles";
import { Paragraph } from "../../atoms/paragraph";
import { FeatureCard } from "../../molecules/alumni/featureCard";
import { TITULATION_STEPS } from "../../../data/alumni/titulationSteps";
import { AlumniCap } from "../../molecules/alumni/aluminCap";
import { ScrollReveal } from "../../layouts/scrollReveal";
import { motion as Motion } from "motion/react";
import { staggerContainer } from "../../animations/animation";

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
      
    <AlumniCap/>

      <Motion.div
        variants={staggerContainer}
        initial = "hidden"
        whileInView='visible'
        viewport={{once: true , amount: 0.2}}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end mt-20">
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
      </Motion.div>

      {/* Cards */}
      <div
        className="
          mt-14 sm:mt-16 lg:mt-20
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          gap-6 lg:gap-8
        "
      >
        {TITULATION_STEPS.map((step, i) => (
          <ScrollReveal key={i} delay={0.2 * i} y={60}>
            <FeatureCard key={step.title} {...step} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

export { TitulationSection };