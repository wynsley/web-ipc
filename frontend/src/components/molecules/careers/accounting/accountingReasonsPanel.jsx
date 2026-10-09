import { Title } from "@/components/atoms/titles";
import { Paragraph } from "@/components/atoms/paragraph";
import { ScrollReveal } from "@/components/layouts/scrollReveal";
import { reasons } from "@/data/careers/accounting/hero";

function AccountingReasonsPanel() {
  return (
    <ScrollReveal className="self-start border-t-4 border-orange bg-neutral-light p-6 sm:p-8">
      <Title
        level="h3"
        variant="institutional"
        weight="bold"
        className="font-hani leading-tight"
      >
        ¿Por qué estudiar Contabilidad?
      </Title>
      <ol className="mt-6 divide-y divide-blue-dark/10">
        {reasons.map((reason, index) => (
          <li key={reason} className="flex gap-4 py-5 first:pt-0 last:pb-0">
            <Paragraph
              as="span"
              aria-hidden="true"
              className="font-hani text-2xl font-bold text-orange"
            >
              0{index + 1}
            </Paragraph>
            <Paragraph
              size="compact"
              className="leading-relaxed text-neutral-black/80"
            >
              {reason}
            </Paragraph>
          </li>
        ))}
      </ol>
    </ScrollReveal>
  );
}

export { AccountingReasonsPanel };
