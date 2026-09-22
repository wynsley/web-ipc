import { FaWhatsapp } from "react-icons/fa"

function SocialFloatings() {
  return (
    <div className="fixed right-5 bottom-5 z-50 flex flex-col items-center gap-3">

      {/* Q10 */}
      <a
        href="https://site2.q10.com/login?ReturnUrl=%2F&aplentId=14592cc7-5820-4c56-a61c-35fdc90579ed"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ingresar a Q10"
        className="
          group relative
          flex items-center justify-center
          w-14 h-14 sm:w-16 sm:h-16
          rounded-full bg-white
          shadow-lg shadow-black/30
          transition-all duration-300
          hover:scale-110
        "
      >
        <img
          src="/LOGO_Q10.webp"
          alt="Q10"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full"
        />

        <span
          className="
            absolute right-full mr-3
            whitespace-nowrap
            rounded-lg bg-[#032d3c]
            px-3 py-2
            text-sm font-medium text-white
            opacity-0 translate-x-2
            pointer-events-none
            transition-all duration-300
            group-hover:opacity-100
            group-hover:translate-x-0
          "
        >
          Ingresar a Q10
        </span>
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/51999999999"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="
          group relative
          flex items-center justify-center
          w-14 h-14 sm:w-16 sm:h-16
          rounded-full
          bg-[#25D366] text-white
          shadow-lg shadow-black/30
          transition-all duration-300
          hover:scale-110
        "
      >
        <FaWhatsapp className="text-3xl sm:text-4xl" />

        <span
          className="
            absolute right-full mr-3
            whitespace-nowrap
            rounded-lg bg-[#032d3c]
            px-3 py-2
            text-sm font-medium text-white
            opacity-0 translate-x-2
            pointer-events-none
            transition-all duration-300
            group-hover:opacity-100
            group-hover:translate-x-0
          "
        >
          Contáctanos por WhatsApp
        </span>
      </a>

    </div>
  )
}

export { SocialFloatings }