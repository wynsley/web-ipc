import { accountingBenefits } from "@/data/careers/accounting/benefits";
import { BenefitCard } from "@/components/molecules/careers/shared/benefitCard";
import { CareerSectionHeading } from "@/components/molecules/careers/shared/careerSectionHeading";

function AccountingValueProps() {
  return (
    <section aria-labelledby="accounting-benefits" className="bg-neutral-light px-5 py-16 sm:px-8 lg:px-12 lg:py-22">
      <div className="mx-auto max-w-7xl">
        <CareerSectionHeading id="accounting-benefits" eyebrow="Formación en el IPC" title="Aprende con propósito" description="¿Por qué estudiar Contabilidad en el IPC?" descriptionClassName="mt-4" />
        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {accountingBenefits.map((item, index) => (
            <BenefitCard key={item.title} title={item.title} description={item.description} delay={index * 0.06} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export { AccountingValueProps };
