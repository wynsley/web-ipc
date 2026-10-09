import { motion as Motion } from "motion/react";
import { useMotionPreference } from "../../hooks/globals/useMotionPreference";
import { useRevealMotion } from "../animations/useRevealMotion";

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
  const reducedMotion = useMotionPreference();
  if (reducedMotion) {
    const Tag = props.as || "div";
    return <Tag className={props.className}>{props.children}</Tag>;
  }
  return <EntranceMotion {...props} />;
}

export { ScrollMotion };
