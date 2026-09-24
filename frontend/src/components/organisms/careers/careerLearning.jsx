import { ScrollReveal } from "../../layouts/scrollReveal";
import { Title } from "../../atoms/titles";
import { LearningCard } from "../../molecules/careers/learningCard";
import { ContinuousCarousel } from "../../molecules/shared/continuousCarousel";

function CareerLearning({ topics }) {
  return (
    <section
      aria-labelledby="career-learning-title"
      className="bg-neutral-white pb-15 sm:pb-14"
    >
      <ScrollReveal>
        <Title
          id="career-learning-title"
          level="h2"
          weight="bold"
          align="center"
          variant="institutional"
          className="px-6 font-hani"
          text="¿Qué aprenderás?"
        />
      </ScrollReveal>
      <ScrollReveal
        delay={0.1}
        y={40}
        className="mx-auto mt-2 max-w-6xl sm:mt-4"
      >
        <ContinuousCarousel
          items={topics}
          emphasizeCenter
          draggable
          label="Áreas de aprendizaje de Administración de Empresas"
          renderItem={(topic, duplicate) => (
            <LearningCard {...topic} duplicate={duplicate} />
          )}
        />
      </ScrollReveal>
    </section>
  );
}

export { CareerLearning };
