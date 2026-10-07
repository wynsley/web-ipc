import { ComputingJourneyHeading } from "@/components/molecules/careers/computerScience/computingJourneyHeading";
import { ComputingJourneyCard } from "@/components/molecules/careers/computerScience/computingJourneyCard";
import { Paragraph } from "@/components/atoms/paragraph";

function ComputerScienceJourney({ steps, heading }) {
  return (
    <section
      aria-labelledby="computing-journey-title"
      className="bg-blue-deep px-6 py-16 text-neutral-white sm:px-10 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <ComputingJourneyHeading {...heading} id="computing-journey-title" />
        <Paragraph
          variant="primary"
          size="compact"
          className="mt-5 max-w-2xl leading-relaxed"
          text={heading.description}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <ComputingJourneyCard key={step.title} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export { ComputerScienceJourney };
