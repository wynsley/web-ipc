import { Button } from "../../atoms/button"
import { Paragraph } from "../../atoms/paragraph"
import { Title } from "../../atoms/titles"

function AboutContent({title}) {
  const paragraphs = [
    `Formamos profesionales altamente capacitados para enfrentar
    los desafíos del mundo laboral. Nuestro enfoque integral
    combina conocimiento técnico y desarrollo humano.`,

    `¡Únete a nosotros y construye tu futuro!`
  ]

  return (
    <div className="
      flex flex-col gap-8 justify-start items-start
    ">
      <Title 
          text={title}
          level="h2"
          weight="extrabold"
          className="
            font-hani font-bold
            hidden md:block lg:text-6xl
      "/>

      <div className="flex flex-col gap-4 ">
        {paragraphs.map((text, index) => (
          <Paragraph
            key={index}
            text={text}
            variant="secondary"
            size="medium"
          />
        ))}
      </div>
      <Button
        text='Mas información'
        variant="ternary"
      />
    </div>
  )
}

export { AboutContent }