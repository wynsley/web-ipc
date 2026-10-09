import { TranslationHeroBackground } from "@/components/molecules/careers/languageTranslation/translationHeroBackground";
import { TranslationHeroHeading } from "@/components/molecules/careers/languageTranslation/translationHeroHeading";
import { TranslationHeroComparison } from "@/components/molecules/careers/languageTranslation/translationHeroComparison";
import { TranslationHeroIntro } from "@/components/molecules/careers/languageTranslation/translationHeroIntro";

function LanguageTranslationHero({ title, image }) {
  return (
    <section
      aria-labelledby="translation-title"
      className="bg-neutral-white pb-16 sm:pb-22"
    >
      <div className="relative isolate overflow-hidden bg-blue-dark">
        <TranslationHeroBackground image={image} />
        <TranslationHeroHeading title={title} />
      </div>
      <TranslationHeroComparison />
      <TranslationHeroIntro />
    </section>
  );
}

export { LanguageTranslationHero };
