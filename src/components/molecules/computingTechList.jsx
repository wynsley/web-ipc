import './computingTechList.css'
import { ComputingTechItem } from '../atoms/computingTechItem'

function ComputingTechList({ label, technologies }) {
  return (
    <div className="computing-tech-list">
      <p className="computing-tech-list__label">{label}</p>
      <div className="computing-tech-list__items">
        {technologies.map((tech, index) => (
          <ComputingTechItem key={index} technology={tech} />
        ))}
      </div>
    </div>
  )
}

export { ComputingTechList }