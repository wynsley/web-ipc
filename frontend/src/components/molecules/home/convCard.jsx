import { IoIosArrowRoundForward } from "react-icons/io"
import { Title } from "../../atoms/titles"

function ConvCard({ title, desc, icon, buttonText = "Visítalos" }) {
  const Icon = icon

  return (
    <div
      className="
        continuous-carousel__card
        group relative w-[14em] h-[18em] md:w-[18em] shrink-0
        bg-[#F0F2F3]/30 border border-blue/10 
        shadow-lg
        pl-6 pt-6
        flex flex-col items-start text-left gap-6
        transition-all duration-300
        hover:-translate-y-1.5 hover:shadow-lg hover:border-blue/30
      "
    >

      {/* Ícono en contenedor cuadrado con borde, alineado a la izquierda */}
      <div
        className="
          relative flex items-center justify-center
          size-14 rounded-lg border border-neutral-light
          text-neutral-black
          transition-all duration-300
          group-hover:border-blue group-hover:text-blue
        "
      >
        <Icon className="size-12" />
      </div>

      <div className="relative flex flex-col gap-1.5">
        <Title
          text={title}
          level="h3"
          weight="bold"
          className="font-hani"
        />
        <p className="text-[14px] leading-relaxed text-neutral-dark/60">
          {desc}
        </p>
      </div>

      {/* Botón al pie, empuja hacia abajo con mt-auto si las cards tienen alturas distintas */}
      <a
        type="button"
        className="
          relative mt-auto group/btn w-full
          flex items-center justify-between gap-2
          bg-black text-white
          text-[13px] font-medium
          px-4 py-2.5
          transition-all duration-300
          hover:-translate-y-1
        "
      >
        {buttonText}
        <IoIosArrowRoundForward className="size-6 transition-transform group-hover/btn:translate-x-1" />
      </a>
    </div>
  )
}

export { ConvCard }