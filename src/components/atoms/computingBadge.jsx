import './computingBadge.css'

function ComputingBadge({ text, className = '' }) {
  return (
    <div className={`computing-badge ${className}`}>
      <span className="computing-badge__text">{text}</span>
    </div>
  )
}

export { ComputingBadge }