import { Title } from "@/components/atoms/titles";
import { Button } from "@/components/atoms/button";
import { ScrollReveal } from "@/components/layouts/scrollReveal";

function AccountingHeroIntro({ onRequest }) {
  return (
    <ScrollReveal className="relative z-10 mx-auto flex h-full w-[92%] max-w-7xl flex-col items-start justify-start gap-6 pt-10 sm:justify-center sm:pt-0 md:w-[90%]">
      <Title
        id="accounting-title"
        level="h1"
        size="hero"
        variant="primary"
        weight="bold"
        className="uppercase sm:max-w-[58%] sm:text-[clamp(1.875rem,3.5vw,3.25rem)]"
      >
        Contabilidad
      </Title>
      <Button
        type="button"
        onClick={onRequest}
        className=" cursor-pointer rounded-sm bg-orange px-6 py-3 font-hani text-base font-bold text-neutral-black transition-colors hover:bg-neutral-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-white"
      >
        Solicitar información
      </Button>
    </ScrollReveal>
  );
}

export { AccountingHeroIntro };
