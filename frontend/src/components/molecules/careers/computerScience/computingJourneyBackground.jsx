import { motion as Motion, useTransform } from "motion/react";
import { Image } from "@/components/atoms/image";

function ComputingJourneyBackground({ image, wordmark, progress, animated }) {
  const scale = useTransform(progress, [0, 1], [1, 1.4]);
  const x = useTransform(progress, [0, 1], ["0%", "-12%"]);
  const glowX = useTransform(progress, [0, 0.5, 1], ["-50%", "25%", "-10%"]);
  const glowY = useTransform(progress, [0, 1], ["30%", "-45%"]);
  const titleX = useTransform(progress, [0, 1], ["5%", "-15%"]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <Motion.div
        className="absolute inset-0"
        style={animated ? { scale, x } : { scale: 1, x: 0 }}
      >
        <Image src={image} fill alt="" overlayClassName="bg-blue-deep/90" />
      </Motion.div>
      <Motion.div
        style={animated ? { x: glowX, y: glowY } : { x: 0, y: 0 }}
        className="absolute inset-x-0 top-1/4 h-96 rounded-full bg-orange/25 blur-3xl"
      />
      <Motion.span
        style={animated ? { x: titleX } : { x: 0 }}
        className="absolute top-0 left-0 whitespace-nowrap font-hani text-[20vw] font-bold leading-none text-neutral-white/5"
      >
        {wordmark}
      </Motion.span>
    </div>
  );
}

export { ComputingJourneyBackground };
