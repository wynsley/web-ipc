import { Title } from "../../atoms/titles"
import { ContinuousCarousel } from "../../molecules/shared/continuousCarousel"
import { ConvCard } from "../../molecules/home/convCard"
import { agreements } from "../../../data/home/ agreements"

function Agreements() {
  return (
    <section className="
      flex flex-col justify-center 
      mx-auto my-10 md:my-20 
      w-[90%] md:w-[90%] md:max-w-7xl py-6
    ">
      <Title
        level="h2"
        text="CONVENIOS"
        weight="bold"
        className="font-hani mb-3 md:mb-8"
      />

      <ContinuousCarousel
        items={agreements}
        label="Convenios institucionales"
        draggable
        renderItem={(card) => <ConvCard {...card} />}
      />
    </section>
  )
}

export { Agreements }