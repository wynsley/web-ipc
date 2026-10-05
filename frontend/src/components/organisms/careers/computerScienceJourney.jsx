import { useRef } from "react";
import { motion as Motion } from "motion/react";
import { useJourneyMotion } from "../../animations/useJourneyMotion";
import { ComputingJourneyBackground } from "../../molecules/careers/computingJourneyBackground";
import { ComputingJourneyHeading } from "../../molecules/careers/computingJourneyHeading";
import { ComputingJourneyStep } from "../../molecules/careers/computingJourneyStep";
import { ComputingJourneyCard } from "../../molecules/careers/computingJourneyCard";

function ComputerScienceJourney({ steps, image, heading }) {
  const sectionRef = useRef(null);
  const { pinned, progress, surfaceStyle } = useJourneyMotion(sectionRef);

  return (
    <section
      ref={sectionRef}
      data-pinned-scene={pinned}
      aria-labelledby="computing-journey-title"
      className={`relative bg-blue-deep text-neutral-white ${pinned ? "h-[320svh]" : ""}`}
    >
      <Motion.div
        data-journey-surface
        style={surfaceStyle}
        className={`relative isolate px-6 sm:px-10 ${pinned ? "sticky top-16 flex h-[calc(100svh-4rem)] flex-col overflow-hidden py-6 md:top-24 md:h-[calc(100svh-6rem)] md:py-10" : "overflow-hidden py-16 sm:py-24"}`}
      >
        <ComputingJourneyBackground
          image={image}
          wordmark={heading.wordmark}
          progress={progress}
          animated={pinned}
        />
        <ComputingJourneyHeading
          {...heading}
          id="computing-journey-title"
          className={pinned ? "sr-only" : "relative mx-auto w-full max-w-6xl"}
        />
        {pinned ? (
          <div className="relative mx-auto w-full max-w-6xl min-h-0 flex-1 overflow-hidden">
            {steps.map((step, index) => (
              <ComputingJourneyStep
                key={step.title}
                step={step}
                heading={heading}
                index={index}
                total={steps.length}
                progress={progress}
              />
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-10 grid w-full max-w-6xl gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <ComputingJourneyCard
                key={step.title}
                step={step}
                index={index}
              />
            ))}
          </div>
        )}
      </Motion.div>
    </section>
  );
}

export { ComputerScienceJourney };
