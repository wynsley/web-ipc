import './accountingBadge.css'

function AccountingBadge({ text, className = '' }) {
  return (
    <div className={`accounting-badge ${className}`}>
      <span className="accounting-badge__text">{text}</span>
    </div>
  )
}

export { AccountingBadge }