import './academicServicesPage.css'
import { Link } from "react-router-dom"
import { GuestTemplate } from "../templates/guestTemplate"
import  CarouselContainer from "../organisms/carouselContainer"
import CarouselSlide from "../molecules/carouselSlide"
import CarouselNextButton from "../atoms/carouselNextButton"
import CarouselPrevButton from "../atoms/carouselPrevButton"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"
import "../organisms/carouselContainer.css"
import { CardList } from '../organisms/listEconomicService'
import { Carousel } from '../organisms/servicesCarousel'
import { LibraryService } from '../organisms/libraryServices'
import { ServicesAdmission } from '../organisms/servicesAdmission'
import { OurPlatform } from '../organisms/ourPlatform'


import Img1 from "../../assets/img/infraestructura.png"
import Img2 from "../../assets/img/seervicios4.jpg"
import Img3 from "../../assets/img/servivios2.jpg"

function AcademicServicesPage(){
  const servicesSlides = [
      {type: "image", src: Img1, alt: 'Infraestructura del instituto' },
      {type: "image", src: Img2, alt: 'Estudaintes en marcha' },
      {type: "image", src: Img3, alt: 'Clases de contabilidad' }
  ]

  const Title = 'SERVICIOS ACADÉMICOS'
  const Title2 = 'BECAS ACADÉMICAS'

  if (!servicesSlides || servicesSlides.length === 0){
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
          items={servicesSlides}
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
      <main className='main-services'>
        <h2 className="servicesTitle1">{Title}</h2>
        <CardList/> 
        <section className='sectionBecas'>
          <h2 className='servicesTitle   '>{Title2}</h2>
          <Carousel/>
        </section>
        <LibraryService/>
        <ServicesAdmission/>  
        <OurPlatform/>
      </main>
      
    </>

    
  )
}

export { AcademicServicesPage }

