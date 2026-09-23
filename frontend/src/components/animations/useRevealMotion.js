import { useReducedMotion } from "motion/react";

const revealEase = [0.22, 1, 0.36, 1];

function useRevealMotion({
  delay = 0,
  y = 32,
  x = 0,
  scale = 1,
  duration = 0.7,
  amount = 0.15,
} = {}) {
  const reducedMotion = useReducedMotion();

  return {
    initial: reducedMotion ? false : { opacity: 0, x, y, scale },
    whileInView: { opacity: 1, x: 0, y: 0, scale: 1 },
    viewport: { once: true, amount },
    transition: {
      duration: reducedMotion ? 0 : duration,
      delay: reducedMotion ? 0 : delay,
      ease: revealEase,
    },
  };
}

export { useRevealMotion, revealEase };
