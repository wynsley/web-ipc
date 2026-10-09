import { Link as AnchorLink } from "@/components/atoms/links";
import { CareerBreadcrumbs } from "@/components/molecules/careers/shared/careerBreadcrumbs";
import { Link } from "react-router-dom";
import { PiArrowDown, PiArrowUpRight } from "react-icons/pi";
import { Title } from "@/components/atoms/titles";
import { Paragraph } from "@/components/atoms/paragraph";

function TranslationHeroHeading({ title }) {
  return (
    <div className="relative mx-auto max-w-7xl px-6 pt-10 pb-28 sm:px-10 sm:pt-14 sm:pb-36 lg:pt-16 lg:pb-40">
      <CareerBreadcrumbs title={title} className="mb-10" />
      <Paragraph
        as="span"
        className="mb-6 flex items-center gap-3 font-poppins text-xs tracking-[0.2em] text-white uppercase"
      >
        <span aria-hidden="true" className="h-px w-10 bg-orange" /> 
        Conecta con el mundo
      </Paragraph>
      <div className="max-w-3xl [&_h1]:text-[clamp(2.75rem,6vw,5.5rem)]">
        <Title
          id="translation-title"
          level="h1"
          size="hero"
          variant="primary"
          weight="bold"
          className="font-hani leading-[0.95] tracking-tight"
        >
          {title.replace("Idiomas", "")}
          <Paragraph as="span" className="mt-2 block text-orange">
            Idiomas.
          </Paragraph>
        </Title>
      </div>
      <Paragraph
        variant="primary"
        size="comfortable"
        className="mt-7 max-w-md font-poppins leading-relaxed"
        text="Tu voz puede acercar mundos."
      />
      <Paragraph
        variant="primary"
        size="compact"
        className="mt-4 max-w-md font-poppins leading-relaxed"
        text="Aprende a mirar más allá de las palabras. Explora el lenguaje, interpreta ideas y descubre el valor de conectar personas y culturas."
      />
      <div className="mt-8 flex flex-wrap items-center gap-5">
        <Link
          to="/admissions"
          className="inline-flex min-h-12 items-center gap-5 rounded-sm bg-neutral-white px-6 py-3 font-poppins text-sm font-bold text-blue-dark transition-colors hover:bg-neutral-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Ver admisión <PiArrowUpRight aria-hidden="true" className="size-5" />
        </Link>
        <AnchorLink
          href="#aprendizaje"
          variant="plain"
          className="inline-flex min-h-12 items-center gap-3 py-3 font-poppins text-sm text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Explorar la carrera{" "}
          <PiArrowDown aria-hidden="true" className="size-5" />
        </AnchorLink>
      </div>
      <Paragraph
        as="span"
        aria-hidden="true"
        className="absolute right-10 bottom-24 hidden border-l-2 border-orange pl-5 font-hani text-2xl text-white lg:block"
      >
        Escuchar.
        <br />
        Comprender.
        <br />
        Conectar.
      </Paragraph>
    </div>
  );
}

export { TranslationHeroHeading };
