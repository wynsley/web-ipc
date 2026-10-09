import { Button } from "@/components/atoms/button";
import { Title } from "@/components/atoms/titles";
import { Paragraph } from "@/components/atoms/paragraph";
import { ScrollReveal } from "@/components/layouts/scrollReveal";

function AccountingInformationCta({ onRequest }) {
  return (
    <ScrollReveal className="mt-12 flex flex-col items-start gap-6 border-t border-neutral-white/20 pt-8 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <Title
          level="h3"
          variant="secondary"
          weight="bold"
          className="font-hani"
          text="Da el siguiente paso en Contabilidad"
        />
        <Paragraph
          size="compact"
          variant="primary"
          className="mt-3 font-poppins leading-relaxed"
        >
          Conoce más sobre la carrera y resuelve tus dudas con nosotros.
        </Paragraph>
      </div>
      <Button
        type="button"
        onClick={onRequest}
        className="w-full shrink-0 cursor-pointer rounded-sm bg-orange px-6 py-3 font-hani text-lg font-bold text-neutral-black transition-colors hover:bg-neutral-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-white sm:w-auto"
      >
        Solicitar información
      </Button>
    </ScrollReveal>
  );
}

export { AccountingInformationCta };
