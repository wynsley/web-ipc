import './accountingSubtitle.css'

function AccountingSubtitle({ children, className = '' }) {
  return (
    <p className={`accounting-subtitle ${className}`}>
      {children}
    </p>
  )
}

export { AccountingSubtitle }