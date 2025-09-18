import './businessSemesterTitle.css'

function BusinessSemesterTitle({ children, className = '' }) {
  return (
    <h3 className={`business-semester-title ${className}`}>
      {children}
    </h3>
  )
}

export { BusinessSemesterTitle }