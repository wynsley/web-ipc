
import { ScrollReveal } from "@/components/layouts/scrollReveal";

function HeroPerson({ personImage }) {
  return (
    <div
      className="
        hidden sm:block
    absolute bottom-0 right-[5%] lg:right-[8%]
    h-[88%] w-[38%] lg:w-[40%] max-w-lg
    
      "
    >
      <div >
        {/* Marco del fondo */}
      <ScrollReveal
        delay={0}
        y={30}
        className="absolute bottom-[14%] -left-8 right-6 h-[65%] z-0 border border-orange"
      />

      {/* Persona: aparece lentamente desde abajo */}
      <ScrollReveal
        delay={0.2}
        y={120}
        duration={1.5}
        className="absolute inset-0 z-10"
      >
        <img
          src={personImage}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-contain object-bottom"
        />
      </ScrollReveal>

      {/* Bloque azul por delante de la persona */}
      <ScrollReveal
        delay={0.35}
        y={20}
        duration={0.8}
        className="absolute bottom-0 -left-4 -right-4 z-5 h-[25%] bg-blue"
      />

      </div>
      {/* Flecha */}
      <ScrollReveal
        delay={1.05}
        y={0}
        x={-20}
        className="absolute -left-24 top-[8%] z-30 hidden w-28 lg:block"
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
  );
}

export { HeroPerson };