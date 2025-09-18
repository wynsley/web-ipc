import './businessSemesterCard.css'
import { BusinessSemesterTitle } from '../atoms/businessSemesterTitle'
import { BusinessCourseItem } from '../atoms/businessCourseItem'

function BusinessSemesterCard({ semesterTitle, courses, className = '' }) {
  return (
    <div className={`business-semester-card ${className}`}>
      <BusinessSemesterTitle>{semesterTitle}</BusinessSemesterTitle>
      
      <ul className="business-semester-card__courses">
        {courses.map((course, index) => (
          <BusinessCourseItem key={index}>
            {course}
          </BusinessCourseItem>
        ))}
      </ul>
    </div>
  )
}

export { BusinessSemesterCard }