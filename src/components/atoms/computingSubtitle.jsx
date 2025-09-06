import './computingSubtitle.css'

function ComputingSubtitle({ children, className = '' }) {
  return (
    <p className={`computing-subtitle ${className}`}>
      {children}
    </p>
  )
}

export { ComputingSubtitle }