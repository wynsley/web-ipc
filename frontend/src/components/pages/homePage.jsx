import { MyTemplate } from "../templates/myTemplate";
import { HomeBanner } from "../organisms/home/banner";
import { AboutSection } from "../organisms/home/aboutSection";
import { CareersSection } from "../organisms/home/homeCareers";
import { Agreements } from "../organisms/home/agreements";
import { HomeAdmissions } from "../organisms/home/homeAdmissions";
import { SocialFloatings } from "../molecules/shared/SocialsFloatings";
import { BannerCalled } from "../molecules/home/bannerCalled";

function HomePage() {
  return (
    <MyTemplate>
      <HomeBanner/>
      <BannerCalled />
      <AboutSection/>
      <CareersSection/>
      <Agreements/>
      <HomeAdmissions/>
      <SocialFloatings/>
    </MyTemplate>
    )
}

export {HomePage}