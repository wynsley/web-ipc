import { CareerTopicTabs } from "@/components/molecules/careers/shared/careerTopicTabs";
import { TranslationLearningPanel } from "@/components/molecules/careers/languageTranslation/translationLearningPanel";
import { CareerSectionHeading } from "@/components/molecules/careers/shared/careerSectionHeading";
import { translationContent } from "@/data/careers/languageTranslation/content";
import { useState } from "react";
import { Paragraph } from "@/components/atoms/paragraph";

function LanguageTranslationLearning({ topics }) {
  const [selected, setSelected] = useState(0);
  return (
    <section
      id="aprendizaje"
      aria-labelledby="translation-learning-title"
      className="bg-neutral-light px-6 py-16 sm:px-8 sm:py-22"
    >
      <div className="mx-auto max-w-6xl">
        <CareerSectionHeading
          id="translation-learning-title"
          {...translationContent.learning}
          className="grid gap-5 md:grid-cols-2 md:items-end md:gap-16"
        />
        <CareerTopicTabs
          items={topics}
          selected={selected}
          onSelect={setSelected}
          idPrefix="translation"
          label="Áreas de la traducción"
        />
        {topics.map((topic, index) => (
          <TranslationLearningPanel
            key={topic.title}
            topic={topic}
            selected={selected === index}
            panelId={"translation-panel-" + index}
            tabId={"translation-tab-" + index}
          />
        ))}
        <Paragraph
          size="compact"
          className="mt-5 font-poppins"
          text="Ejemplos ilustrativos de la disciplina. Consulta la malla oficial para conocer los idiomas y las asignaturas de la carrera."
        />
      </div>
    </section>
  );
}
export { LanguageTranslationLearning };
