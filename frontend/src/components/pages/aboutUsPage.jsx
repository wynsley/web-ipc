import { MyTemplate } from "../templates/myTemplate";
import { AboutHero } from "../organisms/aboutUs/aboutUsHero";
import { DescriptionUs } from "../organisms/aboutUs/DescrtiptionUs";

function AboutUsPage() {
  return (
    <MyTemplate>
      <AboutHero/>
      <DescriptionUs/>
    </MyTemplate>
  )
}

export { AboutUsPage }