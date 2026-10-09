import { AnimatePresence, motion as Motion } from "motion/react";
import { usePageLoader } from "@/hooks/globals/usePageLoader";
import { RunnerAvatar } from "./runnerAvatar";

const LOGO_SRC = `${import.meta.env.BASE_URL}loader-logo.webp`;

/*
 * Posiciones medidas sobre el logo (en % de su ancho/alto):
 * parte superior de la I, la P, la C y el diseño amarillo.
 */
const STOPS_X = [11.9, 33.4, 69.7, 92.5];
const GROUND = 8.6; // altura donde pisa (parte superior de las letras)
const ARC = 20; // qué tan alto salta
const SIT_DROP = 6.5; // cuánto baja al sentarse
const SIT_AT = 0.9;

// Tramos de salto (fracción del progreso): I→P, P→C, C→amarillo
const JUMPS = [
  [0.1, 0.34],
  [0.4, 0.64],
  [0.7, SIT_AT],
];

const lerp = (a, b, u) => a + (b - a) * u;
const smooth = (s) => s * s * (3 - 2 * s);

function getPose(progress) {
  const t = progress / 100;
  let x = STOPS_X[0];
  let y = GROUND;

  for (let i = 0; i < JUMPS.length; i++) {
    const [a, b] = JUMPS[i];
    if (t >= b) {
      x = STOPS_X[i + 1];
      continue;
    }
    if (t > a) {
      const u = (t - a) / (b - a);
      x = lerp(STOPS_X[i], STOPS_X[i + 1], u);
      y = GROUND - ARC * 4 * u * (1 - u); // parábola
    } else {
      x = STOPS_X[i];
    }
    break;
  }

  const sitting = t >= SIT_AT;
  if (sitting) y = GROUND + SIT_DROP * smooth(Math.min(1, (t - SIT_AT) / 0.07));

  return { x, y, sitting };
}

function PageLoader(options) {
  const { progress, visible } = usePageLoader(options);
  const pct = Math.round(progress);
  const { x, y, sitting } = getPose(progress);

  return (
    <AnimatePresence>
      {visible && (
        <Motion.div
          key="page-loader"
          role="status"
          aria-label="Cargando el sitio"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-white"
        >
          <div
            className="w-72 sm:w-96"
            style={{ containerType: "inline-size" }}
          >
            {/* Logo + capas: aquí las posiciones en % se miden solo contra el logo */}
            <div className="relative">
              <img
                src={LOGO_SRC}
                alt="IPC Instituto Privado Celendín"
                width={1437}
                height={693}
                draggable={false}
                className="block h-auto w-full select-none"
              />

              {/* Relleno de progreso sobre la línea naranja del logo */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 w-full overflow-hidden"
                style={{ top: "75.7%", height: "2.2%" }}
              >
                <div
                  className="h-full bg-[#C9600A]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Avatar: sus pies están en (x, y); salta de letra en letra */}
              <div
                role="progressbar"
                aria-label="Progreso de carga"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={pct}
                className="pointer-events-none absolute"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: "10cqw",
                  transform: "translate(-50%, -100%)",
                }}
              >
                <RunnerAvatar
                  className={`block h-auto w-full ${sitting ? "ra-sit" : ""}`}
                />
              </div>
            </div>
          </div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}

export { PageLoader };