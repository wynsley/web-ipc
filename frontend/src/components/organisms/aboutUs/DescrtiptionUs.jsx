import { Paragraph } from "@/components/atoms/paragraph"
import { Title } from "@/components/atoms/titles"

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
      className="mx-auto w-[92%] md:w-[90%] max-w-6xl py-0 md:py-10
        
      "
    >
      <div
      > 
        <Title
          text={title}
          level="h3"
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
      </div>
      <div
      >

      </div>
    </section>
  )
}

export {DescriptionUs}