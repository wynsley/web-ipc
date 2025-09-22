import './accountingBenefitCard.css'

function AccountingBenefitCard({ icon, title, description, highlighted = false }) {
  const cardClass = highlighted 
    ? 'accounting-benefit-card accounting-benefit-card--highlighted'
    : 'accounting-benefit-card'

  return (
    <div className={cardClass}>
      <span className="accounting-benefit-card__icon">{icon}</span>
      <h3 className="accounting-benefit-card__title">{title}</h3>
      <p className="accounting-benefit-card__description">{description}</p>
    </div>
  )
}

export { AccountingBenefitCard }