import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './aboutMajorCarruselLegacy.css'
import { AboutMajorPriceCard } from '../molecules/aboutMajorPriceCard'
import { FaBookOpen, FaRoad, FaTrophy, FaLightbulb } from "react-icons/fa";

const AboutMajorCarruselLegacy= () => {

    const Plans = [
        {
            icon: FaBookOpen,
            title:'Historia',
            valuesIPC :['Honestidad', 'Respeto','Perseverancia']
        },
        {
            icon: FaRoad,
            title:'Trayectoria',
            valuesIPC :['Honestidad', 'Respeto','Perseverancia']
        },
        {
            icon: FaTrophy,
            title:'Logros',
            valuesIPC :['Honestidad', 'Respeto','Perseverancia']
        },
        {
            icon: FaLightbulb,
            title:'Consejos',
            valuesIPC :['Honestidad', 'Respeto','Perseverancia']
        },
    ]

    const Settings = {
    rows: 1,
    slidesToShow: window.innerWidth < 700 ? 1 : 3,
    arrows: true,
    prevArrow: <img src="https://raw.githubusercontent.com/rnas/frontend-test/master/assets/caret_left.png" alt="prev" className="slick-prev" />,
    nextArrow: <img src="https://raw.githubusercontent.com/rnas/frontend-test/master/assets/caret_right.png" alt="next" className="slick-next" />,
  };
     return(
        <section id="plans" className="major-carousel">
            <Slider {...Settings} className="Mcarousel__container">
                {
                    Plans.map ((d, s)=>{
                        return (
                            <AboutMajorPriceCard key={s} {...d} onClick={()=> alert (`Selected ${d.title}`)}/>
                        )
                    })
                }
            </Slider>
        </section>
     )
}

export {AboutMajorCarruselLegacy}