import './businessCourseItem.css'

function BusinessCourseItem({ children, className = '' }) {
  return (
    <li className={`business-course-item ${className}`}>
      <span className="business-course-item__bullet"></span>
      <span className="business-course-item__text">{children}</span>
    </li>
  )
}

export { BusinessCourseItem }