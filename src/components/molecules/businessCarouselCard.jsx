import { BusinessCardDescription } from "../atoms/businessCardDescription";
import { BusinessCardTitle } from "../atoms/businessCardTitle";
import { BusinessCarouselIcon } from "../atoms/businessCarouselIcon";
import './businessCarouselCard.css'

function BusinessCarouselCard({id, icon, title, description}) {
  return (
    <div key={id} className="business-area-card">
      <div className="business-area-card__content">
        {/* iconos del area*/}
        <BusinessCarouselIcon icon={icon} />

        {/* contenido de la tarjeta */}
        <div className="business-area-card__info">
          <BusinessCardTitle>{title}</BusinessCardTitle>
          <BusinessCardDescription>{description}</BusinessCardDescription>
        </div>
      </div>
    </div>
  );
}

export { BusinessCarouselCard };
