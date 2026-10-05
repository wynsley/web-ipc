import { useCallback, useEffect, useRef, useState } from "react";
import { AsignaturesModal } from "@/components/modals/asignaturesModal";
import { Paragraph } from "@/components/atoms/paragraph";
function CardOurTeam({
  name,
  profession,
  position,
  description,
  photo,
  subjects = [],
  onContact,
}) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const closeTimer = useRef(null);

  const openModal = useCallback(() => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  }, []);

  // Pequeño delay para poder mover el mouse del botón al modal sin que se cierre
  const closeModal = useCallback(() => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }, []);

  const closeNow = useCallback(() => {
    clearTimeout(closeTimer.current);
    setOpen(false);
  }, []);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  return (
    <div
      className="
        flex h-full flex-col overflow-hidden  bg-white shadow-medium
        transition-transform duration-300 ease-out
        hover:z-10 hover:scale-[1.04] hover:shadow-xl
      "
    >
      <div className="relative h-40 w-full overflow-hidden md:h-45">
        <img
          src={photo}
          alt={name}
          draggable={false}
          className="h-full w-full select-none object-cover object-top"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-3 px-5 pb-5">
        <div>
          <div className="flex flex-col ">
            <p className="mt-3 font-hani text-base font-bold text-neutral-black sm:text-lg">
            {name}
            </p>
            <small>{profession}</small>
          </div>
          <Paragraph
            size="small"
            text={description}
            variant="secondary"
            className="mt-3"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            ref={buttonRef}
            type="button"
            aria-haspopup="dialog"
            aria-expanded={open}
            onMouseEnter={openModal}
            onMouseLeave={closeModal}
            onFocus={openModal}
            onBlur={closeModal}
            onClick={openModal}
            className="
              flex-1 rounded-full border border-blue-deep
              px-3 py-1.5
              font-hani text-xs font-bold text-blue-deep
              transition-colors duration-200
              hover:bg-blue-deep hover:text-white
            "
          >
            Asignaturas
          </button>

          <button
            type="button"
            onClick={() => onContact?.({ name, position })}
            className="
              flex-1 rounded-full border border-orange bg-orange
              px-3 py-1.5
              font-hani text-xs font-bold text-white
              transition-colors duration-200
              hover:bg-transparent hover:text-orange
            "
          >
            Contáctanos
          </button>
        </div>
      </div>

      <AsignaturesModal
        open={open}
        anchorRef={buttonRef}
        name={name}
        subjects={subjects}
        onMouseEnter={openModal}
        onMouseLeave={closeModal}
        onClose={closeNow}
      />
    </div>
  );
}

export { CardOurTeam };