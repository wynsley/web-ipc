import { CareerWorkplaceDetails } from "@/components/molecules/careers/shared/careerWorkplaceDetails";
import { CareerImageCaption } from "@/components/molecules/careers/shared/careerImageCaption";
import { CareerSectionHeading } from "@/components/molecules/careers/shared/careerSectionHeading";
import { translationContent } from "@/data/careers/languageTranslation/content";

function LanguageTranslationWorkplaces({ workplaces, image }) {
  return (
    <section
      aria-labelledby="translation-workplaces-title"
      className="bg-neutral-white px-6 py-16 sm:px-8 sm:py-22"
    >
      <div className="mx-auto max-w-6xl">
        <CareerSectionHeading
          id="translation-workplaces-title"
          {...translationContent.workplaces}
          className="mb-10 grid gap-5 md:grid-cols-2"
          descriptionClassName="md:self-end"
        />
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <CareerImageCaption
            image={image}
            imageAlt="Escena ilustrativa de una intérprete facilitando una conversación entre profesionales"
            caption="Tu talento encuentra nuevas voces."
          />
          <div>
            {workplaces.map((workplace, index) => (
              <CareerWorkplaceDetails
                key={workplace.layout}
                title={workplace.title}
                description={workplace.description}
                number={"0" + (index + 1)}
                initiallyOpen={index === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export { LanguageTranslationWorkplaces };
