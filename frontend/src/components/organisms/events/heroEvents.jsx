import { DescrioptionHero } from "@/components/molecules/events/descriptionHero";
import heroImage from "@assets/images/events/hero-events.webp";
import { motion as Motion } from "motion/react";

function HeroEvents({ event, onOpenCalendar }) {
  return (
    <section className="relative z-0 select-none">
      <div
        className="relative flex items-center overflow-hidden bg-blue-deep
          h-[60vh] py-12 sm:min-h-[70vh] md:min-h-[72vh] xl:min-h-[75vh]
          "
      >
        {/* Imagen de fondo */}
        <img
          src={heroImage}
          alt="evento institucional"
          loading="lazy"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Degradado */}
        <div className="absolute inset-0 bg-linear-to-r from-blue-deep via-blue-deep/10 to-blue-deep/10" />

        {/* Banda + contenido */}
        <div className="relative z-10 w-[96%] sm:w-[88%] lg:w-[78%] xl:w-[72%]">
          {/* Banda inclinada */}
          <Motion.div
            aria-hidden="true"
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="
              absolute inset-0
              bg-linear-to-r from-blue-deep via-blue-deep/90 to-blue/40
              [clip-path:polygon(0_0,100%_0,92%_100%,0_100%)]
            "
          />

          <DescrioptionHero event={event} onOpenCalendar={onOpenCalendar} />
        </div>
      </div>
    </section>
  );
}

export { HeroEvents };