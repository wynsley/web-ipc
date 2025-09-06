import './computingFeaturesList.css'
import { ComputingFeatureCard } from './computingFeatureCard'

function ComputingFeaturesList({ features }) {
  return (
    <div className="computing-features-list">
      {features.map((feature, index) => (
        <ComputingFeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  )
}

export { ComputingFeaturesList }