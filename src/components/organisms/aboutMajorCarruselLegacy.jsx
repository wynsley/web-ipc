// AboutMajorCarruselLegacy.jsx
import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './aboutMajorCarruselLegacy.css';
import { AboutMajorPriceCard } from '../molecules/aboutMajorPriceCard';
import { FaBookOpen, FaRoad, FaTrophy, FaLightbulb } from "react-icons/fa";

const AboutMajorCarruselLegacy = () => {
  const sliderRef = useRef(null);

  const Plans = [
    { icon: FaBookOpen, title:'Historia', valuesIPC :['Honestidad', 'Respeto','Perseverancia'] },
    { icon: FaRoad, title:'Trayectoria', valuesIPC :['Disciplina', 'Compromiso','Esfuerzo'] },
    { icon: FaTrophy, title:'Logros', valuesIPC :['Excelencia', 'Superación','Trabajo en equipo'] },
    { icon: FaLightbulb, title:'Consejos', valuesIPC :['Innovación', 'Constancia','Creatividad'] },
  ];

  const Settings = {
    centerMode: true,
    centerPadding: "0px", // elimina espacios a los lados
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    infinite: true,
    focusOnSelect: true,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2, centerMode: true } },
      { breakpoint: 480, settings: { slidesToShow: 1, centerMode: true } },
    ]
  };

  return (
    <section id="plans" className="Mcarousel__wrapper">
      <Slider 
        {...Settings} 
        ref={sliderRef} 
        className="Mcarousel__container"
      >
        {Plans.map((d, s) => (
          <div 
            key={s}
            className="Mcarousel__item"
            onClick={() => sliderRef.current?.slickPause()}
            onMouseEnter={() => sliderRef.current?.slickPause()}
            onMouseLeave={() => sliderRef.current?.slickPlay()}
          >
            <AboutMajorPriceCard {...d} />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export { AboutMajorCarruselLegacy };
