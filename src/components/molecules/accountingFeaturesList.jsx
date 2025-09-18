import './accountingFeaturesList.css'
import { AccountingFeatureCard } from './accountingFeatureCard'

function AccountingFeaturesList({ features }) {
  return (
    <div className="accounting-features-list">
      {features.map((feature, index) => (
        <AccountingFeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  )
}

export { AccountingFeaturesList }