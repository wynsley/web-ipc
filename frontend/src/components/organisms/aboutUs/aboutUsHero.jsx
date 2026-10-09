import { Title } from "@/components/atoms/titles";
import { HeroPerson } from "@/components/molecules/aboutUs/heroPerson";
import { BrandedHeroFrame } from "@/components/molecules/shared/brandedHeroFrame";
import personImage from "@assets/images/aboutUs/about-hero-person.png";
import { staggerContainer } from "@/components/animations/animation";
import { motion as Motion } from "motion/react";

function AboutHero({
  title = "SOBRE NOSOTROS",
  bgImage = "/BANNER_HOME.webp",
}) {
  return (
    <section className="relative z-0 select-none pb-10 sm:pb-14">
      <BrandedHeroFrame image={bgImage}>
        <Motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative z-10 mx-auto flex h-full w-[92%] md:w-[90%] max-w-7xl flex-col justify-center"
        >
          <Title text={title} variant="primary" weight="bold" />
        </Motion.div>
      </BrandedHeroFrame>
      <HeroPerson personImage={personImage} />
    </section>
  );
}

export { AboutHero };
