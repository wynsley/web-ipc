import { CareerBreadcrumbs } from "@/components/molecules/careers/shared/careerBreadcrumbs";
import { ScrollMotion } from "@/components/layouts/scrollMotion";
import { Title } from "@/components/atoms/titles";
import { Paragraph } from "@/components/atoms/paragraph";

function ComputerScienceHeroHeading({ titleId, title, eyebrow, tagline }) {
  return (
    <ScrollMotion
      y={90}
      className="relative z-10 px-6 pt-10 sm:px-10 md:w-[55%] md:pt-18 md:pb-28 lg:px-14 lg:pt-22"
    >
      <CareerBreadcrumbs title={title} className="mb-8" />
      <Paragraph
        as="span"
        className="mb-6 inline-flex items-center gap-3 text-xs tracking-[0.18em] text-neutral-white uppercase"
      >
        <span className="h-0.5 w-8 bg-orange" aria-hidden="true" />
        {eyebrow}
      </Paragraph>
      <Title
        id={titleId}
        level="h1"
        size="hero"
        variant="primary"
        weight="bold"
        text={title}
        className="max-w-lg leading-[1.12] tracking-tight"
      />
      <Paragraph
        size="base"
        variant="primary"
        className="mt-6 max-w-sm leading-relaxed"
      >
        {tagline.text}{" "}
        <Paragraph as="span" className="font-bold">
          {tagline.emphasis}
        </Paragraph>
      </Paragraph>
    </ScrollMotion>
  );
}

export { ComputerScienceHeroHeading };
