import { IoCallOutline } from "react-icons/io5";
import { FaGraduationCap } from "react-icons/fa6";
import { Title } from "../../atoms/titles";
import { Paragraph } from "../../atoms/paragraph";
import { Button } from "../../atoms/button";

function Hero() {
  return (
    <section
      className="relative
        h-[55vh] xs:h-[58vh] sm:h-[65vh] md:h-[75vh] xl:h-[80vh]
        overflow-hidden
        z-0
        select-none"
    >
      {/* Imagen de fondo */}
      <img
        src="/HERO_GRADUATES.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Degradado oscuro -> transparente, color de marca */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div
          className="
            absolute inset-0 z-20
            bg-linear-to-r
            from-blue-deep
            via-blue-deep/70
            via-50%
            to-blue-deep/0
            to-95%
          "
        />
      </div>

      {/* Contenido */}
      <div className="relative z-30 flex h-full w-full items-center px-6 sm:px-10 lg:px-[6%]">
        <div className="w-full max-w-xl">
          <span
            className="
              inline-block rounded-full bg-white/10 backdrop-blur-sm
              border border-white/20
              px-4 py-1.5 mb-5
              font-hani text-xs sm:text-sm font-bold uppercase tracking-wide
              text-white
            "
          >
            Instituto Privado Celendín
          </span>

          <Title
            level="h2"
            weight="bold"
            variant="primary"
            text="Egresados que dejan Huella"
            className="font-poppins"
          />

          <Paragraph
            size="compact"
            className="mt-5 max-w-md font-poppins text-white/80 leading-relaxed"
          >
            Formamos profesionales preparados para destacar en el mundo
            laboral, con una formación sólida y orientada al éxito. Nuestros
            egresados son el reflejo del compromiso y la calidad educativa
            que nos caracteriza.
          </Paragraph>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              text="Conoce nuestras carreras"
              variant="danger"
              className="font-hani"
            />

            <a
              href="tel:+51987654321"
              className="
                flex items-center gap-2
                font-hani font-bold text-white
                border-b-2 border-transparent
                hover:border-orange
                transition-colors duration-200
              "
            >
              <span className="flex items-center justify-center size-9 rounded-full bg-white/10 border border-white/20">
                <IoCallOutline className="size-4" />
              </span>
              (+51) 987 654 321
            </a>
          </div>
        </div>
      </div>

      {/* Curva blanca inferior */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 z-30 h-24 w-full sm:h-32 md:h-50"
      >
        <path
          d="M0,100C190,220 440,190 690,145C940,100 1050,20 1440,100V600H0Z"
          className="fill-white"
        />
      </svg>
    </section>
  );
}

export { Hero };