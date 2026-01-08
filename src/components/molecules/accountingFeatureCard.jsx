import './accountingFeatureCard.css'

function AccountingFeatureCard({ icon, title, description }) {
  return (
    <div className="accounting-feature-card">
      <div className="accounting-feature-card__icon">
        <span className="accounting-feature-card__symbol">{icon}</span>
      </div>
      <div className="accounting-feature-card__content">
        <h3 className="accounting-feature-card__title">{title}</h3>
        <p className="accounting-feature-card__text">{description}</p>
      </div>
    </div>
  )
}

export { AccountingFeatureCard }