import { AccountingHeroIntro } from "@/components/molecules/careers/accounting/accountingHeroIntro";
import { AccountingHeroVisual } from "@/components/molecules/careers/accounting/accountingHeroVisual";
import { CareerBreadcrumbs } from "@/components/molecules/careers/shared/careerBreadcrumbs";
import { ScrollReveal } from "@/components/layouts/scrollReveal";

function AccountingHero({ onRequest }) {
  return (
    <section aria-labelledby="accounting-title" className="bg-blue-dark text-neutral-white">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12 lg:pb-16">
        <CareerBreadcrumbs title="Contabilidad" className="mb-10 text-sm text-neutral-white/80" />
        <div className="grid min-w-0 gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <ScrollReveal>
            <AccountingHeroIntro onRequest={onRequest} />
          </ScrollReveal>
          <ScrollReveal delay={0.12}>
            <AccountingHeroVisual />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export { AccountingHero };
