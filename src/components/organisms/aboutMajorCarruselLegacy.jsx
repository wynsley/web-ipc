// AboutMajorCarruselLegacy.jsx
import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./aboutMajorCarruselLegacy.css";
import { AboutMajorPriceCard } from "../molecules/aboutMajorPriceCard";
import { FaBookOpen, FaRoad, FaTrophy, FaLightbulb } from "react-icons/fa";

/* Flechas personalizadas (quedan al pie) */
const PrevArrow = ({ onClick }) => (
  <button type="button" className="Mcarousel__arrow prev" onClick={onClick} aria-label="Anterior">
    ‹
  </button>
);

const NextArrow = ({ onClick }) => (
  <button type="button" className="Mcarousel__arrow next" onClick={onClick} aria-label="Siguiente">
    ›
  </button>
);

const AboutMajorCarruselLegacy = () => {
  const sliderRef = useRef(null);

  const Plans = [
    { icon: FaBookOpen, title:"Historia",    valuesIPC:["Honestidad","Respeto","Perseverancia"] },
    { icon: FaRoad,     title:"Trayectoria", valuesIPC:["Disciplina","Compromiso","Esfuerzo"] },
    { icon: FaTrophy,   title:"Logros",      valuesIPC:["Excelencia","Superación","Trabajo en equipo"] },
    { icon: FaLightbulb,title:"Consejos",    valuesIPC:["Innovación","Constancia","Creatividad"] },
  ];

  const Settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    focusOnSelect: true,
    swipeToSlide: true,
    adaptiveHeight: true,
    responsive: [
      // tablets / medianos: 1 tarjeta centrada y laterales asomadas
      { breakpoint: 768, settings: { slidesToShow: 1, centerMode: true, centerPadding: "22%" } },
      // móviles: que se vea aún más la lateral (mitad)
      { breakpoint: 550, settings: { slidesToShow: 1, centerMode: true, centerPadding: "32%" } },
      // muy pequeños
      { breakpoint: 420, settings: { slidesToShow: 1, centerMode: true, centerPadding: "18%" } },
    ],
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
