import './businessStudyGrid.css'
import { BusinessSemesterCard } from './businessSemesterCard'

function BusinessStudyGrid({ semestersData, className = '' }) {
  return (
    <div className={`business-study-grid ${className}`}>
      {semestersData.map((semester, index) => (
        <BusinessSemesterCard
          key={index}
          semesterTitle={semester.semester}
          courses={semester.courses}
        />
      ))}
    </div>
  )
}

export { BusinessStudyGrid }