import { useEffect, useRef, useState } from "react";
import { Image } from "../../atoms/image";
import { Paragraph } from "../../atoms/paragraph";
import { Title } from "../../atoms/titles";

const slides = [
  {
    title: "Gestión Financiera",
    description:
      "Analiza los ingresos, gastos y recursos de una organización para contribuir a una adecuada planificación financiera.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Análisis Contable",
    description:
      "Interpreta información financiera y estados contables para apoyar el control y la toma de decisiones empresariales.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Auditoría",
    description:
      "Evalúa procesos, registros y documentos financieros para verificar que la información sea confiable y transparente.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Tributación",
    description:
      "Conoce y aplica los procedimientos tributarios necesarios para cumplir correctamente con las obligaciones fiscales.",
    image:
      "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Contabilidad Empresarial",
    description:
      "Participa en la organización y control de las operaciones económicas que forman parte de la gestión de una empresa.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Costos y Presupuestos",
    description:
      "Determina y controla los costos de producción y elabora presupuestos que orienten la gestión de los recursos empresariales.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Finanzas Corporativas",
    description:
      "Evalúa proyectos de inversión y estructura de capital para maximizar el valor de las organizaciones.",
    image:
      "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?auto=format&fit=crop&w=800&q=80",
  },
];

const AUTO_SPEED = 0.3;
const SPACING = 0.86;
const TILT = 40;
const MAX_TILT = 46;

function AccountingCarouselCard({ slide }) {
  return (
    <article className="flex h-[360px] w-[230px] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl sm:h-[400px] sm:w-[270px] md:h-[430px] md:w-[300px]">
      <div className="h-[150px] w-full shrink-0 sm:h-[170px] md:h-[190px]">
        <Image
          src={slide.image}
          alt={slide.title}
          imageClassName="select-none"
          style={{ objectFit: "contain" }}
          loading="lazy"
          draggable={false}
        />
      </div>

      <div className="px-4 py-3">
        <h3 className="mb-1 text-base font-bold text-gray-900 sm:text-[17px]">
          {slide.title}
        </h3>
        <p className="line-clamp-3 text-sm leading-[1.5] text-gray-600 sm:text-[15px]">
          {slide.description}
        </p>
      </div>
    </article>
  );
}

function AccountingCarousel() {
  const [current, setCurrent] = useState(0);
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const position = useRef(0);
  const spacingPx = useRef(250);
  const hovering = useRef(false);
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, position: 0 });
  const lastIndex = useRef(0);
  const slideCount = slides.length;

  useEffect(() => {
    const measure = () => {
      const firstCard = cardRefs.current[0];
      if (firstCard) spacingPx.current = firstCard.offsetWidth * SPACING;
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const wrapDistance = (distance) =>
      ((((distance + slideCount / 2) % slideCount) + slideCount) % slideCount) -
      slideCount / 2;
    let animationFrame;
    let lastFrame = performance.now();

    const frame = (now) => {
      const elapsedSeconds = Math.min(0.05, (now - lastFrame) / 1000);
      lastFrame = now;

      if (!reduceMotion && !hovering.current && !dragging.current) {
        position.current += AUTO_SPEED * elapsedSeconds;
      }

      for (let index = 0; index < slideCount; index += 1) {
        const card = cardRefs.current[index];
        if (!card) continue;

        const distance = wrapDistance(index - position.current);
        const absoluteDistance = Math.abs(distance);
        const rotation = Math.max(
          -MAX_TILT,
          Math.min(MAX_TILT, -distance * TILT),
        );
        const scale = 1 - 0.07 * Math.min(absoluteDistance, 3);
        const depth = -Math.min(absoluteDistance, 3) * 70;
        const verticalOffset = Math.min(absoluteDistance, 3) * 8;
        const opacity =
          absoluteDistance < 3
            ? 1
            : Math.max(0, 1 - (absoluteDistance - 3) * 1.2);

        card.style.transform = `translate3d(calc(-50% + ${(distance * spacingPx.current).toFixed(2)}px), ${verticalOffset.toFixed(1)}px, ${depth.toFixed(1)}px) rotateY(${rotation.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        card.style.opacity = opacity.toFixed(3);
        card.style.zIndex = String(100 - Math.round(absoluteDistance * 10));
        card.style.filter = `brightness(${(1 - Math.min(absoluteDistance, 3) * 0.06).toFixed(3)})`;
        card.style.visibility = opacity <= 0 ? "hidden" : "visible";
      }

      const activeIndex =
        ((Math.round(position.current) % slideCount) + slideCount) % slideCount;
      if (activeIndex !== lastIndex.current) {
        lastIndex.current = activeIndex;
        setCurrent(activeIndex);
      }

      animationFrame = requestAnimationFrame(frame);
    };

    animationFrame = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animationFrame);
  }, [slideCount]);

  const handlePointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragging.current = true;
    dragStart.current = { x: event.clientX, position: position.current };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!dragging.current) return;
    const offset = event.clientX - dragStart.current.x;
    position.current = dragStart.current.position - offset / spacingPx.current;
  };

  const handleDragEnd = () => {
    dragging.current = false;
  };

  return (
    <section className="bg-neutral-light px-4 py-12 sm:px-8 sm:py-16 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-base font-bold uppercase tracking-[0.12em] text-blue sm:text-lg">
            Áreas de aprendizaje
          </p>
          <Title
            level="h2"
            text="¿Qué aprenderás?"
            variant="institutional"
            weight="bold"
            align="center"
            size="compact"
          />
          <Paragraph
            variant="secondary"
            size="comfortable"
            align="center"
            className="mx-auto mt-3 max-w-[750px]"
          >
            Conoce algunas de las principales áreas en las que desarrollarás
            conocimientos y competencias como profesional de la Contabilidad.
          </Paragraph>
        </div>

        <div
          ref={stageRef}
          onMouseEnter={() => {
            hovering.current = true;
          }}
          onMouseLeave={() => {
            hovering.current = false;
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handleDragEnd}
          onPointerCancel={handleDragEnd}
          aria-roledescription="carrusel"
          aria-label="Áreas de aprendizaje de la Contabilidad"
          style={{ perspective: "1400px", touchAction: "pan-y" }}
          className="relative h-[392px] cursor-grab select-none overflow-hidden active:cursor-grabbing sm:h-[432px] md:h-[462px]"
        >
          {slides.map((slide, index) => (
            <div
              key={slide.title}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              className="absolute left-1/2 top-4 will-change-transform"
            >
              <AccountingCarouselCard slide={slide} />
            </div>
          ))}
        </div>

        <div
          className="mt-3 flex justify-center gap-2"
          aria-label={`Tarjeta ${current + 1} de ${slideCount}`}
          aria-live="polite"
        >
          {slides.map((slide, index) => (
            <span
              key={slide.title}
              aria-hidden="true"
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index ? "w-6 bg-blue" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export { AccountingCarousel };