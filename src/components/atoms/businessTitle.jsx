import './businessTitle.css'

function BusinessTitle({ children, highlightText, className = '' }) {

  // Dividir el texto en partes para destacar
  const parts = children.split(highlightText)
  
  return (
    <h1 className={`business-title ${className}`}>
      {parts[0]}
      <span className="business-title__highlight">{highlightText}</span>
      {parts[1]}
    </h1>
  )
}

export { BusinessTitle }