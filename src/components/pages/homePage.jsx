import { Link } from "react-router-dom"
import { GuestTemplate } from "../templates/guestTemplate"
import CarouselContainer from "../organisms/carouselContainer"
import CarouselSlide from "../molecules/carouselSlide"
import CarouselNextButton from "../atoms/carouselNextButton"
import CarouselPrevButton from "../atoms/carouselPrevButton"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"
import { HomeInstituteSection } from "../organisms/homeInstituteSection"
import { CareersSection } from "../organisms/careersSection"
import { ConveniosSection } from "../organisms/conveniosSection"
import { EventsSection } from "../organisms/eventsSection"
import { HomeContactSection } from "../organisms/homeContactSection"
import { CtaSection } from "../organisms/ctaSection"
import "../organisms/carouselContainer.css"


import Img1 from "../../assets/img/infraestructura.png"
import Img2 from "../../assets/img/seervicios4.jpg"
import Img3 from "../../assets/img/servivios2.jpg"

function HomePage(){
  const homeSlides = [
    {type: "image", src: Img1, alt: 'Infraestructura del instituto' },
    {type: "image", src: Img2, alt: 'Estudiantes en marcha' },
    {type: "image", src: Img3, alt: 'Clases de contabilidad' }
  ]


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

      <main>
        <HomeInstituteSection />

        <CareersSection 
          title="Nuestras Carreras Profesionales"
          subtitle="Explora nuestras carreras técnicas diseñadas para formar profesionales exitosos en el mercado laboral actual"
          columns="four"
        />

        <ConveniosSection 
          title = "Convenios IPC"
        />

        <EventsSection 
          title = "Eventos"
          subtitle = "Mantente informado sobre nuestros próximos eventos, ceremonias y actividades especiales del Instituto Privado Celendín."
        />

        <CtaSection 
          title= "Tú también puedes alcanzar tus sueños"
          description= "En el Instituto Privado Celendín, formamos profesionales altamente capacitados para enfrentar los desafíos del mundo laboral. ¡Únete a nosotros y construye tu futuro!"
          primaryButtonText= "Conoce Nuestras Carreras"
          primaryButtonLink= "/majors"
        />

        <HomeContactSection 
          title="¡Contáctanos!"
          subtitle="¿Tienes dudas sobre nuestras carreras? ¿Quieres más información? Estamos aquí para ayudarte a dar el primer paso hacia tu futuro profesional."
          imageBadgeText="¡18 años!"
          imageTitle="Formando Profesionales"
          imageDescription="Más de 18 años de experiencia formando profesionales exitosos que destacan en el mercado laboral nacional e internacional."
        />
      </main>
    </>
  )
}

export { HomePage }