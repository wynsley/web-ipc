import './computingTitle.css'

function ComputingTitle({ children, highlightText, className = '' }) {
  if (!highlightText) {
    return <h1 className={`computing-title ${className}`}>{children}</h1>
  }

  // Dividido el texto en partes para destacar
  const parts = children.split(highlightText)
  
  return (
    <h1 className={`computing-title ${className}`}>
      {parts[0]}
      <span className="computing-title__highlight">{highlightText}</span>
      {parts[1]}
    </h1>
  )
}

export { ComputingTitle }