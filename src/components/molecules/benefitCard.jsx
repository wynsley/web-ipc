import './benefitCard.css'
import { BenefitIcon } from '../atoms/bebefitIcon'

function BenefitCard({ icon, title, description, highlighted = false }) {
    return (
        <div className={`benefit-card ${highlighted ? 'benefit-card--highlighted' : ''}`}>
            <BenefitIcon icon={icon} />

        <div className="benefit-card__content">
            <h3 className="benefit-card__title">{title}</h3>
            <p className="benefit-card__description">{description}</p>
        </div>
        
        {highlighted && (
            <div className="benefit-card__badge">
            <span>🌟 Popular</span>
            </div>
        )}
        </div>
    ) 
}

export { BenefitCard }