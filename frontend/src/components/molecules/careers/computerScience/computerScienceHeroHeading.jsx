import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { CareerBreadcrumbs } from "@/components/molecules/careers/shared/careerBreadcrumbs";
import { ScrollMotion } from "@/components/layouts/scrollMotion";
import { Title } from "@/components/atoms/titles";
import { Paragraph } from "@/components/atoms/paragraph";

function ComputerScienceHeroHeading({ titleId, title, eyebrow, tagline, action }) {
  return (
    <ScrollMotion
      y={16}
      duration={0.4}
      className="relative z-10"
    >
      <CareerBreadcrumbs title={title} className="mb-5" />
      <Paragraph
        as="span"
        className="mb-4 inline-flex items-center gap-3 text-xs tracking-[0.18em] text-neutral-white uppercase"
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
      <Link
        to={action.to}
        className="mt-8 inline-flex min-h-12 items-center gap-4 rounded-sm border border-neutral-white/70 bg-neutral-white px-6 py-3 font-poppins text-sm font-bold text-blue-dark transition-colors duration-200 hover:border-orange hover:bg-orange hover:text-blue-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
      >
        {action.label}
        <FiArrowUpRight aria-hidden="true" className="size-5" />
      </Link>
    </ScrollMotion>
  );
}

export { ComputerScienceHeroHeading };
