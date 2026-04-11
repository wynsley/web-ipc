import { Paragraph } from "../../atoms/paragraph"


function AboutContent() {
  const textOne = `Formamos profesionales altamente capacitados para enfrentar
          los desafíos del mundo laboral. Nuestro enfoque integral
          combina conocimiento técnico y desarrollo humano.`
  const textTwo = `¡Únete a nosotros y construye tu futuro!`

  return (
  <div className="
        col-span-1
        md:col-start-2 md:row-start-2
        flex flex-col gap-5
        justify-start md:justify-start md:pb-2 mt-1 md:mt-[4em]
      ">
        <Paragraph 
          text={textOne}
          variant="secondary"
          size="base"
          />
        <Paragraph 
          text={textTwo}
          variant="secondary"
          size="base"
        />
      </div>
  )
}

export { AboutContent }