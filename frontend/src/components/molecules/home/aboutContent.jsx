import { Button } from "../../atoms/button"
import { Paragraph } from "../../atoms/paragraph"
import { Title } from "../../atoms/titles"
import { staggerContainer, paragraphReveal } from "../../animations/animation"
import { motion as Motion } from "motion/react"

function AboutContent({ title }) {
  const paragraphs = [
    `Formamos profesionales altamente capacitados para enfrentar
    los desafíos del mundo laboral. Nuestro enfoque integral
    combina conocimiento técnico y desarrollo humano.`,

    `¡Únete a nosotros y construye tu futuro!`
  ]

  return (
    <Motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-col gap-8 justify-start items-start"
    >
      <Motion.div variants={paragraphReveal} className="md:flex flex-col gap-6 hidden">
        <div className="h-0.75 w-20 rounded-full bg-blue md:block" />
        <Title
          text={title}
          level="h2"
          weight="extrabold"
          className="font-hani font-bold md:block"
        />
      </Motion.div>

      <div className="flex flex-col gap-4">
        {paragraphs.map((text, index) => (
          <Motion.div key={index} variants={paragraphReveal}>
            <Paragraph text={text} variant="secondary" size="medium" />
          </Motion.div>
        ))}
      </div>

      <Motion.div variants={paragraphReveal}>
        <Button text='Mas información' variant="ternary" />
      </Motion.div>
    </Motion.div>
  )
}

export { AboutContent }