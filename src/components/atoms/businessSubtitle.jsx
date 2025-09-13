import './businessSubtitle.css'

function BusinessSubtitle({ children, className = '' }) {
  return (
    <p className={`business-subtitle ${className}`}>
      {children}
    </p>
  )
}

export { BusinessSubtitle }