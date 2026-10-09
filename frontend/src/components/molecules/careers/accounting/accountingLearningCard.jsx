import { Paragraph } from "@/components/atoms/paragraph";
import { ScrollReveal } from "@/components/layouts/scrollReveal";

function AccountingLearningCard({ description, number }) {
  return (
    <ScrollReveal
      as="li"
      delay={(number - 1) * 0.06}
      className="border-t-2 border-orange pt-5"
    >
      <Paragraph
        as="span"
        aria-hidden="true"
        className="font-hani text-4xl font-bold text-blue-dark/30"
      >
        0{number}
      </Paragraph>
      <Paragraph
        size="compact"
        className="mt-4 leading-relaxed text-neutral-black/85"
      >
        {description}
      </Paragraph>
    </ScrollReveal>
  );
}

export { AccountingLearningCard };
