import { AccountingDetails } from "@/components/molecules/careers/accounting/accountingDetails";
import { AccountingReasonsPanel } from "@/components/molecules/careers/accounting/accountingReasonsPanel";
import { CareerSectionHeading } from "@/components/molecules/careers/shared/careerSectionHeading";
import { careerDetails } from "@/data/careers/accounting/overview";

function AccountingOverview() {
  return (
    <section aria-labelledby="accounting-overview" className="bg-neutral-white px-5 py-16 sm:px-8 lg:px-12 lg:py-22">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <CareerSectionHeading
            id="accounting-overview"
            eyebrow="Conoce la carrera"
            title="Fortalece la gestión financiera de las organizaciones"
            description="Desarrolla competencias para registrar, analizar e interpretar información financiera con rigor metodológico, contribuyendo a la toma de decisiones estratégicas en organizaciones de diversos sectores."
            descriptionClassName="mt-5 text-neutral-black/80"
          />
          <AccountingDetails items={careerDetails} />
        </div>
        <AccountingReasonsPanel />
      </div>
    </section>
  );
}

export { AccountingOverview };
