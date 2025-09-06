import './computingSectionCard.css'
import { ComputingSectionIcon } from '../atoms/computingSectionIcon'
import { ComputingSectionTitle } from '../atoms/computingSectionTitle'
import { ComputingSectionDescription } from '../atoms/computingSectionDescription'

function ComputingSectionCard({ icon, title, description, className = '' }) {
  return (
    <div className={`computing-section-card ${className}`}>
      <ComputingSectionIcon icon={icon} />

      <div className="computing-section-card__content">
        <ComputingSectionTitle>{title}</ComputingSectionTitle>
        <ComputingSectionDescription>{description}</ComputingSectionDescription>
      </div>

      <div className="computing-section-card__footer"></div>
    </div>
  )
}

export { ComputingSectionCard }