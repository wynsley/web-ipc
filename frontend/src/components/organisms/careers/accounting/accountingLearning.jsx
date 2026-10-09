import { AccountingLearningCard } from "@/components/molecules/careers/accounting/accountingLearningCard";
import { CareerSectionHeading } from "@/components/molecules/careers/shared/careerSectionHeading";
import { learningTopics } from "@/data/careers/accounting/learning";
import { ContinuousCarousel } from "@/components/molecules/shared/continuousCarousel";
import { ScrollReveal } from "@/components/layouts/scrollReveal";

function AccountingLearning() {
  return (
    <section
      aria-labelledby="accounting-learning"
      className="bg-neutral-white px-5 py-16 sm:px-8 lg:px-12 lg:py-22"
    >
      <div className="mx-auto max-w-7xl">
        <CareerSectionHeading
          id="accounting-learning"
          eyebrow="Tus competencias"
          title="¿Qué aprenderás?"
          description="Conocimientos que conectan la información financiera con la gestión empresarial."
          descriptionClassName="mt-4 max-w-2xl"
        />
        <ScrollReveal
          y={28}
          duration={0.55}
          className="mt-8 rounded-2xl bg-blue-dark/5 px-4 sm:px-6"
        >
          <ContinuousCarousel
            items={learningTopics}
            draggable
            label="Competencias de Contabilidad"
            className="accounting-learning-carousel [&::before]:hidden [&::after]:hidden"
            renderItem={(topic, duplicate) => (
              <AccountingLearningCard {...topic} duplicate={duplicate} />
            )}
          />
        </ScrollReveal>
      </div>
    </section>
  );
}

export { AccountingLearning };
