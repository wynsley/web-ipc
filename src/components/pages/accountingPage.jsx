import { AccountingBenefitsSection } from "../organisms/accountingBenefitsSection"
import { AccountingHeroSection } from "../organisms/accountingHeroSection"

function AccountingPage(){
  return(
    <>
      <AccountingHeroSection />
      <AccountingBenefitsSection />
    </>
  )
}

export { AccountingPage }