import './accountingTechItem.css'

function AccountingTechItem({ technology }) {
  return (
    <span className="accounting-tech-item">
      {technology}
    </span>
  )
}

export { AccountingTechItem }