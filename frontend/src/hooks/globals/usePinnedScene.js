import { useMediaQuery } from "./useMediaQuery";
import { useMotionPreference } from "./useMotionPreference";

const sceneViewport =
  "(min-width: 48rem) and (min-height: 600px), (min-height: 740px)";

function usePinnedScene() {
  const hasSpace = useMediaQuery(sceneViewport);
  const reducedMotion = useMotionPreference();
  return hasSpace && !reducedMotion;
}

export { usePinnedScene };
