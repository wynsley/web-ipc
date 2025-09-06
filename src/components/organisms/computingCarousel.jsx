import Slider from 'react-slick'
import './computingCarousel.css'
import { ComputingSectionCard } from '../molecules/computingSectionCard'
// Importar los estilos CSS de slick-carousel
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

function ComputingCarousel() {
  // Datos de las secciones del instituto
  const sectionsData = [
    {
      id: 1,
      icon: "🔧",
      title: "Soporte Técnico",
      description: "Asistencia especializada en hardware y software, resolución de incidencias técnicas y mantenimiento preventivo de equipos."
    },
    {
      id: 2,
      icon: "🌐",
      title: "Redes",
      description: "Configuración, administración y mantenimiento de redes de comunicación. Implementación de seguridad y protocolos avanzados."
    },
    {
      id: 3,
      icon: "💻",
      title: "Desarrollo Web",
      description: "Creación de sitios web y aplicaciones modernas, responsivas y seguras utilizando las últimas tecnologías del mercado."
    },
    {
      id: 4,
      icon: "🎨",
      title: "Diseño Gráfico",
      description: "Creatividad y diseño visual aplicado a proyectos educativos y empresariales con herramientas profesionales de la industria."
    }
  ]

  // Configuración de react-slick
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
    prevArrow: <ComputingPrevArrow />,
    nextArrow: <ComputingNextArrow />,
    dotsClass: "computing-carousel__dots",
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }
    ]
  }

  return (
    <section className="computing-carousel">
      <div className="computing-carousel__container">
        
        {/* Título de la sección */}
        <div className="computing-carousel__header">
          <h2 className="computing-carousel__title">
            Áreas de <span className="computing-carousel__title--highlight">Especialización</span>
          </h2>
          <p className="computing-carousel__subtitle">
            Domina las competencias más demandadas en la industria tecnológica actual
          </p>
        </div>

        {/* Carrusel de secciones */}
        <div className="computing-carousel__slider">
          <Slider {...sliderSettings}>
            {sectionsData.map((section) => (
              <ComputingSectionCard
                key={section.id}
                icon={section.icon}
                title={section.title}
                description={section.description}
              />
            ))}
          </Slider>
        </div>

      </div>
    </section>
  )
}

// Componentes de flechas personalizadas
function ComputingPrevArrow({ onClick }) {
  return (
    <button
      className="computing-carousel__arrow computing-carousel__arrow--prev"
      onClick={onClick}
      aria-label="Anterior"
    >
      <span className="computing-carousel__arrow-icon">❮</span>
    </button>
  )
}

function ComputingNextArrow({ onClick }) {
  return (
    <button
      className="computing-carousel__arrow computing-carousel__arrow--next"
      onClick={onClick}
      aria-label="Siguiente"
    >
      <span className="computing-carousel__arrow-icon">❯</span>
    </button>
  )
}

export { ComputingCarousel }