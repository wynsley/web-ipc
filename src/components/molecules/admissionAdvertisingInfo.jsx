import './admissionAdvertisingInfo.css'
import { AdvertisingTitle } from '../atoms/admissionAdvertisingTitle'
import { AdvertisingButton } from '../atoms/admissionAdvertisingButton';

const AdvertisingInfoCard = ({ title, items, inscriptionText, examentext }) => {
  return (
    <div className="AdveInfo-card">
        {/* Título principal */}
        <div className="adveinfo__header">
          <AdvertisingTitle level={3} className="adveinfo__Title">
            {title}
          </AdvertisingTitle>
          <div className="adveinfo__line"></div>
        </div>

        {/* Subtítulo a la derecha */}
        <div className="adveinfo__subheader">
          <AdvertisingTitle level={3} className="adveinfo__subtitle">
            ¡Postula ya!
          </AdvertisingTitle>
          <div className="adveinfo__line-right"></div>
        </div>

        {/* Lista de items */}
        <ul className="adveinfo-list">
          {items.map((item, index) => (
            <li key={index} className="advelist__item">
              {item}
            </li>
          ))}
        </ul>

        {/* Inscripciones y examen destacados */}
        <div>
          <div>
            <p className="adveInfo__inscriptions">{inscriptionText}</p> 
            <p className="adveInfo__examen">{examentext}</p> 
          </div>
        </div>

        {/* Registro */}
        <div className="adve__register">
          <AdvertisingTitle className="adveR__title" level={3}>
            Inscríbete y registra tus datos
          </AdvertisingTitle>
          <AdvertisingButton
            text="Aquí"
            variant="secondary"
            href='#admisionForm'
          />
        </div>
    </div>
  );
};

export { AdvertisingInfoCard };
