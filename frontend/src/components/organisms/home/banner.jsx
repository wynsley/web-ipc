import { BannerDescription } from "../../molecules/home/bannerDescriptions";
import { useCarousel } from "../../../hooks/globals/useCarrusel";
import { Dost } from "../../molecules/shared/dots";
import { Image } from "../../atoms/image";
import digitalImage from "@assets/images/home/hero-digital.png";
import teamImage from "@assets/images/home/hero-team.png";
import languagesImage from "@assets/images/home/hero-languages.png";

const SLIDES = [
  { src: "/BANNER_HOME.webp", alt: "Infraestructura del instituto" },
  { src: digitalImage, alt: "Escena ilustrativa de aprendizaje digital" },
  { src: teamImage, alt: "Escena ilustrativa de un proyecto de gestión en equipo" },
  { src: languagesImage, alt: "Escena ilustrativa de práctica de interpretación" },
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
        overflow-hidden bg-blue-dark
        z-0
        select-none
      "
      style={{ cursor: isDragging ? "grabbing" : "default" }}
      {...dragHandlers}
    >
      {/* Slide actual */}
      <Image
        src={SLIDES[current].src}
        alt=""
        fill
        loading="eager"
        fetchPriority={current === 0 ? "high" : "auto"}
        draggable={false}
      />

      {/* Slide entrante con crossfade */}
      {next !== null && (
        <div
          className="absolute inset-0"
          style={{
            opacity: sliding ? 1 : 0,
            transition: `opacity ${TRANSITION_MS}ms ease-in-out`,
          }}
        >
          <Image src={SLIDES[next].src} alt="" fill loading="eager" draggable={false} />
        </div>
      )}

      <div className="absolute inset-0 z-10 pointer-events-none">
        <div
          className="
            absolute inset-0 z-20
            bg-linear-to-r
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
        onAbsolute = {true}
        variant="dark"
      />
    </section>
  );
}

export { HomeBanner };
