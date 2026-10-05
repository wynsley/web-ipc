import { Title } from "../../atoms/titles";
import { Paragraph } from "../../atoms/paragraph";
import { Image } from "../../atoms/image";
import { ScrollReveal } from "../../layouts/scrollReveal";

function ComputingJourneyCard({ step, index }) {
  return (
    <ScrollReveal className="overflow-hidden rounded-xl2 border border-neutral-white/15 bg-blue-dark/70">
      <Image src={step.image} alt={step.imageAlt} className="aspect-square" />
      <div className="p-6">
        <span className="font-hani text-4xl font-bold text-orange">
          {("0" + (index + 1)).slice(-2)}
        </span>
        <Title
          level="h3"
          size="compact"
          variant="primary"
          weight="bold"
          className="mt-4 font-hani"
          text={step.title}
        />
        <Paragraph
          size="compact"
          variant="primary"
          className="mt-4 font-poppins leading-relaxed"
          text={step.description}
        />
      </div>
    </ScrollReveal>
  );
}

export { ComputingJourneyCard };
