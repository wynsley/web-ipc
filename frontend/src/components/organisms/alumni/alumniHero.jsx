import { HeroContent } from "../../molecules/alumni/HeroContent";

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

      <HeroContent />
      {/* Curva blanca inferior */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        className="pointer-events-none absolute bottom-0 left-0 z-30 h-24 w-full sm:h-32 md:h-50"
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