import { Form } from "../shared/form";
import { CardsForm } from "../../molecules/home/imgForm"

function EnrollmentForm() {
  const whyList = [
    { 
      img: "../../../../public/BECA_EXCELENCIA.webp", 
      text: "Beca de Excelencia Académica" 
    },
    { 
      img: "../../../../public/BECA_FAMILIAR.webp", 
      text: "Beca de Apoyo Familiar " 
    },
    { 
      img: "../../../../public/BECA_MERITO.webp", 
      text: "Beca de Mérito Académico" 
    },
    { 
      img: "../../../../public/DESCUENTO_PAGO_ANTICIPADO.webp", 
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