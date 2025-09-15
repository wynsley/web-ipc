import { FaMoneyBillTrendUp, FaUserGroup, FaChartLine, FaArrowUpRightDots } from "react-icons/fa6";
import { FaCog } from "react-icons/fa";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { BusinessCarouselTitle } from "../atoms/businessCarouselTitle";
import { BusinessCarouselSubtitle } from "../atoms/businessCarouselSubtitle";


//import slider from 'react-slick'
import './businessCarousel.css'
import Slider from "react-slick";
import { BusinessCarouselCard } from "../molecules/businessCarouselCard";


function BusinessCarousel(){
  const businessAreasData = [
    {
      id: 1,
      icon: <FaMoneyBillTrendUp />,
      title: 'Gestión Financiera',
      description: 'Análisis financiero, presupuestos, inversiones y control de costos. Manejo de indicadores financieros y toma de deciciones de inversión.'
    },
    {
      id: 2,
      icon: <FaUserGroup />,
      title: 'Recursos Humanos',
      description: 'Gestión del talento humano, nómina, clima laboral y desarrollo organizacional. Estrategias de reclutamiento y retención.'
    },
    {
      id: 3,
      icon: <FaChartLine />,
      title: 'Marketing Digital',
      description: 'Estrategias de marketing online, redes sociales, CRM y análisis de mercado. Campañas digitales y growth marketing.'
    },
    {
      id: 4,
      icon: <FaCog />,
      title: 'Operaciones',
      description: 'Optimización de procesos, logística, cadena de suministro y gestión de calidad. Mejora continua y eficiencia operativa.'
    },
    {
      id: 5,
      icon: <FaArrowUpRightDots />,
      title: 'Emprendimiento e Innovación',
      description: 'Desarrollo de startups, modelos de negocio, innovación y liderazgo empresarial.'
    }
    
  ]

  //configración de react slick
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay : true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
    prevArrow: <BusinessPrevArrow />,
    nextArrow: <BusinessNextArrow />,
    dotsClass: 'business-carousel__dots',
    responsive:[
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

  return(
    <section className="business-carousel">
      <div className="business-carousel__container">


        <div className="business-carousel__header">
          <BusinessCarouselTitle />
          <BusinessCarouselSubtitle />
        </div>

        <div className="business-carousel__slider">
          <Slider {...sliderSettings}>
            {
              businessAreasData.map((area) => (
                <BusinessCarouselCard 
                  key={area.id}
                  id={area.id}
                  icon={area.icon}
                  title={area.title}
                  description={area.description}
                />
              ))
            }
          </Slider>
        </div>

      </div>
    </section>
  )
}

function BusinessPrevArrow({ onClick }){
  return(
    <button
      className="business-carousel__arrow business-carousel__arrow--prev"
      onClick={onClick}
      aria-label="Anterior"
    >
      <GrFormPrevious className="business-carousel__arrow-icon"/>
    </button>
  )
}

function BusinessNextArrow({ onClick }) {
  return(
    <button
      className="business-carousel__arrow business-carousel__arrow--next"
      onClick={onClick}
      aria-label="Siguiente"
    >
      <GrFormNext />
    </button>
  )
}

export { BusinessCarousel }