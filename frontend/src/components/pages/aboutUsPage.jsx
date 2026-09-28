import { MyTemplate } from "../templates/myTemplate";
import { AboutHero } from "../organisms/aboutUs/aboutHero";

function AboutUsPage() {
  return (
    <MyTemplate>
      <AboutHero/>
    </MyTemplate>
  )
}

export { AboutUsPage }