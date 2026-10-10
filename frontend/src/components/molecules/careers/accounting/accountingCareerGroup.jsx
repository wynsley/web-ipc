import { Title } from "@/components/atoms/titles";
import { ScrollReveal } from "@/components/layouts/scrollReveal";
import { AccountingFeatureList } from "./accountingFeatureList";

function AccountingCareerGroup({ id, title, groups }) {
  return (
    <section aria-labelledby={id}>
      <ScrollReveal>
        <Title
          id={id}
          level="h3"
          variant="primary"
          weight="bold"
          className="mb-6 font-hani"
          text={title}
        />
      </ScrollReveal>
      <div className="grid gap-4 sm:grid-cols-2">
        {groups.map((group, index) => (
          <ScrollReveal
            key={group.title}
            delay={index * 0.05}
            className="h-full"
          >
            <AccountingFeatureList {...group} mirrored={index % 2 === 1} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

export { AccountingCareerGroup };
