import { ScrollReveal } from "@/components/layouts/scrollReveal"

function HeroPerson({ personImage }) {
  return (
    // Contenedor plano: solo posiciona. Cada pieza anima por separado.
    <div
      className="
        hidden sm:block
        absolute bottom-0 right-[5%] lg:right-[8%]
        h-[88%] w-[38%] lg:w-[30%] max-w-md
      "
    >
      <ScrollReveal
        delay={0}
        y={30}
        className="absolute bottom-[14%] -left-8 right-6 h-[65%] border border-orange"
      />

      <ScrollReveal
        delay={0.35}
        y={40}
        className="absolute bottom-0 -left-4 -right-4 h-[25%] bg-blue"
      />

      {/* 3) Imagen de la persona */}
      <ScrollReveal delay={0.7} y={60} className="relative h-full w-full">
        <img
          src={personImage}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-contain object-bottom"
        />
      </ScrollReveal>

      {/* 4) Flecha curva, al final */}
      <ScrollReveal
        delay={1.05}
        y={0}
        x={-20}
        className="absolute -left-24 top-[8%] hidden lg:block w-28"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 120 70"
          className="w-full text-white"
        >
          <path
            d="M4 4 C 30 6, 70 20, 100 58"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M84 56 L102 60 L98 42"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </ScrollReveal>
    </div>
  )
}

export { HeroPerson }