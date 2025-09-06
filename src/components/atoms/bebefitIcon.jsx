import './benefitIcon.css'

function BenefitIcon({ icon, color = 'var(--anaranjado-fuerte)' }) {
    return (
        <div className="benefit-icon" style={{ '--icon-color': color }}>
            <span className="benefit-icon__symbol">{icon}</span>
        </div>
    )
}

export { BenefitIcon }