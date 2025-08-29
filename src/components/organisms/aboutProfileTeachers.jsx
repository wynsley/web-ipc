import React, { useState, useEffect ,useRef } from "react";
import "./aboutProfileTeachers.css";
import { AboutProfileCard } from "../molecules/aboutProfileCard";

const professors = [
  {
    name: "Emilly Cabos",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    speciality: "Ing. Sistemas",
    experience: "3 años",
    post: "Cargo que ocupa",
    phrase: "La disciplina supera al talento y la constancia vence cualquier obstáculo.",
    stats: [{ label: "Áreas de enseñanza", value:'Computación , Administración, Contabilidad, Traducción'}, 
            { label: "Asignaturas" , value:'Programacion, Investigación, Negocios' }],
  },
  {
    name: "Miguel Aliga",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    speciality: "Ing. Sistemas",
    post: "Cargo que ocupa",
    experience: "5 años",
    phrase: "El conocimiento abre caminos y cada día es una oportunidad para aprender",
    stats: [{ label: "Áreas de enseñanza", value:'Computación , Administración, Contabilidad, Traducción'}, 
            { label: "Asignaturas" , value:'Programacion, Investigación, Negocios' }],
  },
  {
    name: "Rosa Diaz",
    img: "https://randomuser.me/api/portraits/women/21.jpg",
    speciality: "Comunicación",
    experience: "3 años",
    post: "Cargo que ocupa",
    phrase: "Educar es sembrar futuro y el conocimiento es la mejor herencia.",
    stats: [{ label: "Áreas de enseñanza", value:'Computación , Administración, Contabilidad, Traducción'}, 
            { label: "Asignaturas" , value:'Programacion, Investigación, Negocios' }],
  },
  {
    name: "Ulices Torres",
    img: "https://randomuser.me/api/portraits/men/28.jpg",
    speciality: "Administración",
    post: "Sub Director",
    experience: "3 años",
    phrase: "Aprender nunca es en vano porque todo saber suma a tu crecimiento.",
    stats: [{ label: "Áreas de enseñanza", value:'Computación , Administración, Contabilidad, Traducción'}, 
            { label: "Asignaturas" , value:'Programacion, Investigación, Negocios' }],
  },
  {
    name: "Eunice Flores",
    img: "https://randomuser.me/api/portraits/women/37.jpg",
    speciality: "Maestra Inglés",
    experience: "3 años",
    post: "Cargo que ocupa",
    phrase: "Innovar es transformar vidas y la creatividad mueve al mundo.",
    stats: [{ label: "Áreas de enseñanza", value:'Computación , Administración, Contabilidad, Traducción'}, 
            { label: "Asignaturas" , value:'Programacion, Investigación, Negocios' }],
  },
  {
    name: "Carlos Medina",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
    speciality: "Ing. Sistemas",
    experience: "3 años",
    post: "Cargo que ocupa",
    phrase: "La pasión enseña mejor que las palabras y el entusiasmo es contagioso.",
    stats: [{ label: "Áreas de enseñanza", value:'Computación , Administración, Contabilidad, Traducción'}, 
            { label: "Asignaturas" , value:'Programacion, Investigación, Negocios' }],
  },
  {
    name: "Lucía Herrera",
    img: "https://randomuser.me/api/portraits/women/26.jpg",
    speciality: "Ing. Sistemas",
    post: "Cargo que ocupa",
    experience: "3 años",
    phrase: "Un buen maestro inspira siempre y su enseñanza deja huella eterna.",
    stats: [{ label: "Áreas de enseñanza", value:'Computación , Administración, Contabilidad, Traducción'}, 
            { label: "Asignaturas" , value:'Programacion, Investigación, Negocios' }],
  },
  {
    name: "Javier Ramos",
    img: "https://randomuser.me/api/portraits/men/41.jpg",
    speciality: "Ing. Sistemas",
    experience: "3 años",
    post: "Cargo que ocupa",
    phrase: "El esfuerzo de hoy es el éxito de mañana, la perseverancia es la clave.",
    stats: [{ label: "Áreas de enseñanza", value:'Computación , Administración, Contabilidad, Traducción'}, 
            { label: "Asignaturas" , value:'Programacion, Investigación, Negocios' }],
  },
];

const AboutProfileCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [resetTrigger, setResetTrigger] = useState(0); // 👈 estado para resetear desplegables
  const intervalRef = useRef(null);

  const startAutoplay = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => {
        const next = prev === professors.length - 1 ? 0 : prev + 1;
        setResetTrigger((t) => t + 1); // 👈 cada cambio dispara reset
        return next;
      });
    }, 5000);
  };

  const stopAutoplay = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  return (
    <div className="teachers-carousel">
      <div className="cards-profile__container">
        {professors.map((prof, idx) => {
          let positionClass = "";
          if (idx === current) positionClass = "active";
          else if (idx === (current - 1 + professors.length) % professors.length)
            positionClass = "left";
          else if (idx === (current + 1) % professors.length)
            positionClass = "right";
          else positionClass = "hidden";

          return (
            <div
              key={idx}
              onMouseEnter={stopAutoplay}
              onMouseLeave={startAutoplay}
              className={`profile-card__wrapper ${positionClass}`}
              onClick={() => {
                if (idx !== current) {
                  setCurrent(idx);
                  setResetTrigger((t) => t + 1); // 👈 reset al cambiar con click
                }
              }}
            >
              <AboutProfileCard {...prof} resetTrigger={resetTrigger} />
            </div>
          );
        })}
      </div>

      <div className="carouselP-dots">
        {professors.map((_, idx) => (
          <span
            key={idx}
            className={`carouselP-dot ${idx === current ? "active" : ""}`}
            onClick={() => {
              setCurrent(idx);
              setResetTrigger((t) => t + 1); // 👈 reset al cambiar con dot
            }}
          ></span>
        ))}
      </div>
    </div>
  );
};

export { AboutProfileCarousel };