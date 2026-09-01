import { Form } from "../form"
import { CardsForm } from "../../molecules/home/imgForm"

function EnrollmentForm() {
  const whyList = [
    { 
      img: "/images/carreras.jpg", 
      text: "Beca de Excelencia Académica" 
    },
    { 
      img: "/images/informacion.jpg", 
      text: "Beca de Apoyo Familiar " 
    },
    { 
      img: "/images/inscripcion.jpg", 
      text: "Beca de Mérito Académico" 
    },
    { 
      img: "/images/futuro.jpg", 
      text: "Descuento por Pago Anticipado" 
    },
  ];

  return (
    <section className="
      py-10
      w-full
      flex
      justify-center   
    ">
      
      <div className="
        w-full
        max-w-275
        flex flex-col md:flex-row
        items-center
        justify-center   
        gap-6 md:gap-15
      ">
        
        <Form />

        <CardsForm whyList={whyList} />

      </div>

    </section>
  )
}

export { EnrollmentForm }