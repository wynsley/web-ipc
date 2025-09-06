import './computingFeatureCard.css'

function ComputingFeatureCard({ icon, title, description }) {
  return (
    <div className="computing-feature-card">
      <div className="computing-feature-card__icon">
        <span className="computing-feature-card__symbol">{icon}</span>
      </div>
      <div className="computing-feature-card__content">
        <h3 className="computing-feature-card__title">{title}</h3>
        <p className="computing-feature-card__text">{description}</p>
      </div>
    </div>
  )
}

export { ComputingFeatureCard }