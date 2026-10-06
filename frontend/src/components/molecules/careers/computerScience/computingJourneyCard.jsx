import { Title } from "@/components/atoms/titles";
import { Paragraph } from "@/components/atoms/paragraph";
import { Image } from "@/components/atoms/image";
import { ScrollReveal } from "@/components/layouts/scrollReveal";

function ComputingJourneyCard({ step, index }) {
  return (
    <ScrollReveal className="overflow-hidden rounded-xl2 border border-neutral-white/15 bg-blue-dark/70">
      <Image src={step.image} alt={step.imageAlt} className="aspect-square" />
      <div className="p-6">
        <Paragraph
          as="span"
          className="font-hani text-4xl font-bold text-orange"
        >
          {("0" + (index + 1)).slice(-2)}
        </Paragraph>
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
