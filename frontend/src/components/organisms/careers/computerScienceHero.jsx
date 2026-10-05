import { useRef } from "react";
import { ComputerScienceHeroBackground } from "../../molecules/careers/computerScienceHeroBackground";
import { BannerBgCurve } from "../../molecules/shared/curvePath";
import { ComputerScienceHeroHeading } from "../../molecules/careers/computerScienceHeroHeading";
import { ComputerScienceHeroVisual } from "../../molecules/careers/computerScienceHeroVisual";
import { ComputerScienceHeroIntro } from "../../molecules/careers/computerScienceHeroIntro";

function ComputerScienceHero({ title, content }) {
  const titleId = "computer-science-title";
  const ref = useRef(null);
  return (
    <section
      ref={ref}
      aria-labelledby={titleId}
      className="w-full bg-neutral-white pb-12 font-poppins sm:pb-16"
    >
      <div className="relative isolate bg-blue-deep md:min-h-108 lg:min-h-116">
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
