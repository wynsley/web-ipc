import { ScrollReveal } from "@/components/layouts/scrollReveal";
import { Title } from "@/components/atoms/titles";
import { AcademicDocumentCard } from "@/components/molecules/careers/shared/academicDocumentCard";

function CareerDocuments({ documents, title = "Conoce tu formación" }) {
  return (
    <section className="bg-neutral-light px-4 py-12 sm:px-8 sm:py-16 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <Title
            level="h2"
            variant="institutional"
            weight="bold"
            text={title}
            className="mb-6 font-hani sm:mb-8"
          />
        </ScrollReveal>
        <div className="grid gap-5 md:grid-cols-2">
          {documents.map((document, index) => (
            <AcademicDocumentCard
              delay={index * 0.12}
              key={document.id}
              document={document}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export { CareerDocuments };
