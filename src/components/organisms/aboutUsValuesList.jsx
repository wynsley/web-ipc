import './aboutUsValuesList.css'
import React from "react";
import { ValueCard } from '../molecules/aboutUsValues';
import { FaHandshake, FaPeopleCarry } from "react-icons/fa";
import { MdOutlineTaskAlt } from "react-icons/md";
import { GiHeartInside } from "react-icons/gi";

const AboutUsValuesList=() =>{
const Title= 'VALORES'
const values = [
  {
    icon: FaHandshake,
    title: "Respeto",
    description: "Valoramos las diferencias y promovemos la cordialidad.",
    color: "linear-gradient(135deg,#6a11cb,#2575fc)",
  },
  {
    icon: MdOutlineTaskAlt,
    title: "Responsabilidad",
    description: "Cumplimos compromisos y asumimos consecuencias.",
    color: "linear-gradient(135deg,#ff512f,#dd2476)",
  },
  {
    icon: GiHeartInside,
    title: "Honestidad",
    description: "Actuamos con transparencia y rectitud.",
    color: "linear-gradient(135deg,#11998e,#38ef7d)",
  },
  {
    icon: FaPeopleCarry,
    title: "Trabajo en equipo",
    description: "Colaboramos para alcanzar objetivos comunes.",
    color: "linear-gradient(135deg,#f7971e,#ffd200)",
  },
];


    return (
      <section className="aboutUs-section">
        <h2 className="sectioAbout__title">{Title}</h2>
        <div className="sectuionAboutUs__cards">
          {values.map((v, i) => (
            <div className={`aboutUscard-wrapper card-${i + 1}`} key={i}>
              <ValueCard {...v} />
            </div>
          ))}
        </div>
      </section>
    );
}

export {AboutUsValuesList}
