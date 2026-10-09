import { ScrollReveal } from "@/components/layouts/scrollReveal"

const START = 0.15
const STEP = 0.25
const at = (order) => START + order * STEP

function StudentHero({ heroImg }) {
  return (
    <div className="relative mx-auto h-[22rem] w-full max-w-md sm:h-[26rem] lg:h-full lg:max-w-none">
      <ScrollReveal
        y={40}
        delay={at(0)}
        duration={0.7}
        aria-hidden="true"
        className="absolute left-[8%] top-[8%] h-[72%] w-[55%] border border-sky/40 bg-gradient-to-br from-sky/40 via-blue/20 to-transparent backdrop-blur-sm [clip-path:polygon(0_12%,100%_0,88%_100%,0_88%)]"
      />

      <ScrollReveal
        y={-40}
        delay={at(1)}
        duration={0.7}
        aria-hidden="true"
        className="absolute right-[4%] top-[4%] h-[64%] w-[45%] border border-sky/30 bg-gradient-to-bl from-blue/40 via-sky/10 to-transparent backdrop-blur-sm [clip-path:polygon(18%_0,100%_14%,100%_100%,0_82%)]"
      />

      <ScrollReveal
        y={0}
        delay={at(2)}
        duration={0.6}
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-sky to-transparent"
      />

      {heroImg && (
        <ScrollReveal
          y={60}
          delay={at(2)}
          duration={1.5}
          className="absolute inset-0"
        >
          <img
            src={heroImg}
            alt="Estudiante del Instituto Privado Celendín"
            width="1600"
            height="1800"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-x-0 bottom-0 mx-auto h-full w-auto max-w-none object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_80%,transparent)]"
          />
        </ScrollReveal>
      )}

      <ScrollReveal
        y={30}
        delay={at(2)}
        duration={0.7}
        className="absolute bottom-4 right-0 border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md sm:right-4 sm:px-5 sm:py-4"
      >
        <p className="font-euro text-[0.65rem] uppercase tracking-[0.25em] text-sky">
          Comunidad estudiantil
        </p>
        <p className="mt-1 font-poppins text-sm font-medium text-white">
          Instituto Privado Celendín
        </p>
      </ScrollReveal>
    </div>
  )
}

export { StudentHero }