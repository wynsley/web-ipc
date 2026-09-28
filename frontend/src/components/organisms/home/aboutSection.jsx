import { ImageStack } from "../../molecules/home/imageStack";
import { AboutContent } from "../../molecules/home/aboutContent";
import { Title } from "../../atoms/titles";
import { motion as Motion } from "motion/react";
import { paragraphReveal } from "../../animations/animation";

function AboutSection() {
  const title = "TU TAMBIÉN PUEDES ALCANZAR TUS SUEÑOS";

  return (
    <section
      className="
        flex flex-col gap-10 md:flex-row md:items-center
        mx-auto my-3 md:my-20
        w-[90%] md:w-[90%] md:max-w-7xl py-6
      "
    >
      {/* TÍTULO (solo mobile) */}
      <Motion.div
        values={paragraphReveal}
        initial = 'hidden'  
        whileInView="visible"
        viewport={{once: true, amount: 0.2}}      
        className="flex flex-col gap-4 md:hidden">
        <div className="h-0.75 w-20 rounded-full bg-blue" />
        <Title
          text={title}
          level="h2"
          weight="extrabold"
          className="font-hani font-bold"
        />
      </Motion.div>

      {/* IMAGEN + CARDS — sin mx-auto, pegada a la izquierda */}
      <div className="w-full md:w-1/2 md:shrink-0">
        <ImageStack />
      </div>

      {/* TEXTO */}
      <AboutContent title={title} />
    </section>
  );
}

export { AboutSection };