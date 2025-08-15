// src/components/organisms/PrincipiosSection.jsx
import React from "react";
import './aboutUsBeginning.css'
import { AboutCardBeginning } from "../molecules/aboutUsCardBeginnin";
import { FaLightbulb, FaBalanceScale, FaAward, FaUsers } from "react-icons/fa";

const AboutUsBeginning= () => {
  const data = [
    {
      icon: <FaLightbulb size={50} color="#3DBE29" />,
      title: "Innovación",
      paragraph:
        "Buscamos soluciones creativas y modernas para mejorar la educación y el desarrollo institucional."
    },
    {
      icon: <FaBalanceScale size={50} color="#FF9800" />,
      title: "Responsabilidad",
      paragraph:
        "Cumplimos con nuestros compromisos con ética, transparencia y sentido de comunidad."
    },
    {
      icon: <FaAward size={50} color="#3F51B5" />,
      title: "Excelencia",
      paragraph:
        "Aspiramos a los más altos estándares de calidad en todos nuestros procesos y servicios."
    },
    {
      icon: <FaUsers size={50} color="#E91E63" />,
      title: "Colaboración",
      paragraph:
        "Trabajamos unidos para alcanzar objetivos comunes y potenciar el talento colectivo."
    }
  ];

  return (
    <section className="principios-section">
      <div className="section-header">
        <h2>Valores Institucionales</h2>
        <p>Fundamentos que guían nuestro actuar como instituto</p>
      </div>

      <div className="cards-container">
        {data.map((item, i) => (
          <AboutCardBeginning
            key={i}
            icon={item.icon}
            title={item.title}
            paragraph={item.paragraph}
          />
        ))}
        {/* Curva SVG */}
        <svg className="curve-line" xmlns="http://www.w3.org/2000/svg">
          <path d="M 90 40 C 200 150, 350 -70, 500 40" stroke="#ccc" strokeWidth="3" fill="transparent" />
          <path d="M 500 40 C 650 150, 800 -70, 950 40" stroke="#ccc" strokeWidth="3" fill="transparent" />
          <path d="M 950 40 C 1100 150, 1250 -70, 1400 40" stroke="#ccc" strokeWidth="3" fill="transparent" />
        </svg>
      </div>
    </section>
  );
};

export {AboutUsBeginning}
