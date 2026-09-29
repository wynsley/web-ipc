import { Paragraph } from "@/components/atoms/paragraph"
import { Title } from "@/components/atoms/titles"
import ipcStudents from "@/assets/images/aboutUs/aboutus-students.webp"
import { motion as Motion } from "motion/react"
import { staggerContainer } from "@/components/animations/animation"
import { ScrollReveal } from "@/components/layouts/scrollReveal"


function DescriptionUs ( ) {
  const title = "FORMANDO PROFESIONALES QUE TRANSFORMAN EL FUTURO"
  const paragraph1 = `Desde nuestra fundación, hace 19 años, nuestro instituto viene 
  trabajando con el compromiso de brindar una educación de calidad en la ciudad de Celendín, 
  formando estudiantes con conocimientos, habilidades y valores que les permitan afrontar los 
  desafíos del mundo laboral. A lo largo de nuestra trayectoria, hemos contribuido al desarrollo 
  académico y profesional de jóvenes, ofreciendo una formación orientada a sus necesidades y a las 
  demandas del mercado actual.`

  const paragraph2 = `Nos caracterizamos por promover una educación integral, basada en la innovación, 
  la excelencia académica y el compromiso con nuestra comunidad. Nuestro objetivo es formar profesionales 
  competentes, emprendedores y comprometidos con el desarrollo de Celendín y del país, brindando 
  oportunidades de crecimiento y superación a las nuevas generaciones.`

  return( 
    <section
      className="mx-auto flex  flex-col items-start
      gap-8 py-8 mt-10 w-[92%] max-w-7xl md:w-[90%] 
      md:py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-8
      "
    >
      <Motion.div
        variants={staggerContainer}
        initial = 'hidden'
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex w-full flex-col gap-4 lg:w-[70%] "
      > 
        <Title
          text={title}
          level="h2"
          weight="bold"
          className="font-hani"
        />
        
          <Paragraph
          size="small"
          text={paragraph1}
          variant="secondary"
          className="font-poppins"
        />
        <Paragraph
          size="small"
          text={paragraph2}
          variant="secondary"
          className="font-poppins"
        />
      </Motion.div>

      <ScrollReveal 
        className="relative w-[80%] sm:w-[50%] lg:ml-auto lg:w-[30%]  ">
        <ScrollReveal 
          delay={0.35}
          y={50}
          className="absolute inset-0 translate-x-3 translate-y-3 border-2 border-blue -z-10" />
      
          <img 
          src={ipcStudents} 
          alt="infraestructura ipc" 
          className="block z- h-auto w-full object-cover "
        />
      </ScrollReveal>
      <div
      >

      </div>
    </section>
  )
}

export {DescriptionUs}