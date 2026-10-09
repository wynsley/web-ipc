import { BannerBgCurve } from "@/components/molecules/shared/curvePath";
import { ComputerScienceHeroBackground } from "@/components/molecules/careers/computerScience/computerScienceHeroBackground";
import { ComputerScienceHeroHeading } from "@/components/molecules/careers/computerScience/computerScienceHeroHeading";
import { ComputerScienceHeroVisual } from "@/components/molecules/careers/computerScience/computerScienceHeroVisual";

function ComputerScienceHero({ title, content }) {
  return (
    <section
      aria-labelledby="computer-science-title"
      className="relative isolate overflow-hidden bg-blue-deep font-poppins"
    >
      <ComputerScienceHeroBackground image={content.background} />
      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-6 pt-6 pb-18 sm:px-10 sm:pt-8 sm:pb-24 lg:grid-cols-2 lg:gap-12">
        <ComputerScienceHeroHeading
          titleId="computer-science-title"
          title={title}
          eyebrow={content.eyebrow}
          tagline={content.tagline}
          action={content.action}
        />
        <ComputerScienceHeroVisual
          image={content.image}
          cards={content.cards}
        />
      </div>
      <BannerBgCurve
        design={7}
        color="var(--color-blue-dark)"
        accentColor="var(--color-orange)"
        secondaryAccentColor="var(--color-neutral-white)"
        height="h-20 sm:h-28"
        className="-bottom-px z-10"
      />
    </section>
  );
}

export { ComputerScienceHero };
