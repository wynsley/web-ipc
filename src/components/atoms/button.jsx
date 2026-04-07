function Button({
  text,
  onClick,
  className = '',
  type,
  disabled = false,
  children,
  variant = 'default'
}) {

  const variants = {
    default: '',
    primary: '',
    secondary: '',
    third: '',
  }

  return (
    <button 
      className={`
        ${className}
        ${variants[variant] || variants.default}
      `}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text || children}
    </button>
  )
}

export { Button }