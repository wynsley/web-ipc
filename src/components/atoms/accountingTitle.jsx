import './accountingTitle.css'

function AccountingTitle({ children, highlightText, className = '' }) {
  if (!highlightText) {
    return <h1 className={`accounting-title ${className}`}>{children}</h1>
  }

  // Dividir el texto en partes para destacar
  const parts = children.split(highlightText)
  
  return (
    <h1 className={`accounting-title ${className}`}>
      {parts[0]}
      <span className="accounting-title__highlight">{highlightText}</span>
      {parts[1]}
    </h1>
  )
}

export { AccountingTitle }