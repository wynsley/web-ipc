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
        size="comfortable"
        variant="inherit"
        align="center"
        className="mt-7 max-w-3xl leading-relaxed text-orange"
      >
        Da el primer paso hacia tu futuro profesional.
      </Paragraph>
      <Paragraph
        size="comfortable"
        variant="inherit"
        align="center"
        className="mt-2 max-w-3xl leading-relaxed text-orange"
      >
        Rinde tu examen de admisión y forma parte del Instituto Privado Celendín.
      </Paragraph>
      <Paragraph
        size="xlarge"
        variant="primary"
        align="center"
        className="mt-5 font-hani leading-snug sm:mt-14"
      >
        Tú puedes ser el próximo. ¡Postula ahora!
      </Paragraph>
      <Button
        type="button"
        onClick={onRegister}
        className="mt-6 min-h-14 cursor-pointer rounded-lg bg-blue px-7 py-3 text-xl text-neutral-white transition-colors hover:bg-blue-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-white sm:text-2xl"
      >
        ¡Inscríbete!
      </Button>
    </div>
  );
}

export { AdmissionsHeroContent };
