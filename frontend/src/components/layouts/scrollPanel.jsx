import { useKeyboardFocusWithin } from "../../hooks/globals/useKeyboardFocusWithin";
import { useRef } from "react";
import { motion as Motion, useScroll, useTransform } from "motion/react";
import { useMotionPreference } from "../../hooks/globals/useMotionPreference";

function ScrollPanel({ children, tone = "bg-blue-deep" }) {
  const ref = useRef(null);
  const { focused, focusHandlers } = useKeyboardFocusWithin();
  const reduced = useMotionPreference();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 15%"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0% 5% 0% 5% round 64px)", "inset(0% 0% 0% 0% round 0px)"],
  );
  const still = reduced || focused;
  return (
    <div ref={ref} className={`relative ${tone}`}>
      <Motion.div
        data-scroll-panel
        style={
          still ? { scale: 1, y: 0, clipPath: "none" } : { scale, y, clipPath }
        }
        {...focusHandlers}
        className="relative origin-top"
      >
        {children}
      </Motion.div>
    </div>
  );
}
export { ScrollPanel };
