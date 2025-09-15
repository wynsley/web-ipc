import './businessFloatingItem.css'

function BusinessFloatingItem({ text, position, delay = 0 }) {
  const positionClass = `business-floating-item--${position}`
  
  return (
    <div 
      className={`business-floating-item ${positionClass}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <span>{text}</span>
    </div>
  )
}

export { BusinessFloatingItem }