import heroImg from "@assets/images/studentLife/student-life.webp"
import { HeroDescription } from "@/components/molecules/studentLife/heroDescription"

function StudentLifeHero({
  careersMenu
}) {
  

  return (
    <section className="relative isolate z-20 overflow-hidden bg-blue-deep text-white lg:h-[70svh]">
      {/* Resplandores de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/4 -z-10 h-[28rem] w-[28rem] rounded-full bg-sky/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 -z-10 h-[32rem] w-[32rem] rounded-full bg-blue/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/3 -z-10 h-64 w-64 rounded-full bg-orange/10 blur-3xl"
      />

      <div 
        className="mx-auto grid max-w-7xl items-center gap-6 pb-10 pt-24 px-5 
        lg:h-full lg:grid-cols-2 lg:gap-6 lg:pb-0 lg:pt-24"
      >
        <HeroDescription
          anchorRef={careersMenu.anchorRef}
          isMenuOpen={careersMenu.isOpen}
          onMenuOpen={careersMenu.open}
          onMenuLeave={careersMenu.scheduleClose}
        />

        {/* Visual */}
        <div className="relative mx-auto h-[22rem] w-full max-w-md sm:h-[26rem] lg:h-full lg:max-w-none">
          {/* Formas de cristal detrás de la persona */}
          <div
            aria-hidden="true"
            className="absolute left-[8%] top-[8%] h-[72%] w-[55%] border border-sky/40 bg-gradient-to-br from-sky/40 via-blue/20 to-transparent backdrop-blur-sm [clip-path:polygon(0_12%,100%_0,88%_100%,0_88%)]"
          />
          <div
            aria-hidden="true"
            className="absolute right-[4%] top-[4%] h-[64%] w-[45%] border border-sky/30 bg-gradient-to-bl from-blue/40 via-sky/10 to-transparent backdrop-blur-sm [clip-path:polygon(18%_0,100%_14%,100%_100%,0_82%)]"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-sky/60 to-transparent"
          />

          {/* Imagen principal (recorte con fondo transparente) */}
          {heroImg && (
            <img
              src={heroImg}
              alt="Estudiante del Instituto Privado Celendín"
              width="1600"
              height="1800"
              fetchPriority="high"
              decoding="async"
              className="absolute inset-x-0 bottom-0 mx-auto h-full w-auto max-w-none object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_80%,transparent)]"
            />
          )}

          {/* Tarjeta de cristal */}
          <div className="absolute bottom-4 right-0 border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md sm:right-4 sm:px-5 sm:py-4">
            <p className="font-euro text-[0.65rem] uppercase tracking-[0.25em] text-sky">
              Comunidad estudiantil
            </p>
            <p className="mt-1 font-poppins text-sm font-medium text-white">
              Instituto Privado Celendín
            </p>
          </div>
        </div>
      </div>

    </section>
  )
}

export { StudentLifeHero }