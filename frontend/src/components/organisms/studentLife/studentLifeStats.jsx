import { AnimatedNumber } from "@/components/atoms/animateNumber"
import { ScrollReveal } from "@/components/layouts/scrollReveal"
import { stats } from "@/data/home/statsCards"

// Entran después de que termina la secuencia del visual del hero.
const BASE_DELAY = 1.3
const STEP = 0.15

function StudentLifeStats() {
  return (
    <div className="relative z-30 mt-0 px-6 pb-10 sm:pb-14">
      <ul
        aria-label="Datos del instituto"
        className="mx-auto grid max-w-3xl grid-cols-1 shadow-2xl shadow-blue-deep/20 sm:grid-cols-3"
      >
        {stats.map((stat, i) => {
          const Icon = stat.icon
          const isHighlighted = stat.position === "middle"
          // Las carreras (id 2) van sin "+"; el resto sí.
          const prefix = stat.id === 2 ? "" : "+"

          return (
            <li key={stat.id} className="flex">
              <ScrollReveal
                y={30}
                delay={BASE_DELAY + i * STEP}
                duration={0.7}
                // min-h = alto que tenían las tarjetas con el ícono delante.
                // justify-end: número y descripción quedan al pie de la card.
                className={`relative flex min-h-[7.5rem] w-full flex-col justify-end overflow-hidden px-6 py-6 ${
                  isHighlighted
                    ? "bg-blue-deep text-white"
                    : "bg-white text-blue-deep"
                }`}
              >
                {/* Marca de agua: ahora en todas las tarjetas */}
                <Icon
                  aria-hidden="true"
                  className={`pointer-events-none absolute -right-4 -top-4 h-28 w-28 rotate-12 ${
                    isHighlighted ? "text-blue/30" : "text-blue/15"
                  }`}
                />

                <div className="relative flex flex-col items-center gap-2">
                  <p className="font-hani text-[2.2em] font-bold leading-none">
                    {/* Valor final para lectores de pantalla; el contador es decorativo */}
                    <span className="sr-only">
                      {prefix}
                      {stat.value.toLocaleString("es-ES")}
                      {stat.suffix}
                    </span>
                    <span aria-hidden="true">
                      <AnimatedNumber
                        value={stat.value}
                        prefix={prefix}
                        suffix={stat.suffix}
                      />
                    </span>
                  </p>
                  <p
                    className={` font-poppins text-sm ${
                      isHighlighted ? "text-white/70" : "text-neutral-500"
                    }`}
                  >
                    {stat.description}
                  </p>
                </div>
              </ScrollReveal>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export { StudentLifeStats }