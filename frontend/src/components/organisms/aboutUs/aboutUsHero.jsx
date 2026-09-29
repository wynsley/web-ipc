import { Title } from "@/components/atoms/titles";
import { HeroPerson } from "@/components/molecules/aboutUs/heroPerson";
import personImage from "@assets/images/aboutUs/about-hero-person.png";
import { staggerContainer } from "@/components/animations/animation";
import { motion as Motion } from "motion/react";


function AboutHero({
  title = "SOBRE NOSOTROS",
  bgImage = "/BANNER_HOME.webp",
}) {
  return (
    <section className="relative z-0 select-none pb-10 sm:pb-14">
      <div
        className="
          relative overflow-hidden bg-blue-deep
          h-[45vh] sm:h-[55vh] md:h-[62vh] xl:h-[68vh]
          rounded-bl-[70px] sm:rounded-bl-[110px] md:rounded-bl-[150px]
        "
      >
        <img
          src={bgImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />

        {/* Degradado de marca */}
        <div className="absolute inset-0 bg-linear-to-r from-blue-deep via-blue-deep/10 to-blue-deep/10" />

        {/* Patrón de triángulos */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full opacity-[.12]"
        >
          <defs>
            <pattern
              id="about-hero-triangles"
              width="120"
              height="104"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 104 L60 0 L120 104 M0 0 H120"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-hero-triangles)" />
        </svg>

        {/* Banda oscura inclinada detrás del título */}
        < Motion.div
          className="
            absolute left-0 top-1/2 -translate-y-1/2
            h-[55%] w-[92%] sm:w-[68%]
            bg-linear-to-r from-blue-deep to-blue/40
            [clip-path:polygon(0_0,100%_0,88%_100%,0_100%)]
          "
        />
        <Motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative z-10 mx-auto flex h-full w-[92%] md:w-[90%] max-w-7xl flex-col justify-center">
          <Title
            text={title}
            variant="primary"
            weight="bold"
          />
        </Motion.div>
      </div>

      <HeroPerson
      personImage={personImage}
      />
    </section>
  );
}

export { AboutHero };