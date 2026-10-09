import { AccountingLearningCard } from "@/components/molecules/careers/accounting/accountingLearningCard";
import { CareerSectionHeading } from "@/components/molecules/careers/shared/careerSectionHeading";
import { learningTopics } from "@/data/careers/accounting/learning";

function AccountingLearning() {
  return (
    <section aria-labelledby="accounting-learning" className="bg-neutral-white px-5 py-16 sm:px-8 lg:px-12 lg:py-22">
      <div className="mx-auto max-w-7xl">
        <CareerSectionHeading id="accounting-learning" eyebrow="Tus competencias" title="¿Qué aprenderás?" description="Conocimientos que conectan la información financiera con la gestión empresarial." descriptionClassName="mt-4 max-w-2xl" />
        <ol className="mt-9 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {learningTopics.map((description, index) => (
            <AccountingLearningCard key={description} description={description} number={index + 1} />
          ))}
        </ol>
      </div>
    </section>
  );
}

export { AccountingLearning };
