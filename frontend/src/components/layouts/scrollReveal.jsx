import { motion as Motion } from "motion/react";
import { useRevealMotion } from "../animations/useRevealMotion";

function ScrollReveal({
  children,
  className = "",
  delay = 0,
  y = 24,
  x = 0,
  scale = 1,
}) {
  const reveal = useRevealMotion({ delay, y, x, scale, duration: 0.6, amount: 0.2 });

  return (
    <Motion.div className={className} {...reveal}>
      {children}
    </Motion.div>
  );
}

export { ScrollReveal };
