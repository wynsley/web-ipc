import { AccountingHeroIntro } from "@/components/molecules/careers/accounting/accountingHeroIntro";
import { BrandedHeroFrame } from "@/components/molecules/shared/brandedHeroFrame";
import accountingImage from "@assets/images/careers/accounting/CONTABILIDAD.webp";
import { AccountingHeroStudent } from "@/components/molecules/careers/accounting/accountingHeroStudent";

function AccountingHero({ onRequest }) {
  return (
    <section
      aria-labelledby="accounting-title"
      className="relative z-0 pb-6 sm:pb-8"
    >
      <BrandedHeroFrame
        image={accountingImage}
        variant="institutional"
        className="h-136 sm:min-h-80"
      >
        <AccountingHeroIntro onRequest={onRequest} />
      </BrandedHeroFrame>
      <AccountingHeroStudent />
    </section>
  );
}

export { AccountingHero };
