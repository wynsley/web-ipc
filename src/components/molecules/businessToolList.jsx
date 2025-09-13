import './businessToolList.css'
import { BusinessToolItem } from '../atoms/businessToolItem'

function BusinessToolList({ label, tools }) {
  return (
    <div className="business-tool-list">
      <p className="business-tool-list__label">{label}</p>
      <div className="business-tool-list__items">
        {tools.map((tool, index) => (
          <BusinessToolItem key={index} tool={tool} />
        ))}
      </div>
    </div>
  )
}

export { BusinessToolList }