import { twMerge } from "tailwind-merge";

function Button({
  text,
  onClick,
  className = '',
  type,
  disabled = false,
  children,
  variant = 'default',
  ...props
}) {

  const variants = {
    default: ``,
    primary: `
      bg-[#c97420] 
      w-[9em] py-1 sm:py-2 px-2  md:px-4 lg:px-5
      rounded-xl
      text-[.8em] sm:text-[.9em] md:text-[1em] xl:text-[1.3em]
      font-bold text-white 
      shadow-[0_4px_8px_rgba(255,255,255,0.5)]
      hover:bg-[#c97420] 
      hover:shadow-[2px_10px_10px_rgba(224,132,51,0.6)] 
      hover:-translate-y-1 
      transition-all duration-200 cursor-pointer
      font-hani
`,
    secondary: `
      mt-auto min-h-11 cursor-pointer rounded-tl-xl 
      rounded-br-xl px-6 py-1 font-poppins text-white
      focus-visible:outline-2 focus-visible:outline-offset-4 
      border-3 border-blue flex items-center transition-all duration-300
      hover:border-orange text-white
    `,
    ternary : `flex h-10 items-center justify-center gap-2 rounded-full 
    border border-blue-deep px-3 font-hani text-sm font-bold text-blue-deep transition 
    hover:bg-blue-deep hover:text-white sm:px-5
    `,
    danger: `mt-auto min-h-11 cursor-pointer rounded-tl-xl 
      rounded-br-xl px-6 py-2 font-poppins
      focus-visible:outline-2 focus-visible:outline-offset-4 
      bg-blue flex items-center transition-all duration-300
      hover:bg-orange text-white`,
    base: `rounded-full bg-blue-deep px-7 py-3 font-hani text-sm 
    font-bold text-white transition hover:brightness-125`
  }

  return (
    <button
      className={twMerge(
        variants[variant] || variants.default,
        className
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...props}
    >
      {text || children}
    </button>
  )
}

export { Button }