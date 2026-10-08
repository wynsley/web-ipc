import { FaDownload, FaEllipsisH, FaGoogle } from "react-icons/fa";
import { buildGoogleCalendarUrl, downloadIcs } from "../../../../utils/calendarLinks";
import { useModal } from "@/hooks/modal/useModal";
import { useClickOutside } from "@/hooks/modal/usClickOutside";

const itemClass =
  "flex w-full items-center gap-3 px-4 py-2.5 text-left font-poppins text-sm text-neutral-800 transition hover:bg-blue-deep/10";

function AddToCalendarMenu({ event }) {
  const {isOpen, closeModal, toggleModal} = useModal()

  const modalRef = useClickOutside(closeModal)
  return (
    <div
      ref={modalRef}
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
        onClick={toggleModal}
        className="flex h-8 w-8 items-center justify-center text-neutral-500 transition hover:bg-blue-deep/10 hover:text-blue-deep"
      >
        <FaEllipsisH aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full rounded-xl z-20 mt-1 w-64 border border-blue-deep/15 bg-white py-1 shadow-lg"
        >
          <a
            role="menuitem"
            href={buildGoogleCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeModal}
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
              closeModal;
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