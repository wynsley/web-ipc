import { useScroll, useTransform } from "motion/react";
import { usePinnedScene } from "../../hooks/globals/usePinnedScene";

function useJourneyMotion(target) {
  const pinned = usePinnedScene();
  const { scrollYProgress: entry } = useScroll({
    target,
    offset: ["start end", "start 15%"],
  });
  const opacity = useTransform(entry, [0, 0.7, 1], [0, 1, 1]);
  const y = useTransform(entry, [0, 1], [80, 0]);
  const { scrollYProgress: progress } = useScroll({
    target,
    offset: ["start start", "end end"],
  });

  return {
    pinned,
    progress,
    surfaceStyle: pinned ? { opacity, y } : { opacity: 1, y: 0 },
  };
}

export { useJourneyMotion };
