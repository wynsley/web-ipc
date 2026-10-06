import { motion as Motion, useScroll, useTransform } from "motion/react";
import { useMotionPreference } from "@/hooks/globals/useMotionPreference";
import { Image } from "@/components/atoms/image";

function ComputerScienceHeroBackground({ image, target }) {
  const reducedMotion = useMotionPreference();
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <Motion.div
        data-hero-parallax
        className="absolute inset-0"
        style={reducedMotion ? { y: 0, scale: 1 } : { y, scale }}
      >
        <Image
          src={image}
          alt=""
          fill
          loading="eager"
          overlayClassName="bg-linear-to-r from-blue-deep/75 via-blue-deep/40 to-blue-deep"
        />
      </Motion.div>
    </div>
  );
}

export { ComputerScienceHeroBackground };
