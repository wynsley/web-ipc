// src/components/organisms/PrincipiosSection.jsx
import React from "react";
import './aboutUsBeginning.css'
import { FaLightbulb, FaBalanceScale, FaAward,FaUsers  } from "react-icons/fa";
import { AboutCardBeginning } from "../molecules/aboutUsCardBeginnin";


const AboutUsBeginning= () => {
const steps = [
    {
      icon: FaLightbulb,
      color: "#0aabb4ff",
      title: "Innovación",
      description:
        "Buscamos nuevas ideas y métodos para mejorar constantemente.",
    },
    {
      icon: FaBalanceScale,
      color:"#e4e013ff",
      title: "Responsabilidad",
      description:
        "Cumplimos nuestros compromisos con integridad y transparencia.",
    },
    {
      icon: FaAward,
      color: "#a50a93ff",
      title: "Excelencia",
      description:
        "Nos esforzamos por alcanzar los más altos estándares de calidad.",
    },
    {
      icon: FaUsers,
      color: "#12cb16ff",
      title: "Colaboración",
      description:
        "Trabajamos unidos para alcanzar metas y potenciar el talento.",
    },
  ];

  const Title = 'Principios Institucionales'
  const Subtitle = 'Funamentos que guían nuestro actuar como Instituto'

  return (
    <section className="section-major">
      <h2 className="major__title">{Title}</h2>
      <p className="major__subtitle">
        {Subtitle}
      </p>

      <div className="steps-wrapper steps-wrapper--desktop" aria-hidden="false">
        {steps.map((s) => (
          <React.Fragment key={s.title}>
            <AboutCardBeginning {...s} />
           </React.Fragment>
        ))}
      </div>
      
    </section>
  );
};

export {AboutUsBeginning}
