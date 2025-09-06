import './computingTechItem.css'

function ComputingTechItem({ technology }) {
  return (
    <span className="computing-tech-item">
      {technology}
    </span>
  )
}

export { ComputingTechItem }