import { useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion as Motion } from "motion/react";

const MODAL_WIDTH = 288; 
const GAP = 10;
const MARGIN = 12;

function AsignaturesModal({
  open,
  anchorRef,
  name,
  subjects = [],
  onMouseEnter,
  onMouseLeave,
  onClose,
}) {
  const [pos, setPos] = useState(null);

  // Calcula la posición junto al botón (arriba o abajo según el espacio)
  useLayoutEffect(() => {
    if (!open || !anchorRef?.current) return;

    const update = () => {
      const rect = anchorRef.current.getBoundingClientRect();

      const left = Math.min(
        Math.max(rect.left + rect.width / 2 - MODAL_WIDTH / 2, MARGIN),
        window.innerWidth - MODAL_WIDTH - MARGIN
      );

      const showAbove = rect.top > window.innerHeight / 2;

      setPos(
        showAbove
          ? { left, bottom: window.innerHeight - rect.top + GAP, above: true }
          : { left, top: rect.bottom + GAP, above: false }
      );
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [open, anchorRef]);

  // Cerrar con Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && pos && (
        <Motion.div
          role="dialog"
          aria-label={`Asignaturas de ${name}`}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          initial={{ opacity: 0, y: pos.above ? 6 : -6, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: pos.above ? 6 : -6, scale: 0.97 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          style={{
            position: "fixed",
            left: pos.left,
            top: pos.top,
            bottom: pos.bottom,
            width: MODAL_WIDTH,
          }}
          className="z-50 rounded-xl border border-blue-deep/10 bg-white p-5 shadow-xl"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-hani text-xs font-bold uppercase tracking-wide text-blue-deep">
                Asignaturas
              </p>
              <p className="mt-0.5 font-poppins text-sm font-medium text-neutral-black">
                {name}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="-mr-1 -mt-1 rounded-full p-1 text-neutral-dark/50 transition-colors hover:bg-blue-deep/10 hover:text-blue-deep"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <ul className="mt-4 space-y-2">
            {subjects.map((subject) => (
              <li
                key={subject}
                className="flex items-start gap-2 font-poppins text-sm leading-snug text-neutral-dark/80"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-deep" />
                {subject}
              </li>
            ))}
          </ul>
        </Motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export { AsignaturesModal };