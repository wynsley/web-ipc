import { staggerContainer } from "@/components/animations/animation"
import { Paragraph } from "@/components/atoms/paragraph"
import { Title } from "@/components/atoms/titles"
import { ScrollReveal } from "@/components/layouts/scrollReveal"
import { motion as Motion } from "motion/react"

function CardMissionVission({ list }) {
  return (
    <>
      {
        list.map((item, i) => {
          return (
            <Motion.div
              variants={staggerContainer}
              initial = "hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              key={i}
              className="flex flex-col gap-3"
            >
              <Title
                text={item.title}
                level="h2"
                weight="bold"
                className="font-hani"
              />
              <ScrollReveal className={`${item.bgCard} p-5 bg-slate-100`}>
                <Paragraph
                  text={item.description}
                  className="font-poppins "
                  size="small"
                />
              </ScrollReveal>
            </Motion.div>
          )
        })
      }
    </>
  )
}

export { CardMissionVission }