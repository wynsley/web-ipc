import { PiArrowRight } from "react-icons/pi";
import { Paragraph } from "@/components/atoms/paragraph";

function TranslationHeroComparison() {
  return (
    <div className="relative mx-auto -mt-14 grid w-[calc(100%-3rem)] max-w-6xl border-t-4 border-orange bg-neutral-white shadow-soft md:grid-cols-[1fr_auto_1fr]">
      <div className="p-6 sm:p-8">
        <Paragraph
          as="span"
          className="font-poppins text-xs tracking-[0.16em] text-blue uppercase"
        >
          El mensaje original · Inglés
        </Paragraph>
        <Paragraph
          lang="en"
          size="xlarge"
          className="mt-3 font-hani font-bold"
          text="“Break a leg!”"
        />
        <Paragraph
          as="span"
          className="mt-2 block font-poppins text-xs text-neutral-dark"
        >
          Traducir literalmente no siempre comunica.
        </Paragraph>
      </div>
      <PiArrowRight
        aria-hidden="true"
        className="mx-6 size-7 rotate-90 self-center text-orange md:mx-0 md:rotate-0"
      />
      <div className="p-6 sm:p-8">
        <Paragraph
          as="span"
          className="font-poppins text-xs tracking-[0.16em] text-blue uppercase"
        >
          La intención · Español
        </Paragraph>
        <Paragraph
          size="xlarge"
          className="mt-3 font-hani font-bold"
          text="“¡Mucho éxito!”"
        />
        <Paragraph
          as="span"
          className="mt-2 block font-poppins text-xs text-neutral-dark"
        >
          Un ejemplo de traducción que conserva el sentido.
        </Paragraph>
      </div>
    </div>
  );
}

export { TranslationHeroComparison };
