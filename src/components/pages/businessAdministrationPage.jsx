import { BusinessCarousel } from "../organisms/businessCarousel"
import { BusinessHeroSection } from "../organisms/businessHeroSection"
import { BusinessStudyPlan } from "../organisms/businessStudyPlan"

function BusinessAdministrationPage(){
  return(
    <>
      <BusinessHeroSection />
      <BusinessCarousel />
      <BusinessStudyPlan />
    </>
  )
}

export { BusinessAdministrationPage }