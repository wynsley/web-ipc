import { AccountingDetails } from "@/components/molecules/careers/accounting/accountingDetails";
import { AccountingCapabilities } from "@/components/molecules/careers/accounting/accountingCapabilities";
import { CareerSectionHeading } from "@/components/molecules/careers/shared/careerSectionHeading";
import {
  careerDetails,
  accountingCapabilities,
} from "@/data/careers/accounting/overview";

function AccountingOverview() {
  return (
    <section
      aria-labelledby="accounting-overview"
      className="bg-neutral-white px-5 py-16 sm:px-8 lg:px-12 lg:py-22"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <CareerSectionHeading
            id="accounting-overview"
            eyebrow="Conoce la carrera"
            title="Convierte los números en decisiones"
            description="Aprende a organizar e interpretar información contable para comprender las finanzas de una organización y contribuir a su gestión."
            descriptionClassName="mt-5 text-neutral-black/80"
          />
          <AccountingDetails items={careerDetails} />
        </div>
        <AccountingCapabilities items={accountingCapabilities} />
      </div>
    </section>
  );
}

export { AccountingOverview };
