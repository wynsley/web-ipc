import { GuestTemplate } from "../templates/guestTemplate"
import CarouselContainer from "../organisms/carouselContainer"
import CarouselSlide from "../molecules/carouselSlide"
import CarouselNextButton from "../atoms/carouselNextButton"
import CarouselPrevButton from "../atoms/carouselPrevButton"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"
import { GraduationProcessSection } from "../organisms/graduationProcessSection"
import { GraduatesTestimonialsSection } from "../organisms/graduatesTestimonialsSection"

import Img1 from "../../assets/img/infraestructura.png"
import Img2 from "../../assets/img/seervicios4.jpg"
import Img3 from "../../assets/img/servivios2.jpg"

function GraduatesPage(){
  const graduatesSlides = [
    {type: "image", src: Img1, alt: 'Infraestructura del instituto' },
    {type: "image", src: Img2, alt: 'Estudiantes en marcha' },
    {type: "image", src: Img3, alt: 'Clases de contabilidad' }
  ]

  // Datos personalizados para el proceso de titulación
  const customProcessSteps = [
    {
      id: 'requisitos-previos',
      title: 'Requisitos Previos',
      description: 'Verifica que cumplas con todos los requisitos académicos y administrativos necesarios.',
      steps: [
        'Haber culminado todas las asignaturas del plan de estudios',
        'No tener deudas pendientes con la institución',
        'Certificados de estudios completos y actualizados',
        'Constancia de no adeudo de biblioteca',
        'Estar al día con pagos administrativos'
      ],
      status: 'completed',
      expandedContent: 'Es fundamental que todos los documentos estén en regla antes de iniciar el proceso. La coordinación académica verificará el cumplimiento de estos requisitos. Los certificados deben estar debidamente legalizados por la institución y cualquier deuda debe estar completamente saldada.',
      downloadInfo: {
        url: '/documents/requisitos-previos-titulacion.pdf',
        fileName: 'lista-requisitos-previos.pdf'
      }
    },
    {
      id: 'cronograma-proceso',
      title: 'Cronograma del Proceso',
      description: 'Conoce las fechas importantes y plazos establecidos para el proceso de titulación 2025.',
      steps: [
        'Inscripción del proyecto: 15-24 Abril',
        'Entrega del Proyecto: 01-10 Junio', 
        'Sustentación del proyecto: Aula 1: Modalidad',
        'Ceremonias de graduación: Diciembre 2025'
      ],
      status: 'active',
      expandedContent: 'El cronograma debe respetarse estrictamente. Las fechas de sustentación se asignan según disponibilidad del jurado calificador y el cumplimiento oportuno de los requisitos. Es recomendable realizar el seguimiento constante con la coordinación académica.',
      downloadInfo: {
        url: '/documents/cronograma-completo-2025.pdf',
        fileName: 'cronograma-titulacion-2025.pdf'
      }
    }
  ]

  // Documentos personalizados
  const customDocuments = [
    {
      id: 'guia-completa',
      title: 'Guía Completa del Proceso',
      subtitle: 'Documento oficial de titulación',
      description: 'Manual completo que detalla todo el proceso de titulación del Instituto Privado Celendín, incluyendo modalidades, requisitos y procedimientos.',
      features: [
        'Proceso completo paso a paso explicado',
        'Formatos oficiales y plantillas descargables',
        'Ejemplos de proyectos exitosos',
        'Cronograma detallado actualizado',
        'Normativas y reglamentos vigentes',
        'Contactos de coordinación académica'
      ],
      downloadUrl: '/documents/guia-proceso-titulacion-ipc.pdf',
      fileName: 'guia-proceso-titulacion-ipc-2025.pdf',
      fileSize: '3.2 MB',
      fileType: 'PDF'
    },
    {
      id: 'cronograma-oficial',
      title: 'Cronograma Oficial 2025',
      subtitle: 'Fechas y plazos establecidos',
      description: 'Cronograma oficial con todas las fechas importantes, plazos de entrega y fechas de sustentación para el proceso de titulación 2025.',
      features: [
        'Fechas de inscripción por especialidad',
        'Plazos de entrega de documentos',
        'Calendario de sustentaciones',
        'Fechas de ceremonias de graduación',
        'Períodos vacacionales y feriados',
        'Fechas límite para correcciones'
      ],
      downloadUrl: '/documents/cronograma-oficial-titulacion-2025.pdf',
      fileName: 'cronograma-oficial-2025.pdf',
      fileSize: '2.1 MB',
      fileType: 'PDF'
    }
  ]

  const customGraduatesData = [
    {
      id: 1,
      name: "María Elena Campos",
      career: "Computación e Informática",
      graduationYear: "2020",
      image: "/assets/images/graduates/maria-campos.jpg", // Tu imagen local
      testimonial: "El Instituto Privado Celendín me dio las herramientas técnicas y humanas para destacar como desarrolladora. Hoy trabajo en una empresa líder en tecnología.",
      currentPosition: "Senior Full Stack Developer",
      company: "TechCorp Peru",
      featured: true
    },
    // ... más egresados
  ]

  // NUEVO: Estadísticas personalizadas (opcional)
  const customStats = [
    { number: "12,500+", label: "Egresados titulados" },
    { number: "96%", label: "Empleabilidad inmediata" },
    { number: "18", label: "Años formando profesionales" },
    { number: "150+", label: "Empresas que contratan nuestros egresados" }
  ]

  if (!graduatesSlides || graduatesSlides.length === 0){
    return (
      <div>
        <h1>No hay imágenes para mostrar</h1>
      </div>
    )
  }

  if (!graduatesSlides || graduatesSlides.length === 0){
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
          items={graduatesSlides}
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
        <GraduationProcessSection 
          title="Proceso de Titulación"
          subtitle="Obtén tu título profesional siguiendo nuestro proceso estructurado y con el acompañamiento de nuestro equipo académico especializado."
          processSteps={customProcessSteps}
          documents={customDocuments}
        />

        <GraduatesTestimonialsSection 
          graduatesData = {customGraduatesData}
          stats = {customStats}
        />
      </main>
    </>
  )
}

export { GraduatesPage }