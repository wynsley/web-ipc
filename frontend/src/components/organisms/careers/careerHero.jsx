import { HeroBackground } from "../../atoms/heroBackground";
import { Title } from "../../atoms/titles";
import { Paragraph } from "../../atoms/paragraph";
import { CareerHighlights } from "../../molecules/careers/careerHighlights";

function CareerHero({ title, image, description, highlights }) {
  return (
    <section aria-labelledby="career-title" className="bg-neutral-white pb-12 sm:pb-16">
      <div className="relative isolate min-h-88 md:min-h-96 lg:min-h-104">
        <HeroBackground src={image} />
        <div className="relative mx-auto max-w-7xl px-6 pt-8 pb-20 sm:px-10 sm:pt-12 lg:px-16 lg:pt-16">
          <Title
            id="career-title"
            level="h1"
            size="hero"
            variant="primary"
            weight="bold"
            className="font-poppins leading-tight"
            text={title}
          />
          <Paragraph
            size="base"
            variant="primary"
            className="mt-8 max-w-116 font-poppins leading-relaxed"
            text={description}
          />
        </div>
      </div>
      <CareerHighlights highlights={highlights} />
    </section>
  );
}

export { CareerHero };
