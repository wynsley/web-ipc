import './academicServicesPages.css'
import { Link } from "react-router-dom"
import { GuestTemplate } from "../templates/guestTemplate"
import CarouselNextButton from "../atoms/carouselNextButton"
import CarouselPrevButton from "../atoms/carouselPrevButton"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"
import { AsideCarousel } from "../organisms/logicaCarousel"
import "../organisms/logicaCarousel.css"
import { CardList } from '../organisms/listEconomicService'
import { Carousel } from '../organisms/servicesCarousel'
import { LibraryService } from '../organisms/libraryServices'
import { ContactForm } from '../organisms/contacForm'
import { OurPlatform } from '../organisms/ourPlatform'


import Img1 from "../../assets/img/infraestructura.png"
import Img2 from "../../assets/img/seervicios4.jpg"
import Img3 from "../../assets/img/servivios2.jpg"


const images = [
    { src: Img1, alt: "Infraestructura" },
    { src: Img2, alt: "Marcha" },
    { src: Img3, alt: "Calculo" },
]
 

function AcademicServicesPage(){
  const Title = 'SERVICIOS ACADÉMICOS'
  const Title2 = 'BECAS ACADÉMICAS'
  const Title3 ='ADMISIÓN'
  
  return (
    <>
      <section className="section__carousel">
            <AsideCarousel images={ images }>
              {{
                prev: ( goToPrev ) => (
                  <CarouselPrevButton
                    onClick={goToPrev}
                    className="carousel__aside__btn  carousel__aside__btn--prev"
                    >
                      <FaChevronLeft />
                    </CarouselPrevButton>
                ),

                next: ( goToNext ) => (
                  <CarouselNextButton
                    onClick={goToNext}
                    className= "carousel__aside__btn carousel__aside__btn--next"
                    >
                      <FaChevronRight />
                    </CarouselNextButton>
                )
              }}
            </AsideCarousel>
      </section>
      <h2 className="servicesTitle1">{Title}</h2>
      <CardList/> 
      <section className='sectionBecas'>
        <h2 className='servicesTitle   '>{Title2}</h2>
        <Carousel/>
      </section>
      <LibraryService/>
      <ContactForm/>  
      <OurPlatform/>
      
    </>

    
  )
}

export { AcademicServicesPage }

