import './accountingTechList.css'
import { AccountingTechItem } from '../atoms/accountingTechItem'

function AccountingTechList({ label, technologies }) {
  return (
    <div className="accounting-tech-list">
      <p className="accounting-tech-list__label">{label}</p>
      <div className="accounting-tech-list__items">
        {technologies.map((tech, index) => (
          <AccountingTechItem key={index} technology={tech} />
        ))}
      </div>
    </div>
  )
}

export { AccountingTechList }