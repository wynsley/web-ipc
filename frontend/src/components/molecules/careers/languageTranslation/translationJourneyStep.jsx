import { Title } from "@/components/atoms/titles";
import { Paragraph } from "@/components/atoms/paragraph";
import { ScrollReveal } from "@/components/layouts/scrollReveal";

function TranslationJourneyStep({ step, index }) {
  const { number, title, description, Icon } = step;

  return (
    <li>
      <ScrollReveal
        delay={index * 0.1}
        className="border-t border-white/30 pt-6"
      >
        <div className="mb-6 flex items-center justify-between">
          <Paragraph
            as="span"
            aria-hidden="true"
            className="font-hani text-6xl font-bold text-orange"
          >
            {number}
          </Paragraph>
          <Icon aria-hidden="true" className="size-8 text-white" />
        </div>
        <Title
          level="h3"
          size="compact"
          variant="primary"
          weight="bold"
          className="font-hani"
          text={title}
        />
        <Paragraph
          size="compact"
          variant="primary"
          className="mt-3 max-w-xs font-poppins leading-relaxed"
          text={description}
        />
      </ScrollReveal>
    </li>
  );
}

export { TranslationJourneyStep };
