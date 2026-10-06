import { motion as Motion } from "motion/react";
import { useJourneyStepMotion } from "@/components/animations/useJourneyStepMotion";
import { ComputingJourneyHeading } from "@/components/molecules/careers/computerScience/computingJourneyHeading";
import { Title } from "@/components/atoms/titles";
import { Paragraph } from "@/components/atoms/paragraph";
import { Image } from "@/components/atoms/image";

function ComputingJourneyStep({ step, heading, index, total, progress }) {
  const motionStyle = useJourneyStepMotion(progress, index, total);

  return (
    <Motion.article
      data-journey-step={index}
      style={motionStyle}
      className="absolute inset-0 flex flex-col"
    >
      <ComputingJourneyHeading {...heading} decorative className="mb-6" />
      <div className="grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)_auto] gap-5 md:grid-cols-2 md:grid-rows-1 md:items-center md:gap-14">
        <div className="relative min-h-0 overflow-hidden rounded-xl3 border border-neutral-white/20 shadow-medium md:order-2 md:h-full">
          <Image
            src={step.image}
            alt={step.imageAlt}
            fill
            overlayClassName="bg-linear-to-t from-blue-deep/60 via-transparent to-transparent"
          />
          <Paragraph
            as="span"
            aria-hidden="true"
            className="absolute bottom-4 right-6 font-hani text-7xl font-bold text-neutral-white/80 md:text-9xl"
          >
            {("0" + (index + 1)).slice(-2)}
          </Paragraph>
        </div>
        <div className="pb-2 pr-12 md:order-1 md:pr-0">
          <Paragraph
            as="span"
            className="font-poppins text-xs tracking-[0.2em] text-orange uppercase"
          >
            Paso {index + 1} / {total}
          </Paragraph>
          <Title
            level="h3"
            variant="primary"
            weight="bold"
            className="mt-3 font-hani text-[clamp(1.6rem,4vw,4rem)]! leading-none"
            text={step.title}
          />
          <Paragraph
            size="compact"
            variant="primary"
            className="mt-4 max-w-md font-poppins text-sm leading-relaxed md:text-base"
            text={step.description}
          />
        </div>
      </div>
    </Motion.article>
  );
}
export { ComputingJourneyStep };
