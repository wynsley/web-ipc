import { ScrollReveal } from "@/components/layouts/scrollReveal";
import { Title } from "@/components/atoms/titles";
import { Paragraph } from "@/components/atoms/paragraph";
import { LearningCard } from "@/components/molecules/careers/shared/learningCard";
import { ContinuousCarousel } from "@/components/molecules/shared/continuousCarousel";

function CareerLearning({
  topics,
  label = "Áreas de aprendizaje de la carrera",
  digital = false,
  layout = "carousel",
  presentation = "interactive",
  emphasizeCenter = true,
  description,
  eyebrow,
}) {
  return (
    <section
      id="aprendizaje"
      style={{ scrollMarginTop: "7rem" }}
      aria-labelledby="career-learning-title"
      className={
        digital
          ? "relative isolate overflow-hidden bg-blue-deep"
          : "bg-neutral-white pb-15 sm:pb-14"
      }
    >
      <div
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
        <ScrollReveal y={16} duration={0.4} className="relative mx-auto max-w-3xl px-6">
          {eyebrow && (
            <Paragraph
              as="span"
              className="mb-3 block text-center font-poppins text-xs tracking-[0.2em] text-orange uppercase"
            >
              {eyebrow}
            </Paragraph>
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
        </ScrollReveal>
        {layout === "grid" ? (
          <div className="relative mx-auto mt-10 grid max-w-6xl gap-6 px-6 sm:grid-cols-2 sm:px-10 lg:grid-cols-3">
            {topics.map((topic, index) => (
              <ScrollReveal key={topic.title} y={16} duration={0.4} delay={(index % 3) * 0.05}>
                <LearningCard {...topic} presentation="static" />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <ScrollReveal y={28} duration={0.55} className="relative mx-auto mt-6 w-full max-w-7xl sm:mt-8">
            <ContinuousCarousel
              items={topics}
              emphasizeCenter={emphasizeCenter}
              draggable
              label={label}
              className={digital ? "[&::before]:hidden [&::after]:hidden" : ""}
              renderItem={(topic, duplicate) => (
                <LearningCard
                  {...topic}
                  duplicate={duplicate}
                  digital={digital}
                  presentation={presentation}
                />
              )}
            />
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
export { CareerLearning };
