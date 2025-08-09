import './admisionRequirements.css'
import { FaPenFancy } from "react-icons/fa";

import ImgAdmission from "../../assets/img/admisionR.jpg"

 function AdmissionRequirements() {

  const requisitos = [
    "Ficha de inscripción.",
    "Fotocopia de DNI.",
    "Constancia de pago de los derechos de admisión.",
    "Certificado de estudios de la institución (original)."
  ];

  return (
    <section className="admission-section">
      <h2 className="admission-title">
        Si ya terminas el colegio, estos son los requisitos que debes cumplir <br />
        para rendir tu examen de admisión
      </h2>

      <div className="admission-content">
        <div className="admission-image">
          <img className='admision__img'
            src={ImgAdmission} 
            alt="Admisión"
          />
        </div>

        <ul className="admission-list">
          {requisitos.map((req, index) => (
            <li key={index}>
              <FaPenFancy className="admission-icon" />
              {req}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export {AdmissionRequirements}