import { Title } from "@/components/atoms/titles";
import { ScrollReveal } from "@/components/layouts/scrollReveal";
import { Values } from "@/components/molecules/aboutUs/valuesContent";
import { values } from "@/data/aboutUs/ourValues";

function OurValues() {
  return (
    <section className="w-full bg-white px-6 py-16 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Title
          level="h2"
          text={'Nuestros Valores'}
          weight="bold"
          className="font-hani"
        />
        <small
          className="text-base font-pippins"
        >Nuestra institución tiene el propósito de constituir una comunidad educativa
          basada en valores, tales como:
        </small>

        <ul className="mt-14 grid gap-x-16 gap-y-12 md:grid-cols-2">
          {
            values.map((value, i) => (
              <ScrollReveal
                key={i} delay={0.2 * i} y={60}
              >
                <Values value={value} />
              </ScrollReveal>
            ))
          }
        </ul>
      </div>
    </section>
  );
}

export { OurValues };