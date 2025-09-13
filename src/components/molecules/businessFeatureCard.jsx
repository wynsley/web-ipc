import './businessFeatureCard.css'

function BusinessFeatureCard({ icon, title, description }) {
  return (
    <div className="business-feature-card">
      <div className="business-feature-card__icon">
        <span className="business-feature-card__symbol">{icon}</span>
      </div>
      <div className="business-feature-card__content">
        <h3 className="business-feature-card__title">{title}</h3>
        <p className="business-feature-card__text">{description}</p>
      </div>
    </div>
  )
}

export { BusinessFeatureCard }