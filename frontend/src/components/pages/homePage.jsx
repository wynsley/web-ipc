import { MyTemplate } from "../templates/myTemplate";
import { HomeBanner } from "../organisms/home/banner";
import { AboutSection } from "../organisms/home/aboutSection";
import { CareersSection } from "../organisms/home/homeCareers";
import { Agreements } from "../organisms/home/agreements";
import { EnrollmentForm } from "../organisms/home/enrollmentForm";
import { SocialFloatings } from "../molecules/shared/SocialsFloatings";
function HomePage() {
  return (
    <MyTemplate>
      <HomeBanner/>
      <AboutSection/>
      <CareersSection/>
      <Agreements/>
      <EnrollmentForm/>
      <SocialFloatings/>
    </MyTemplate>
    )
}

export {HomePage}