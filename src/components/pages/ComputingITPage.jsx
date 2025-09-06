import { ComputingBenefitsSection } from '../organisms/computingBenefitsSection'
import { ComputingCarousel } from '../organisms/computingCarousel'
import { ComputingHeroSection } from '../organisms/computingHeroSection'

function ComputingITPage(){
  return(
    <>
      <ComputingHeroSection />
      <ComputingCarousel />
      <ComputingBenefitsSection />
    </>
  )
}

export { ComputingITPage }