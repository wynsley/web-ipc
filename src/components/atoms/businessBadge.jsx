import './businessBadge.css'

function BusinessBadge({ text, className = '' }) {
  return (
    <div className={`business-badge ${className}`}>
      <span className="business-badge__text">{text}</span>
    </div>
  )
}

export { BusinessBadge }