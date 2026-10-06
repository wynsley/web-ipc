import { MyTemplate } from "@/components/templates/myTemplate";
import { LanguageTranslationHero } from "@/components/organisms/careers/languageTranslation/languageTranslationHero";
import { LanguageTranslationJourney } from "@/components/organisms/careers/languageTranslation/languageTranslationJourney";
import { LanguageTranslationLearning } from "@/components/organisms/careers/languageTranslation/languageTranslationLearning";
import { LanguageTranslationWorkplaces } from "@/components/organisms/careers/languageTranslation/languageTranslationWorkplaces";
import { CareerBenefits } from "@/components/organisms/careers/shared/careerBenefits";
import { CareerDocuments } from "@/components/organisms/careers/shared/careerDocuments";
import { careers } from "@/data/careers";
import { translationImages } from "@/data/careers/languageTranslation/images";
import { translationLearning } from "@/data/careers/languageTranslation/learning";
import { translationWorkplaces } from "@/data/careers/languageTranslation/workplaces";
import { translationBenefits } from "@/data/careers/languageTranslation/benefits";
import { translationSteps } from "@/data/careers/languageTranslation/journey";
import { translationDocuments } from "@/data/careers/languageTranslation/documents";

const career = careers.find(
  ({ href }) => href === "/career/language-translation",
);

function LanguageTranslationPage() {
  return (
    <MyTemplate className="[&_article]:rounded-sm [&_li]:rounded-sm [&_button]:rounded-sm [&_.rounded-xl]:rounded-sm [&_section[id]]:scroll-mt-28">
      <div className="pt-4 sm:pt-6 md:pt-0">
        <LanguageTranslationHero
          title={career.title}
          image={translationImages.hero}
        />
      </div>
      <LanguageTranslationLearning topics={translationLearning} />
      <LanguageTranslationJourney steps={translationSteps} />
      <LanguageTranslationWorkplaces
        workplaces={translationWorkplaces}
        image={translationImages.workplaces}
      />
      <CareerBenefits
        benefits={translationBenefits}
        image={translationImages.benefits}
        imageAlt="Escena ilustrativa de dos personas descubriendo literatura y compartiendo perspectivas en una librería"
        eyebrow="03 / Lo que aporta esta disciplina"
        title="Una forma diferente de ver el mundo"
        description="Habilidades que conectan el lenguaje con las personas, dentro y fuera del entorno profesional."
      />
      <CareerDocuments
        documents={translationDocuments}
        title="Tu formación, con una ruta clara"
      />
    </MyTemplate>
  );
}
export { LanguageTranslationPage };
