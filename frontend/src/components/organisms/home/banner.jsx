import { BannerDescription } from "../../molecules/home/bannerDescriptions";
import { useCarousel } from "../../../hooks/globals/useCarrusel";
import { Dost } from "../../molecules/shared/dots";

const SLIDES = [
  { src: "/BANNER_HOME.webp", alt: "Banner principal" },
  { src: "/BANNER2.webp", alt: "Banner 2" },
  { src: "/BANNER3.webp", alt: "Banner 3" },
  { src: "/BANNER4.webp", alt: "Banner 4" },
];

const TRANSITION_MS = 700;

function HomeBanner({toggleModal}) {
  const cta = "¡Tú futuro comienza Aquí!";
  const title = "DESCRUBRE NUESTRAS CARRERAS";

  const { current, next, sliding, isDragging, dragHandlers } = useCarousel({
    slides: SLIDES,
    autoplayDelay: 5000,
    transitionMs: TRANSITION_MS,
  });

  return (
    <section
      className="
        relative
        h-[32vh] xs:h-[36vh] sm:h-[47vh] md:h-[63vh] xl:h-[75vh]
        overflow-hidden
        z-0
        select-none
      "
      style={{ cursor: isDragging ? "grabbing" : "default" }}
      {...dragHandlers}
    >
      {/* Slide actual */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${SLIDES[current].src}')` }}
      />

      {/* Slide entrante con crossfade */}
      {next !== null && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${SLIDES[next].src}')`,
            opacity: sliding ? 1 : 0,
            transition: `opacity ${TRANSITION_MS}ms ease-in-out`,
          }}
        />
      )}

      <div className="absolute inset-0 z-10 pointer-events-none">
        <div
          className="
            absolute inset-0 z-20
            bg-gradient-to-r
            from-neutral-black
            via-neutral-black/85
            via-50%
            to-neutral-black/0
            to-100%
          "
        />
      </div>

      <div className="absolute inset-0 z-10 flex items-center">
        <BannerDescription 
          toggleModal= {toggleModal} 
          title={title} 
          cta={cta} 
        />
      </div>
      <Dost
        dots={SLIDES}
        next={next}
        current={current}
      />
    </section>
  );
}

export { HomeBanner };