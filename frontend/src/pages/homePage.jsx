import { MyTemplate } from "../templates/myTemplate";
import { HomeBanner } from "../components/organisms/home/banner";
import { AboutSection } from "../components/organisms/home/aboutSection";
import { CareersSection } from "../components/organisms/home/homeCareers";
import { Agreements } from "../components/organisms/home/agreements";
import { EnrollmentForm } from "../components/organisms/home/enrollmentForm";
function HomePage() {
  return (
    <MyTemplate>
      <HomeBanner/>
      <AboutSection/>
      <CareersSection/>
      <Agreements/>
      <EnrollmentForm/>
    </MyTemplate>
    )
}

export {HomePage}