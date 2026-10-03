import { useScroll, useTransform } from "motion/react";
import { useMotionPreference } from "../../hooks/globals/useMotionPreference";
import { useKeyboardFocusWithin } from "../../hooks/globals/useKeyboardFocusWithin";

function useSectionExit(target, enabled) {
  const reducedMotion = useMotionPreference();
  const { focused, focusHandlers } = useKeyboardFocusWithin();
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.8, 1],
    [1, 1, 0, 0],
  );
  const scale = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.92, 0.92]);
  const y = useTransform(scrollYProgress, [0, 0.8, 1], [0, 100, 100]);
  const active = enabled && !reducedMotion && !focused;

  return {
    active,
    focusHandlers,
    style: active ? { opacity, scale, y } : { opacity: 1, scale: 1, y: 0 },
  };
}

export { useSectionExit };
