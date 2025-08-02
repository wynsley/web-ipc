import { Link } from "react-router-dom"
import { GuestTemplate } from "../templates/guestTemplate"
import CarouselNextButton from "../atoms/carouselNextButton"
import CarouselPrevButton from "../atoms/carouselPrevButton"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"
import { AsideCarousel } from "../organisms/logicaCarousel"
import "../organisms/logicaCarousel.css"

import Img1 from "../../assets/img/infraestructura.png"
import Img2 from "../../assets/img/seervicios4.jpg"
import Img3 from "../../assets/img/servivios2.jpg"


const images = [
    { src: Img1, alt: "Infraestructura" },
    { src: Img2, alt: "Marcha" },
    { src: Img3, alt: "Calculo" },
]


function HomePage(){

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

      <h1>Inicio</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id impedit reiciendis officia? Aliquam sapiente porro error eius accusamus ab iure id harum officia officiis tenetur asperiores, numquam vero amet cum unde? Officiis, qui ipsa repellendus, at vero cumque iste sunt iure neque quas nesciunt reiciendis, molestiae culpa aliquid ipsum exercitationem illo. Ex voluptatem quasi explicabo perspiciatis nulla inventore enim, est, expedita ipsam saepe vitae, corporis magni maxime. Est esse rerum corrupti eligendi officia omnis eos voluptates delectus labore cupiditate laborum temporibus, eum, neque nesciunt obcaecati. Ullam autem eos, sequi error, pariatur et ut voluptate commodi, tempora odio soluta. Ut, accusantium?</p>
      <Link to={'/contact'} className="link">ir a  contacto</Link>
    </>
  )
}

export { HomePage }