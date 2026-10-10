import { Image } from "@/components/atoms/image";
import { ScrollReveal } from "@/components/layouts/scrollReveal";
import studentImage from "@assets/images/careers/accounting/accounting-student.png";

function AccountingHeroStudent() {
  return (
    <div className="pointer-events-none absolute right-[8%] bottom-0 z-20 h-88 w-[84%] sm:right-[3%] sm:h-[98%] sm:w-[42%] lg:right-[6%] lg:w-[40%]">
      <div
        aria-hidden="true"
        className="absolute right-[8%] bottom-0 left-[8%] h-3/4 rounded-tr-[5rem] border-2 border-orange"
      />
      <ScrollReveal y={24} delay={0.1} className="relative h-full">
        <Image
          src={studentImage}
          alt="Estudiante de Contabilidad con cuaderno y calculadora; imagen ilustrativa"
          transparent
          className="h-full"
          style={{ objectFit: "contain", objectPosition: "bottom" }}
          loading="eager"
        />
      </ScrollReveal>
      <div
        aria-hidden="true"
        className="absolute right-[8%] bottom-0 left-[8%] h-1 rounded-sm bg-orange"
      />
    </div>
  );
}

export { AccountingHeroStudent };
