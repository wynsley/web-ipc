import { MyTemplate } from "../templates/myTemplate";
import { HomeBanner } from "../components/organisms/home/banner";
import { AboutSection } from "../components/organisms/home/aboutSection";

function HomePage() {
  return (
    <MyTemplate>
      <HomeBanner/>
      <AboutSection/>
    </MyTemplate>
    )
}

export {HomePage}