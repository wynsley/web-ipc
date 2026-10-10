import { Title } from "@/components/atoms/titles";
import { Paragraph } from "@/components/atoms/paragraph";
import { ScrollReveal } from "@/components/layouts/scrollReveal";
import { AccountingCycleCard } from "./accountingCycleCard";

function AccountingCurriculumYear({ year, expanded }) {
  return (
    <ScrollReveal delay={(year.number - 1) * 0.08}>
      <section aria-labelledby={`accounting-year-${year.number}`}>
        <header className="relative mb-5 bg-blue-dark px-6 py-5 [clip-path:polygon(0_0,calc(100%-24px)_0,100%_24px,100%_100%,0_100%)]">
          <Paragraph
            as="span"
            className="mb-2 block font-hani text-sm font-bold tracking-widest text-neutral-white/70"
          >
            AÑO 0{year.number}
          </Paragraph>
          <Title
            id={`accounting-year-${year.number}`}
            level="h3"
            size="compact"
            variant="primary"
            weight="bold"
            className="font-hani"
            text={year.title}
          />
        </header>
        <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-1">
          {year.cycles.map((cycle, index) => (
            <AccountingCycleCard
              key={cycle.title}
              cycle={cycle}
              number={(year.number - 1) * 2 + index + 1}
              expanded={expanded}
            />
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
}

export { AccountingCurriculumYear };
