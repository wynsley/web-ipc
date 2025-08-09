import { Link } from "react-router-dom"
import './admisionPage.css'
import { GuestTemplate } from "../templates/guestTemplate"
import CarouselNextButton from "../atoms/carouselNextButton"
import CarouselPrevButton from "../atoms/carouselPrevButton"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"
import { AsideCarousel } from "../organisms/logicaCarousel"
import { AdmisionSectionOne } from "../organisms/admisionSectionOne"
import { InfraestructuraIPC } from "../organisms/admisionSectionIPC"
import { AdmissionRequirements } from "../organisms/admisionRequirements"


import Img1 from "../../assets/img/infraestructura.png"
import Img2 from "../../assets/img/seervicios4.jpg"
import Img3 from "../../assets/img/servivios2.jpg"
import { ImOpt } from "react-icons/im"

const images = [
    { src: Img1, alt: "Infraestructura" },
    { src: Img2, alt: "Marcha" },
    { src: Img3, alt: "Calculo" },
]


function AdmissionPage(){
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
        <AdmisionSectionOne/>
        <InfraestructuraIPC/>
        <h2 className="titleAdmision careers">Explora las carreras disponibles que tenemos para ti</h2>
        <AdmissionRequirements/>
      </>



    
  )
}

export { AdmissionPage }