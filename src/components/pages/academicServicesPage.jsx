import './academicServicesPages.css'
import { Link } from "react-router-dom"
import { GuestTemplate } from "../templates/guestTemplate"
import  CarouselContainer from "../organisms/carouselContainer"
import CarouselSlide from "../molecules/carouselSlide"
import CarouselNextButton from "../atoms/carouselNextButton"
import CarouselPrevButton from "../atoms/carouselPrevButton"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"
import "../organisms/carouselContainer.css"
import { CardList } from '../organisms/listEconomicService'
import { LibraryService } from '../organisms/libraryServices'
import { ContactForm } from '../organisms/contacForm'

import Img1 from "../../assets/img/infraestructura.png"
import Img2 from "../../assets/img/seervicios4.jpg"
import Img3 from "../../assets/img/servivios2.jpg"

function AcademicServicesPage(){
  const homeSlides = [
      {type: "image", src: Img1, alt: 'Infraestructura del instituto' },
      {type: "image", src: Img2, alt: 'Estudaintes en marcha' },
      {type: "image", src: Img3, alt: 'Clases de contabilidad' }
  ]

  const Title = 'SERVICIOS ACADÉMICOS'
  const Title2 = 'BECAS ACADÉMICAS'
  const Title3 ='ADMISIÓN'


  if (!homeSlides || homeSlides.length === 0){
    return (
      <div>
        <h1>No hay imágenes para mostrar</h1>
      </div>
    )
  }
  
  return (
    <>
      <section>
        <CarouselContainer 
          items={homeSlides}
          renderItem={(slide) => (
            <CarouselSlide 
              type={slide.type}
              src={slide.src}
              alt={slide.alt}
            />
          )}
        >
          {{
            prev: (goToPrev) => (
              <CarouselPrevButton
                onClick={goToPrev}
                className="carousel__aside__btn carousel__aside__btn--prev"
              >
                <FaChevronLeft />
              </CarouselPrevButton>
            ),
            next: (goToNext) => (
              <CarouselNextButton
                onClick={goToNext}
                className="carousel__aside__btn carousel__aside__btn--next"
              >
                <FaChevronRight />
              </CarouselNextButton>
            )
          }}
        </CarouselContainer>
      </section>

        <h2 className="servicesTitle1">{Title}</h2>
        <CardList/>
        <h2 className='servicesTitle '>{Title2}</h2>
        {/*aca va el carrusel de servicios académicos*/}
        <LibraryService/>

        <ContactForm/>  
    </>

    
  )
}

export { AcademicServicesPage }

