import { useKeyboardFocusWithin } from "../../hooks/globals/useKeyboardFocusWithin";
import { useContext, useRef } from "react";
import { motion as Motion, useScroll, useTransform } from "motion/react";
import { useMotionPreference } from "../../hooks/globals/useMotionPreference";
import { ScrollAnimationContext } from "../../context/scrollAnimationContext";
import { useRevealMotion } from "../animations/useRevealMotion";

function LinkedMotion({
  as = "div",
  children,
  className = "",
  delay = 0,
  y = 56,
  x = 0,
  scale = 0.94,
}) {
  const ref = useRef(null);
  const { focused, focusHandlers } = useKeyboardFocusWithin();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const stops = [0, 0.28 + Math.min(delay, 0.3) * 0.15, 0.78, 1];
  const opacity = useTransform(scrollYProgress, stops, [0.15, 1, 1, 0.15]);
  const translateY = useTransform(scrollYProgress, stops, [
    Math.max(y, 56),
    0,
    0,
    -Math.max(y, 40),
  ]);
  const translateX = useTransform(scrollYProgress, stops, [x, 0, 0, -x]);
  const zoom = useTransform(scrollYProgress, stops, [
    Math.min(scale, 0.94),
    1,
    1,
    0.96,
  ]);
  const Tag = Motion[as];

  return (
    <Tag
      ref={ref}
      data-scroll-motion="linked"
      className={className}
      style={
        focused
          ? { opacity: 1, x: 0, y: 0, scale: 1 }
          : { opacity, x: translateX, y: translateY, scale: zoom }
      }
      {...focusHandlers}
    >
      {children}
    </Tag>
  );
}

function EntranceMotion({
  as = "div",
  children,
  className = "",
  delay = 0,
  y = 24,
  x = 0,
  scale = 1,
  duration = 0.6,
}) {
  const reveal = useRevealMotion({ delay, y, x, scale, duration, amount: 0.2 });
  const Tag = Motion[as];
  return (
    <Tag className={className} {...reveal}>
      {children}
    </Tag>
  );
}

function ScrollMotion(props) {
  const mode = useContext(ScrollAnimationContext);
  const reducedMotion = useMotionPreference();
  if (reducedMotion) {
    const Tag = props.as || "div";
    return <Tag className={props.className}>{props.children}</Tag>;
  }
  return mode === "linked" ? (
    <LinkedMotion {...props} />
  ) : (
    <EntranceMotion {...props} />
  );
}

export { ScrollMotion };
