import { useRef } from "react";
import { ComputerScienceHeroBackground } from "@/components/molecules/careers/computerScience/computerScienceHeroBackground";
import { BannerBgCurve } from "@/components/molecules/shared/curvePath";
import { ComputerScienceHeroHeading } from "@/components/molecules/careers/computerScience/computerScienceHeroHeading";
import { ComputerScienceHeroVisual } from "@/components/molecules/careers/computerScience/computerScienceHeroVisual";
import { ComputerScienceHeroIntro } from "@/components/molecules/careers/computerScience/computerScienceHeroIntro";

function ComputerScienceHero({ title, content }) {
  const titleId = "computer-science-title";
  const ref = useRef(null);
  return (
    <section
      ref={ref}
      aria-labelledby={titleId}
      className="w-full bg-neutral-white pb-12 font-poppins sm:pb-16"
    >
      <div className="relative isolate bg-blue-dark md:min-h-108 lg:min-h-116">
        <ComputerScienceHeroBackground
          image={content.background}
          target={ref}
        />
        <ComputerScienceHeroHeading
          titleId={titleId}
          title={title}
          eyebrow={content.eyebrow}
          tagline={content.tagline}
        />
        <ComputerScienceHeroVisual
          image={content.image}
          cards={content.cards}
        />
        <BannerBgCurve
          design={6}
          color="var(--color-neutral-white)"
          accentColor="var(--color-orange)"
          height="h-16 sm:h-22"
          className="-bottom-px"
        />
      </div>
      <ComputerScienceHeroIntro
        title={title}
        description={content.description}
        action={content.action}
      />
    </section>
  );
}

export { ComputerScienceHero };
