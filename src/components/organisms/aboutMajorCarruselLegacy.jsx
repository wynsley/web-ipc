// AboutMajorCarruselLegacy.jsx
import { useState, useEffect, useRef } from "react";
import "./aboutMajorCarruselLegacy.css";
import { AboutMajorPriceCard } from "../molecules/aboutMajorPriceCard";
import { FaBookOpen, FaRoad, FaTrophy, FaLightbulb } from "react-icons/fa";

const AboutMajorCarruselLegacy = () => {
  const [current, setCurrent] = useState(0);
  const [resetTrigger, setResetTrigger] = useState(0); // 👈 para resetear interacciones
  const intervalRef = useRef(null);

  const Plans = [
    { icon: FaBookOpen, title: "Historia", valuesIPC: ["Honestidad", "Respeto", "Perseverancia"] },
    { icon: FaRoad, title: "Trayectoria", valuesIPC: ["Disciplina", "Compromiso", "Esfuerzo"] },
    { icon: FaTrophy, title: "Logros", valuesIPC: ["Excelencia", "Superación", "Trabajo en equipo"] },
    { icon: FaLightbulb, title: "Consejos", valuesIPC: ["Innovación", "Constancia", "Creatividad"] },
  ];

  const startAutoplay = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => {
        const next = prev === Plans.length - 1 ? 0 : prev + 1;
        setResetTrigger((t) => t + 1);
        return next;
      });
    }, 4000); // 👈 autoplay 4s
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
    <section id="plans" className="Mcarousel__wrapper">
      <div className="Mcarousel__container">
        {Plans.map((plan, idx) => {
          let positionClass = "";
          if (idx === current) positionClass = "active";
          else if (idx === (current - 1 + Plans.length) % Plans.length)
            positionClass = "left";
          else if (idx === (current + 1) % Plans.length)
            positionClass = "right";
          else positionClass = "hidden";

          return (
            <div
              key={idx}
              className={`Mcarousel__item ${positionClass}`}
              onMouseEnter={stopAutoplay}
              onMouseLeave={startAutoplay}
              onClick={() => {
                if (idx !== current) {
                  setCurrent(idx);
                  setResetTrigger((t) => t + 1);
                }
              }}
            >
              <AboutMajorPriceCard {...plan} resetTrigger={resetTrigger} />
            </div>
          );
        })}
      </div>

      <div className="Mcarousel__dots">
        {Plans.map((_, idx) => (
          <span
            key={idx}
            className={`Mcarousel__dot ${idx === current ? "active" : ""}`}
            onClick={() => {
              setCurrent(idx);
              setResetTrigger((t) => t + 1);
            }}
          ></span>
        ))}
      </div>
    </section>
  );
};

export { AboutMajorCarruselLegacy };
