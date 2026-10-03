import { ScrollMotion } from "../../layouts/scrollMotion";
import { FiCode, FiCpu } from "react-icons/fi";
import { Image } from "../../atoms/image";

function ComputerScienceHeroVisual({ image, cards }) {
  return (
    <ScrollMotion
      y={130}
      scale={0.9}
      className="relative z-1 mx-auto mt-6 h-88 w-[92%] max-w-120 md:absolute md:top-8 md:right-[1.5%] md:m-0 md:h-132 md:w-[47%] md:max-w-none lg:top-6 lg:right-[3%] lg:h-148"
    >
      <Image
        src={image.src}
        alt={image.alt}
        loading="eager"
        fetchPriority="high"
        className="h-full w-full rounded-xl2 has-[img.opacity-100]:bg-transparent has-[img.opacity-100]:mask-[linear-gradient(to_bottom,black_88%,transparent_100%)] [&>img]:object-contain [&>img]:object-bottom"
      />
      <div className="absolute left-0 top-0 origin-top-left scale-80 md:-left-2 md:top-10 md:scale-100 rounded-xl2 border border-neutral-white/20 bg-blue-dark/90 p-4 text-neutral-white shadow-soft sm:p-5">
        <span className="flex items-center gap-2 text-xs">
          <FiCode className="text-orange" aria-hidden="true" />{" "}
          {cards.development}
        </span>
        <div aria-hidden="true" className="mt-4 space-y-2.5">
          <div className="h-1.5 w-12 rounded-full bg-orange" />
          <div className="ml-3 h-1.5 w-20 rounded-full bg-blue-light" />
          <div className="ml-3 h-1.5 w-14 rounded-full bg-neutral-white/60" />
          <div className="h-1.5 w-8 rounded-full bg-orange" />
        </div>
      </div>
      <div className="absolute right-0 bottom-14 flex items-center gap-3 rounded-xl2 border border-neutral-white/20 bg-blue-dark/95 px-4 py-3 text-neutral-white shadow-soft sm:bottom-24">
        <FiCpu className="text-2xl text-orange" aria-hidden="true" />
        <span className="text-xs leading-relaxed">
          {cards.technology}
          <br />
          <strong>{cards.emphasis}</strong>
        </span>
      </div>
    </ScrollMotion>
  );
}

export { ComputerScienceHeroVisual };
