import { AnimatePresence, motion as Motion } from "motion/react";
import { usePageLoader } from "@/hooks/globals/usePageLoader";
import { RunnerAvatar } from "./runnerAvatar";

const LOGO_SRC = `${import.meta.env.BASE_URL}loader-logo.webp`;

function PageLoader(options) {
  const { progress, visible } = usePageLoader(options);
  const pct = Math.round(progress);

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
          {/* --av = ancho del avatar (ahora la mitad que antes) */}
          <div
            className="w-64 sm:w-80 [--av:1.25rem] sm:[--av:1.625rem]"
            style={{ containerType: "inline-size" }}
            data-loader-ignore
          >
            <img
              src={LOGO_SRC}
              alt="IPC"
              width={919}
              height={232}
              draggable={false}
              className="block h-auto w-full select-none"
            />

            {/* Carril del avatar: alto = ancho × 56/48 */}
            <div
              aria-hidden="true"
              className="pointer-events-none relative z-10 -mt-[1.25rem] h-[1.458rem] sm:-mt-[1.65rem] sm:h-[1.896rem]"
            >
              <div
                className="absolute bottom-0 left-0 flex h-full justify-end transition-[width] duration-100 ease-linear motion-reduce:transition-none"
                style={{ width: `max(var(--av), ${progress}%)` }}
              >
                <div className="relative h-full" style={{ width: "var(--av)" }}>
                  <RunnerAvatar className="h-full w-full" />
                  <span
                    className="absolute right-full top-1/2 mr-1.5 -translate-y-1/2 whitespace-nowrap font-euro font-bold leading-none tabular-nums text-orange"
                    style={{ fontSize: "5cqw" }}
                  >
                    {pct}%
                  </span>
                </div>
              </div>
            </div>

            {/* Barra con el mismo grosor que la línea naranja del logo */}
            <div
              role="progressbar"
              aria-label="Progreso de carga"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={pct}
              className="h-2 w-full overflow-hidden bg-orange/20 sm:h-1.5 rounded-full"
            >
              <div
                className="h-full w-full origin-left bg-orange transition-transform duration-100 ease-linear motion-reduce:transition-none"
                style={{ transform: `scaleX(${progress / 100})` }}
              />
            </div>

            {/* Texto del tamaño del logo, repartido de borde a borde */}
            <p
              className="flex justify-around font-euro font-bold text-blue"
              style={{
                fontSize: "7.3cqw",
                lineHeight: 1,
                marginTop: "1cqw",
                letterSpacing: "-0.01em",
              }}
            >
              <span>Instituto</span> <span>Privado</span> <span>Celendín</span>
            </p>
          </div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}

export { PageLoader };