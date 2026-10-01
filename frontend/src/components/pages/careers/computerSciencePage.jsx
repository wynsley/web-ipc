import { Image } from "../../atoms/image";
import { Title } from "../../atoms/titles";
import { MyTemplate } from "../../templates/myTemplate";

function ComputerSciencePage() {
  return (
    <MyTemplate>
      <section>
        <div>
          <Title 
            level="h2"
          />
        </div>
      </section>
    </MyTemplate>
  )
}

export { ComputerSciencePage }