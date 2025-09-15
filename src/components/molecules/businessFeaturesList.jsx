import './businessFeaturesList.css'
import { BusinessFeatureCard } from './businessFeatureCard'

function BusinessFeaturesList({ features }) {
  return (
    <div className="business-features-list">
      {features.map((feature, index) => (
        <BusinessFeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  )
}

export { BusinessFeaturesList }