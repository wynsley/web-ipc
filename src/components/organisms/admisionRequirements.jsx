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
    <section className="section--admision">
      <h2 className="title__requerimients">
        Si ya terminas el colegio, estos son los requisitos que debes cumplir <br />
        para rendir tu examen de admisión
      </h2>

      <div className="admission__content">
        
          <img className='admision__img'
            src={ImgAdmission} 
            alt="Admisión"
          />
        

        <ul className="admission__list">
          {requisitos.map((req, index) => (
            <li className='requeriment_item' key={index}>
              <FaPenFancy className="admission__icon" />
              {req}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export {AdmissionRequirements}