import { PiTranslate } from "react-icons/pi";
import { Title } from "@/components/atoms/titles";
import { Paragraph } from "@/components/atoms/paragraph";
import { ScrollReveal } from "@/components/layouts/scrollReveal";

function TranslationHeroIntro() {
  return (
    <ScrollReveal className="mx-auto mt-14 grid max-w-6xl gap-6 px-6 sm:px-8 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
      <div>
        <PiTranslate aria-hidden="true" className="mb-4 size-9 text-blue" />
        <Title
          level="h2"
          variant="institutional"
          weight="bold"
          className="font-hani leading-tight"
          text="Transforma palabras. Abre conversaciones."
        />
      </div>
      <div className="md:pt-12">
        <Paragraph
          size="compact"
          className="font-poppins leading-relaxed"
          text="La Traducción de Idiomas une el dominio del lenguaje con la sensibilidad para entender a otros. Cada texto, conversación y cultura plantea una nueva manera de conectar."
        />
        <Paragraph
          size="compact"
          className="mt-4 font-poppins leading-relaxed"
          text="Si te interesan los idiomas, disfrutas descubrir otras perspectivas y cuidas la forma de comunicar, aquí puedes empezar a explorar tu vocación."
        />
      </div>
    </ScrollReveal>
  );
}

export { TranslationHeroIntro };
