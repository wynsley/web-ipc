import { Paragraph } from "@/components/atoms/paragraph";
import { Title } from "@/components/atoms/titles";
import { TranslationJourneyStep } from "@/components/molecules/careers/languageTranslation/translationJourneyStep";
import { ScrollReveal } from "@/components/layouts/scrollReveal";

function LanguageTranslationJourney({ steps }) {
  return (
    <section
      aria-labelledby="translation-journey-title"
      className="relative isolate overflow-hidden bg-blue-dark px-6 py-16 sm:px-8 sm:py-22"
    >
      <Paragraph
        as="span"
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 select-none font-hani text-[clamp(5rem,17vw,16rem)] font-bold leading-none text-white/5"
      >
        SIGNIFICADO
      </Paragraph>
      <div className="relative mx-auto max-w-6xl">
        <ScrollReveal className="max-w-2xl">
          <Paragraph
            as="span"
            className="mb-4 block font-poppins text-xs tracking-[0.2em] text-white uppercase"
          >
            El proceso detrás de cada palabra
          </Paragraph>
          <Title
            id="translation-journey-title"
            level="h2"
            variant="primary"
            weight="bold"
            className="font-hani leading-tight"
            text="Escucha una voz. Comprende un mundo."
          />
        </ScrollReveal>
        <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-10">
          {steps.map((step, index) => (
            <TranslationJourneyStep
              key={step.number}
              step={step}
              index={index}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
export { LanguageTranslationJourney };
