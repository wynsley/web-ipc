export const SLIDE_EASE = [0.22, 1, 0.36, 1];

export const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({
    opacity: 0,
    x: dir > 0 ? -60 : 60,
    transition: { duration: 0.25, ease: "easeIn" },
  }),
};