import { useMediaQuery } from "./useMediaQuery";

function useMotionPreference() {
  return useMediaQuery("(prefers-reduced-motion: reduce)", true);
}

export { useMotionPreference };
