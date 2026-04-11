import { Link } from "react-router-dom"

function Logo() {
  return (
    <Link to="/" className="mt-6 z-10001">
      <img 
        src="/LOGO.webp" 
        alt="Logo de la Institución"
        className="
          w-22 sm:w-30 md:w-35 lg:w-40 
          mb-[-3] sm:mb-1.5 md:mb-[-.3em] lg:mb-0
          h-auto
          shadow-[0_4px_12px_rgba(0,0,0,0.12)]
          hover:scale-102 hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)]
          transition duration-300 
        "
      />

    </Link>
  )
}

export { Logo }