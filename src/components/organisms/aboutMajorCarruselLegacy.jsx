// AboutMajorCarruselLegacy.jsx
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './aboutMajorCarruselLegacy.css';
import { AboutMajorPriceCard } from '../molecules/aboutMajorPriceCard';
import { FaBookOpen, FaRoad, FaTrophy, FaLightbulb } from "react-icons/fa";

const AboutMajorCarruselLegacy = () => {
    const Plans = [
        { icon: FaBookOpen, title:'Historia', valuesIPC :['Honestidad', 'Respeto','Perseverancia'] },
        { icon: FaRoad, title:'Trayectoria', valuesIPC :['Honestidad', 'Respeto','Perseverancia'] },
        { icon: FaTrophy, title:'Logros', valuesIPC :['Honestidad', 'Respeto','Perseverancia'] },
        { icon: FaLightbulb, title:'Consejos', valuesIPC :['Honestidad', 'Respeto','Perseverancia'] },
    ];

    let sliderRef = null;

    const Settings = {
        centerMode: true,       // centra la tarjeta activa
        slidesToShow: 3,        // 3 tarjetas visibles
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 4000,
        infinite: true,
        focusOnSelect: true,
    };

    return (
        <section id="plans" className="major-carousel">
            <Slider {...Settings} ref={slider => sliderRef = slider} className="Mcarousel__container">
                {Plans.map((d, s) => (
                    <div 
                        key={s} 
                        onClick={() => sliderRef && sliderRef.slickPause()} // Pausa autoplay al tocar la tarjeta
                    >
                        <AboutMajorPriceCard {...d} />
                    </div>
                ))}
            </Slider>
        </section>
    );
};

export { AboutMajorCarruselLegacy };
