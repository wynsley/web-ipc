import { ScrollReveal } from "../../layouts/scrollReveal";
import { Title } from "../../atoms/titles";
import { Paragraph } from "../../atoms/paragraph";
import { Image } from "../../atoms/image";
import { BenefitCard } from "../../molecules/careers/benefitCard";

function CareerBenefits({
  benefits,
  image,
  title = "Beneficios",
  description = "Accede a una formación práctica con beneficios que impulsan tu desarrollo profesional.",
  imageAlt = "Presentación de gestión empresarial en un entorno de trabajo",
  eyebrow,
}) {
  return (
    <section
      aria-labelledby="career-benefits-title"
      className="bg-neutral-white px-4 py-12 sm:px-8 sm:py-16 lg:px-12"
    >
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-12">
        <ScrollReveal x={-28} y={0} className="flex min-w-0 flex-col">
          {eyebrow && (
            <span className="mb-4 block font-poppins text-xs tracking-[0.2em] text-blue-dark uppercase">
              {eyebrow}
            </span>
          )}
          <Title
            id="career-benefits-title"
            level="h2"
            text={title}
            variant="institutional"
            weight="bold"
            className="font-hani"
          />
          <Paragraph
            size="compact"
            variant="danger"
            text={description}
            className="mt-3 max-w-md font-poppins leading-relaxed"
          />
          <div className="relative mt-6 aspect-4/3 overflow-hidden rounded-xl bg-blue-dark sm:aspect-video md:aspect-auto md:min-h-64 md:flex-1">
            <Image src={image} alt={imageAlt} fill decoding="async" />
          </div>
        </ScrollReveal>
        <ul className="grid auto-rows-fr gap-3 sm:gap-4">
          {benefits.map((benefit, index) => (
            <BenefitCard
              delay={index * 0.09}
              key={benefit.title}
              {...benefit}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

export { CareerBenefits };
