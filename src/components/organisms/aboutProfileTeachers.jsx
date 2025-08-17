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
    contact: "contacto@gmail.com",
    stats: [{ label: "Áreas de enseñanza", value:'Computación , Administración, Contabilidad, Traducción'}, 
            { label: "Asignaturas" , value:'Programacion, Investigación, Negocios' }],
  },
  {
    name: "Miguel Aliga",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    speciality: "Ing. Sistemas",
    post: "Cargo que ocupa",
    experience: "5 años",
    contact: "contacto@gmail.com",
    stats: [{ label: "Áreas de enseñanza", value:'Computación , Administración, Contabilidad, Traducción'}, 
            { label: "Asignaturas" , value:'Programacion, Investigación, Negocios' }],
  },
  {
    name: "Rosa Diaz",
    img: "https://randomuser.me/api/portraits/women/21.jpg",
    speciality: "Comunicación",
    experience: "3 años",
    post: "Cargo que ocupa",
    contact: "contacto@gmail.com",
    stats: [{ label: "Áreas de enseñanza", value:'Computación , Administración, Contabilidad, Traducción'}, 
            { label: "Asignaturas" , value:'Programacion, Investigación, Negocios' }],
  },
  {
    name: "Ulices Torres",
    img: "https://randomuser.me/api/portraits/men/28.jpg",
    speciality: "Administración",
    post: "Sub Director",
    experience: "3 años",
    contact: "contacto@gmail.com",
    stats: [{ label: "Áreas de enseñanza", value:'Computación , Administración, Contabilidad, Traducción'}, 
            { label: "Asignaturas" , value:'Programacion, Investigación, Negocios' }],
  },
  {
    name: "Eunice Flores",
    img: "https://randomuser.me/api/portraits/women/37.jpg",
    speciality: "Maestra Inglés",
    experience: "3 años",
    post: "Cargo que ocupa",
    contact: "contacto@gmail.com",
    stats: [{ label: "Áreas de enseñanza", value:'Computación , Administración, Contabilidad, Traducción'}, 
            { label: "Asignaturas" , value:'Programacion, Investigación, Negocios' }],
  },
  {
    name: "Carlos Medina",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
    speciality: "Ing. Sistemas",
    experience: "3 años",
    post: "Cargo que ocupa",
    contact: "contacto@gmail.com",
    stats: [{ label: "Áreas de enseñanza", value:'Computación , Administración, Contabilidad, Traducción'}, 
            { label: "Asignaturas" , value:'Programacion, Investigación, Negocios' }],
  },
  {
    name: "Lucía Herrera",
    img: "https://randomuser.me/api/portraits/women/26.jpg",
    speciality: "Ing. Sistemas",
    post: "Cargo que ocupa",
    experience: "3 años",
    contact: "contacto@gmail.com",
    stats: [{ label: "Áreas de enseñanza", value:'Computación , Administración, Contabilidad, Traducción'}, 
            { label: "Asignaturas" , value:'Programacion, Investigación, Negocios' }],
  },
  {
    name: "Javier Ramos",
    img: "https://randomuser.me/api/portraits/men/41.jpg",
    speciality: "Ing. Sistemas",
    experience: "3 años",
    post: "Cargo que ocupa",
    contact: "contacto@gmail.com",
    stats: [{ label: "Áreas de enseñanza", value:'Computación , Administración, Contabilidad, Traducción'}, 
            { label: "Asignaturas" , value:'Programacion, Investigación, Negocios' }],
  },
];

const AboutProfileCarousel = () => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);
  const startAutoplay = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev === professors.length - 1 ? 0 : prev + 1));
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
    <div
      className="teachers-carousel"
    >
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
              onMouseEnter={stopAutoplay}  // pausa al poner el mouse
              onMouseLeave={startAutoplay}
              className={`profile-card__wrapper ${positionClass}`}
              onClick={() => {
                if (idx === current) return; // no hacer nada si es la activa
                else if (idx > current) setCurrent(idx);
                else if (idx < current) setCurrent(idx);
              }}
            >
              <AboutProfileCard {...prof} />
            </div>
          );
        })}
      </div>

      <div className="carousel-dots">
        {professors.map((_, idx) => (
          <span
            key={idx}
            className={`carousel-dot ${idx === current ? "active" : ""}`}
            onClick={() => setCurrent(idx)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export { AboutProfileCarousel };