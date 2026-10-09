import heroImg from "@assets/images/studentLife/student-life.webp"
import { HeroDescription } from "@/components/molecules/studentLife/heroDescription"
import { StudentHero } from "@/components/molecules/studentLife/studentHero"

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
        <StudentHero
          heroImg={heroImg}
        />
      </div>

    </section>
  )
}

export { StudentLifeHero }