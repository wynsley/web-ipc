import './accountingFloatingItem.css'

function AccountingFloatingItem({ text, position, delay = 0 }) {
  const positionClass = `accounting-floating-item--${position}`
  
  return (
    <div 
      className={`accounting-floating-item ${positionClass}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <span>{text}</span>
    </div>
  )
}

export { AccountingFloatingItem }