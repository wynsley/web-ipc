import { Link } from "react-router-dom"
import { Image } from "@/components/atoms/image"

function Logo() {
  return (
    <Link to="/" className="mt-6 z-10001">
      <Image
        src="/LOGO.webp"
        alt="Logo de la Institución"
        loading="eager"
        fetchPriority="high"
        className="
          aspect-[479/231] w-22 sm:w-30 md:w-35 lg:w-40
          mb-[-3] sm:mb-1.5 md:mb-[-.3em] lg:mb-0
          shadow-[0_4px_12px_rgba(0,0,0,0.12)]
          hover:scale-102 hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)]
          transition duration-300
        "
        imageClassName="object-contain"
      />
    </Link>
  )
}

export { Logo }