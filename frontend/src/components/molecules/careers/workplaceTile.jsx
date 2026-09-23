import { motion as Motion } from "motion/react";
import { useRevealMotion } from "../../animations/useRevealMotion";
import { Image } from "../../atoms/image";

function WorkplaceTile({ title, image, delay = 0 }) {
  const reveal = useRevealMotion({ delay, y: 32, scale: 0.96 });
  return (
    <Motion.figure {...reveal} className="workplace-tile relative isolate min-w-0 overflow-hidden bg-blue-dark">
      <Image
        src={image}
        alt={title}
        fill
        imageClassName="workplace-tile__image"
        decoding="async"
      />
    </Motion.figure>
  );
}

export { WorkplaceTile };
