import { GuestTemplate } from "../templates/guestTemplate"
import { CareersSection } from "../organisms/careersSection"
import { WhyChooseUsSection } from "../organisms/whyChooseUsSection"
import { CareerContactSection } from "../organisms/careerContactSection"

function MajorsPage(){
  return (
    <>
    <WhyChooseUsSection />
      <CareersSection />

      <CareerContactSection />
    </>
  )
}

export { MajorsPage }