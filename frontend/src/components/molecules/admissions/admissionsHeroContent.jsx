import { Title } from "@/components/atoms/titles";
import { Paragraph } from "@/components/atoms/paragraph";
import { Button } from "@/components/atoms/button";

function AdmissionsHeroContent({ onRegister }) {
  return (
    <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center text-center font-poppins">
      <Title
        id="admissions-title"
        level="h1"
        variant="primary"
        align="center"
        weight="bold"
        className="leading-tight tracking-tight"
      >
        ADMISIONES 2027
      </Title>
      <Paragraph
        variant="ternary"
        align="center"
        className="mt-7 max-w-3xl leading-relaxed "
      >
        Da el primer paso hacia tu futuro profesional.
      </Paragraph>
      <Paragraph
        variant="ternary"
        align="center"
        className="mt-2 max-w-3xl leading-relaxed "
      >
        Rinde tu examen de admisión y forma parte del Instituto Privado Celendín.
      </Paragraph>
      <Paragraph
        size="medium"
        variant="primary"
        align="center"
        className="mt-5 font-hani leading-snug sm:mt-14"
      >
        Tú puedes ser el próximo. ¡Postula ahora!
      </Paragraph>
      <Button
        type="button"
        onClick={onRegister}
        className="mt-6 min-h-14 cursor-pointer rounded-lg bg-blue-dark px-7 py-3 text-xl text-neutral-white transition-colors hover:bg-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-white sm:text-2xl"
      >
        ¡Inscríbete!
      </Button>
    </div>
  );
}

export { AdmissionsHeroContent };
