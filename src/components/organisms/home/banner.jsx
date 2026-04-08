import { BannerDescription } from "../../molecules/home/bannerDescriptions"

function HomeBanner() {
  const title = 'Compromiso | Exelencia | innovación'
  const description = `En el Instituto Privado Celendín te brindamos las herramientas y el 
    acompañamiento necesario para alcanzar tus metas y destacar en el mundo laboral. Forma 
    parte de una comunidad que impulsa tu crecimiento personal y profesional.`

  return (
    <section
      className="
        relative 
        h-[28vh] xs:h-[30vh] sm:h-[45vh]  md:h-[65vh] lg:h-[80vh]  
        w-screen 
        overflow-hidden
        z-0
      "
    >
      <div
        className="
          absolute inset-0 
          bg-cover bg-center bg-no-repeat 
          transition-all duration-300 
          sm:bg-position-[center_50%]
          z-0
        "
        style={{ backgroundImage: "url('/BANNER_HOME.webp')" }}
      >
        <div
  className="
    absolute top-0 left-0 h-full w-[75%] xs:w-[70%] sm:w-[69%] md:w-[70%] lg:w-[68%] xl:w-[65%] 2xl:w-[60%] 
    bg-sky/80
    z-20
  "
  style={{
    clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)'
  }}
/>

        {/* Capa 2: Espacio de 4em y degradado inclinado */}
        <div
          className="
        absolute top-0 left-[72%] xs:left-[68%] sm:left-[67%] md:left-[68%] lg:left-[66%] xl:left-[63%] 2xl:left-[58%] h-full w-[5%] 
      bg-orange/60 semi-transparente
        transform -skew-x-8 xs:-skew-x-12  sm:-skew-x-10 md:-skew-x-10 lg:-skew-x-9 xl:-skew-x-10 2xl:-skew-x-12
        z-20
      "
        />
      </div>
      <BannerDescription
        title={title}
        description={description}
      />
      
    </section>
  )
}

export { HomeBanner }