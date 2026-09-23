import { motion as Motion } from "motion/react"
import { paragraphReveal } from "../animations/animation"

function Button({
  text,
  onClick,
  className = '',
  type,
  disabled = false,
  children,
  variant = 'default',
  ...motionProps
}) {

  const variants = {
    default: ``,
    primary: `
      bg-[#c97420] 
      w-[9em] py-1 sm:py-2 px-2  md:px-4 lg:px-5
      rounded-xl
      text-[.6em] sm:text-[.9em] md:text-[1em] xl:text-[1.3em]
      font-bold text-white 
      shadow-[0_4px_8px_rgba(255,255,255,0.5)]
      hover:bg-[#c97420] 
      hover:shadow-[2px_10px_10px_rgba(224,132,51,0.6)] 
      hover:-translate-y-1 
      transition-all duration-200 cursor-pointer
      font-hani
`,
    secondary: `
      w-full bg-blue text-white font-bold text-[1.1em]
      rounded-md py-1 transition-all duration-300 ease-in-out
      hover:bg-blue-dark
      hover:shadow-lg
      hover:-translate-y-0.5
      active:scale-95
    `,
    ternary : `py-2 px-3 border-2 border-blue text-blue font-bold rounded-md
      shadow-sm shadow-blue
      transition-all duration-300 hover:-translate-y-1 
      hover:shadow-md hover:shadow-orange hover:border-orange 
      hover:text-orange
    `
  }

  return (
    <Motion.button
      {...motionProps}
      variants={paragraphReveal}
      className={`
        ${className}
        ${variants[variant] || variants.default}
      `}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text || children}
    </Motion.button>
  )
}

export { Button }