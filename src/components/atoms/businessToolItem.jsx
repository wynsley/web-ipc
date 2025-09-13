import './businessToolItem.css'

function BusinessToolItem({ tool }) {
  return (
    <span className="business-tool-item">
      {tool}
    </span>
  )
}

export { BusinessToolItem }