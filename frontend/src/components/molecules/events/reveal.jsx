import { motion as Motion } from "motion/react";
import { SLIDE_EASE, slideVariants } from "@/components/animations/eventsSlides";

function Reveal({ direction, delay = 0, className = "", children }) {
  return (
    <Motion.div
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.6, delay, ease: SLIDE_EASE }}
      className={className}
    >
      {children}
    </Motion.div>
  );
}

export { Reveal };