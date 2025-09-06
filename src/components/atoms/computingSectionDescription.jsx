import './computingSectionDescription.css'

function ComputingSectionDescription({ children, className = '' }) {
  return (
    <p className={`computing-section-description ${className}`}>
      {children}
    </p>
  )
}

export { ComputingSectionDescription }