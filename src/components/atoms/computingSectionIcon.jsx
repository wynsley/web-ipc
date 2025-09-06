import './computingSectionIcon.css'

function ComputingSectionIcon({ icon, className = '' }) {
  return (
    <div className={`computing-section-icon ${className}`}>
      <div className="computing-section-icon__wrapper">
        {icon}
      </div>
    </div>
  )
}

export { ComputingSectionIcon }