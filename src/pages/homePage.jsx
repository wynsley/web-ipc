import { MyTemplate } from "../templates/myTemplate";
import { HomeBanner } from "../components/organisms/home/banner";

function HomePage() {
  return (
    <MyTemplate>
      <HomeBanner/>
    </MyTemplate>
    )
}

export {HomePage}