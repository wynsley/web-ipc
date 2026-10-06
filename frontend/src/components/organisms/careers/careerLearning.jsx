import { useRef } from "react";
import { motion as Motion } from "motion/react";
import { useSectionExit } from "../../animations/useSectionExit";
import { ScrollReveal } from "../../layouts/scrollReveal";
import { Title } from "../../atoms/titles";
import { Paragraph } from "../../atoms/paragraph";
import { LearningCard } from "../../molecules/careers/learningCard";
import { ContinuousCarousel } from "../../molecules/shared/continuousCarousel";

function CareerLearning({
  topics,
  label = "Áreas de aprendizaje de Administración de Empresas",
  digital = false,
  cinematic = false,
  description,
  eyebrow,
}) {
  const ref = useRef(null);
  const {
    active: transition,
    style,
    focusHandlers,
  } = useSectionExit(ref, cinematic);
  const Heading = cinematic ? "div" : ScrollReveal;
  const CarouselFrame = cinematic ? "div" : ScrollReveal;

  return (
    <section
      ref={ref}
      id="aprendizaje"
      data-learning-transition={transition}
      aria-labelledby="career-learning-title"
      className={
        digital
          ? "relative isolate overflow-hidden bg-blue-deep"
          : "bg-neutral-white pb-15 sm:pb-14"
      }
    >
      <Motion.div
        data-learning-surface
        {...focusHandlers}
        style={style}
        className={
          digital ? "relative origin-bottom bg-blue-dark py-16 sm:py-24" : ""
        }
      >
        {digital && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-1/3 h-64 rounded-full bg-orange/20 blur-3xl"
          />
        )}
        <Heading className="relative mx-auto max-w-3xl px-6">
          {digital && eyebrow && (
            <span className="mb-3 block text-center font-poppins text-xs tracking-[0.2em] text-orange uppercase">
              {eyebrow}
            </span>
          )}
          <Title
            id="career-learning-title"
            level="h2"
            weight="bold"
            align="center"
            variant={digital ? "primary" : "institutional"}
            className="font-hani"
            text="¿Qué aprenderás?"
          />
          {description && (
            <Paragraph
              size="compact"
              align="center"
              variant={digital ? "primary" : "default"}
              className="mt-5 font-poppins leading-relaxed"
              text={description}
            />
          )}
        </Heading>
        <CarouselFrame className="relative mx-auto mt-2 w-full max-w-7xl sm:mt-4">
          <ContinuousCarousel
            items={topics}
            emphasizeCenter
            draggable
            label={label}
            className={digital ? "[&::before]:hidden [&::after]:hidden" : ""}
            renderItem={(topic, duplicate) => (
              <LearningCard
                {...topic}
                duplicate={duplicate}
                digital={digital}
              />
            )}
          />
        </CarouselFrame>
      </Motion.div>
    </section>
  );
}
export { CareerLearning };
