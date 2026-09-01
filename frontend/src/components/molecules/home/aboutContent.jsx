import { Paragraph } from "../../atoms/paragraph"
import { OurPlatform } from "./ourPlatform"

function AboutContent() {
  const paragraphs = [
    `Formamos profesionales altamente capacitados para enfrentar
    los desafíos del mundo laboral. Nuestro enfoque integral
    combina conocimiento técnico y desarrollo humano.`,

    `¡Únete a nosotros y construye tu futuro!`
  ]

  return (
    <div className="
      col-span-1
      md:col-start-2 md:row-start-2
      flex flex-col
      justify-start
      gap-6
    ">
      
      <div className="flex flex-col gap-4 mt-2 md:mt-16">
        {paragraphs.map((text, index) => (
          <Paragraph
            key={index}
            text={text}
            variant="secondary"
            size="base"
          />
        ))}
      </div>

      <OurPlatform />

    </div>
  )
}

export { AboutContent }