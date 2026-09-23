import { IoIosArrowRoundForward } from "react-icons/io"
import { staggerContainer, paragraphReveal } from "../../animations/animation"
import { Button } from "../../atoms/button"
import { Title } from "../../atoms/titles"
import { motion as Motion } from "motion/react"


function BannerDescription({ title, cta }) {
  return (
    <article
      className="
          flex flex-col gap-2 md:gap-5 lg:gap-15 justify-center items-start
          px-4 sm:px-8 md:px-10 lg:px-15 xl:px-20 z-10 w-[70%]
        "
    >
      <Motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col items-flex-start justify-center" >
        <Motion.p
          variants={paragraphReveal}
          className="text-blue-light 
          text-[.7em] xs:text-[1em] sm:text-[1.3em] xl:text-[3em] 
          font-hani font-bold"
        >
          {cta}
        </Motion.p>
        <Title
          text={title}
          level="h1"
          weight="bold"
          variant="primary"
          className=" font-poppins leading-tight
        text-shadow-[0px_2px_3px_black]"
        />
      </Motion.div>
      <Button
        type="button"
        variant="primary"
        className="group flex items-center gap-4 justify-center"
      >
        ¡Inscríbete!
        <IoIosArrowRoundForward className="size-3 sm:size-6 transition-transform group-hover:translate-x-1" />
      </Button>
    </article>
  )
}

export { BannerDescription }