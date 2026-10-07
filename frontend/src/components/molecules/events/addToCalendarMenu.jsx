import { useEffect, useRef, useState } from "react";
import { FaDownload, FaEllipsisH, FaGoogle } from "react-icons/fa";
import { buildGoogleCalendarUrl, downloadIcs } from "../../../../utils/calendarLinks";

const itemClass =
  "flex w-full items-center gap-3 px-4 py-2.5 text-left font-poppins text-sm text-neutral-800 transition hover:bg-blue-deep/10";

function AddToCalendarMenu({ event }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Cierra al hacer clic fuera.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onKeyDown={(e) => {
        // Esc cierra solo el menú, no el modal completo.
        if (e.key === "Escape" && open) {
          e.stopPropagation();
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Agregar "${event.title}" a mi calendario`}
        onClick={() => setOpen((o) => !o)}
        className="flex h-8 w-8 items-center justify-center text-neutral-500 transition hover:bg-blue-deep/10 hover:text-blue-deep"
      >
        <FaEllipsisH aria-hidden="true" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-20 mt-1 w-64 border border-blue-deep/15 bg-white py-1 shadow-lg"
        >
          <a
            role="menuitem"
            href={buildGoogleCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className={itemClass}
          >
            <FaGoogle className="shrink-0 text-blue-deep" aria-hidden="true" />
            Agregar a Google Calendar
          </a>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              downloadIcs(event);
              setOpen(false);
            }}
            className={itemClass}
          >
            <FaDownload className="shrink-0 text-blue-deep" aria-hidden="true" />
            Descargar .ics (Apple, Outlook)
          </button>
        </div>
      )}
    </div>
  );
}

export { AddToCalendarMenu };