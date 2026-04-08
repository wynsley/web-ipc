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
    default: ``,
    primary: `
      hidden md:block absolute
      md:right-9 lg:right-9  xl:right-8 bottom-[-2.1em]
      bg-[#e08433] 
      py-1 px-4 lg:px-5
      text-[0.8rem] lg:text-[.8em] xl:text-base
      font-semibold text-white 
      shadow-[0_4px_8px_rgba(255,255,255,0.5)]
      hover:bg-[#c97420] 
      hover:shadow-[2px_10px_10px_rgba(224,132,51,0.6)] 
      hover:scale-105
      transition-all duration-200 cursor-pointer
      font-hani
`,
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