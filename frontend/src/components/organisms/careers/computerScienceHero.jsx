import { Image } from "../../atoms/image";
import { BannerBgCurve } from "../../molecules/shared/curbePath";
import { ComputerScienceHeroHeading } from "../../molecules/careers/computerScienceHeroHeading";
import { ComputerScienceHeroVisual } from "../../molecules/careers/computerScienceHeroVisual";
import { ComputerScienceHeroIntro } from "../../molecules/careers/computerScienceHeroIntro";

function ComputerScienceHero({ title, content }) {
  const titleId = "computer-science-title";

  return (
    <section
      aria-labelledby={titleId}
      className="w-full bg-neutral-white pb-12 font-poppins sm:pb-16"
    >
      <div className="relative isolate bg-blue-dark md:min-h-108 lg:min-h-116">
        <Image
          src={content.background}
          alt=""
          fill
          loading="eager"
          overlayClassName="bg-linear-to-r from-blue-dark/75 via-blue-dark/40 to-blue-dark/20"
        />
        <ComputerScienceHeroHeading
          titleId={titleId}
          title={title}
          eyebrow={content.eyebrow}
          tagline={content.tagline}
        />
        <ComputerScienceHeroVisual image={content.image} cards={content.cards} />
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
