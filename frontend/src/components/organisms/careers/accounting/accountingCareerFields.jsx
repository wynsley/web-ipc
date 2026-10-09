import { AccountingFeatureList } from "@/components/molecules/careers/accounting/accountingFeatureList";
import { CareerSectionHeading } from "@/components/molecules/careers/shared/careerSectionHeading";
import { fieldRoles, jobTitles } from "@/data/careers/accounting/fields";

function AccountingCareerFields() {
  return (
    <section aria-labelledby="accounting-fields" className="bg-neutral-white px-5 py-16 sm:px-8 lg:px-12 lg:py-22">
      <div className="mx-auto max-w-7xl">
        <CareerSectionHeading id="accounting-fields" eyebrow="Proyección profesional" title="Un campo de acción amplio" description="Explora los sectores y funciones vinculados a la Contabilidad." descriptionClassName="mt-4" />
        <div className="mt-9 grid gap-6 lg:grid-cols-2">
          <AccountingFeatureList title="Dónde puedes trabajar" items={fieldRoles} />
          <AccountingFeatureList title="Funciones profesionales" items={jobTitles} />
        </div>
      </div>
    </section>
  );
}

export { AccountingCareerFields };
