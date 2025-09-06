import './computingFloatingItem.css'

function ComputingFloatingItem({ text, position, delay = 0 }) {
  const positionClass = `computing-floating-item--${position}`
  
  return (
    <div 
      className={`computing-floating-item ${positionClass}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <span>{text}</span>
    </div>
  )
}

export { ComputingFloatingItem }