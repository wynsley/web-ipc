import { staggerContainer } from "@/components/animations/animation";
import { Paragraph } from "@/components/atoms/paragraph";
import { Title } from "@/components/atoms/titles";
import { ScrollReveal } from "@/components/layouts/scrollReveal";
import { Beginning } from "@/components/molecules/aboutUs/beginning";
import { beginning } from "@/data/aboutUs/beginning";
import { motion as Motion } from "motion/react";

function OurBeginning() {

  const desciption = `Desde sus inicios, el Instituto Privado Celendín se ha caracterizado por su
            compromiso con la formación integral de sus estudiantes y con las necesidades
            educativas y laborales de la región.`

  return (
    <section className="w-full bg-white px-6 py-10 lg:px-16  mb-10 md:mb-20">
      <div className="mx-auto max-w-6xl">
        <Motion.div 
          variants={staggerContainer}
          initial ="hidden"
          whileInView="visible"
          viewport={{once: true, amount: 0.3}}
          className="relative mx-auto  text-center">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 
            -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-hani 
            text-7xl font-extrabold leading-none text-blue-deep/3 md:text-[20em]"
          >
            Historia
          </span>

          <Title
            align="left"
            level="h2"
            weight="bold"
            className="font-hani"
          >
            NUESTRO <span className="text-blue">INICIO</span>
          </Title>

          <Paragraph
            text={desciption}
            variant="secondary"
            size="base"
            className="font-poppins max-w-2xl"
          />
        </Motion.div>

        <ol className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {
          beginning.map((item, i) => {
            const isLast = i === beginning.length - 1;
            return (
              <ScrollReveal key={i} delay={0.3 * i} y={60}>
              <Beginning 
                item={item}
                isLast={isLast}
              />
            </ScrollReveal>
            )
          })
        }
        </ol>
      </div>
    </section>
  );
}

export { OurBeginning };