import './computingSectionTitle.css'

function ComputingSectionTitle({ children, className = '' }) {
  return (
    <h3 className={`computing-section-title ${className}`}>
      {children}
    </h3>
  )
}

export { ComputingSectionTitle }