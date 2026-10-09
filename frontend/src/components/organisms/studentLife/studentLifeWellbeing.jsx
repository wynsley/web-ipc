import { ScrollReveal } from "@/components/layouts/scrollReveal"
import { wellbeingItems } from "@/data/studentLife/wellbeingItems"

// Rejilla de 6 columnas en lg: 3 ítems por fila (span 2). La última fila,
// si queda incompleta, reparte el ancho (2 ítems → span 3, 1 ítem → span 6).
const COLS = 6
const PER_ROW = 3
const LG_SPAN = { 2: "lg:col-span-2", 3: "lg:col-span-3", 6: "lg:col-span-6" }

function getSpanClasses(i, total) {
  const rest = total % PER_ROW
  const inLastRow = rest > 0 && i >= total - rest
  const lg = LG_SPAN[inLastRow ? COLS / rest : COLS / PER_ROW]
  // En sm (2 columnas), si el total es impar el último ocupa el ancho completo.
  const sm = total % 2 === 1 && i === total - 1 ? "sm:col-span-2" : ""
  return `${sm} ${lg}`
}

function StudentLifeWellbeing() {
  return (
    <section aria-labelledby="wellbeing-title" className="bg-white">
      <div className="mx-auto w-[92%] md:w-[90%] max-w-6xl pt-6 sm:pt-10 md:pt-14 pb-16 sm:pb-20 md:pb-24">
        {/* Encabezado */}
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <ScrollReveal y={30}>
            <h2
              id="wellbeing-title"
              className="mt-4 font-hani text-3xl font-bold leading-tight text-blue-deep sm:text-4xl lg:text-5xl"
            >
              Acompañamos{" "}
              <span className="box-decoration-clone bg-gradient-to-r from-blue-deep to-blue bg-clip-text text-transparent">
                tu formación
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal y={30} delay={0.15}>
            <p className="max-w-2xl font-poppins text-base leading-relaxed text-neutral-600">
              Sabemos que una buena experiencia educativa también depende del
              bienestar y la convivencia. Por ello, buscamos generar un entorno
              donde nuestros estudiantes puedan desarrollarse de manera integral
              durante su etapa de formación.
            </p>
          </ScrollReveal>
        </div>

        <div className="mt-10 overflow-hidden md:mt-14">
          <ul className="-mb-px -mr-px grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6">
            {wellbeingItems.map((item, i) => {
              const Icon = item.icon

              return (
                <li
                  key={item.id}
                  className={`group flex border-b border-r border-blue-deep/40 bg-white ${getSpanClasses(
                    i,
                    wellbeingItems.length
                  )}`}
                >
                  <ScrollReveal
                    y={30}
                    delay={i * 0.1}
                    className="relative w-full p-7 transition-colors duration-300 group-hover:bg-sky/5 md:p-9 lg:p-10"
                  >
                    {/* Línea naranja que se extiende al pasar el mouse */}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-0 h-0.5 w-0 bg-orange transition-all duration-500 group-hover:w-full"
                    />

                    <Icon
                      aria-hidden="true"
                      size={38}
                      strokeWidth={1.5}
                      className="text-orange transition-transform duration-300 group-hover:-translate-y-1"
                    />

                    <h3 className="mt-7 font-euro text-sm font-semibold uppercase tracking-[0.15em] text-blue-deep sm:text-base">
                      {item.title}
                    </h3>
                    <p className="mt-3 font-poppins text-sm leading-relaxed text-neutral-600">
                      {item.description}
                    </p>
                  </ScrollReveal>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

export { StudentLifeWellbeing }