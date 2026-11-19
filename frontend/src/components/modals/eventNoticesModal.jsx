import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaBullhorn, FaTimes } from "react-icons/fa";
import { EventNoticeCard } from "@/components/molecules/events/eventNoticeCard";
import { Paragraph } from "@/components/atoms/paragraph";
import { Title } from "@/components/atoms/titles";
import { useDialogFocus } from "@/hooks/modal/useDialogFocus";

const FILTERS = [
  { id: "all", label: "Todos" },
  { id: "cancelled", label: "Cancelados" },
  { id: "postponed", label: "Pospuestos" },
  { id: "scheduled", label: "Reprogramados" },
];

function EventNoticesModal({ events, onClose }) {
  const dialogRef = useDialogFocus();
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const counts = {
    all: events.length,
    cancelled: events.filter((e) => e.status === "cancelled").length,
    postponed: events.filter((e) => e.status === "postponed").length,
    scheduled: events.filter((e) => !e.status || e.status === "scheduled")
      .length,
  };

  const activeFilters = FILTERS.filter(
    (item) => item.id === "all" || counts[item.id] > 0,
  );
  const currentFilter = counts[filter] > 0 ? filter : "all";
  const filtered =
    currentFilter === "all"
      ? events
      : events.filter((e) => (e.status ?? "scheduled") === currentFilter);

  return createPortal(
    <div
      className="fixed inset-0 z-1000 flex items-center justify-center bg-blue-deep/65 p-3 backdrop-blur-[2px] sm:p-6"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-notices-modal-title"
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[88dvh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-neutral-white shadow-2xl"
      >
        <header className="flex items-start justify-between gap-4 bg-blue-deep px-5 py-4 text-white sm:px-6">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange/20 text-orange">
              <FaBullhorn aria-hidden="true" className="h-4 w-4" />
            </span>
            <div>
              <Title
                id="event-notices-modal-title"
                level="h2"
                text="Cambios en la agenda"
                weight="bold"
                variant="primary"
                className="font-hani text-2xl leading-tight"
              />
              <Paragraph
                size="small"
                variant="inherit"
                text={`${events.length} ${events.length === 1 ? "aviso vigente" : "avisos vigentes"} sobre reprogramaciones, aplazamientos o cancelaciones.`}
                className="mt-0.5 text-white/75"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar avisos de agenda"
            className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          >
            <FaTimes aria-hidden="true" className="h-5 w-5" />
          </button>
        </header>

        {activeFilters.length > 2 && (
          <div
            role="group"
            aria-label="Filtrar avisos por tipo"
            className="flex flex-wrap gap-2 border-b border-blue-dark/12 bg-blue-dark/5 px-5 py-3 sm:px-6"
          >
            {activeFilters.map((item) => {
              const pressed = currentFilter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => setFilter(item.id)}
                  className={`inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1 font-poppins text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-dark ${
                    pressed
                      ? "border-blue-deep bg-blue-deep text-white"
                      : "border-blue-dark/20 bg-white text-blue-deep hover:border-blue-dark/45"
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.25 text-[0.7rem] tabular-nums ${
                      pressed ? "bg-white/20 text-white" : "bg-blue-dark/10"
                    }`}
                  >
                    {counts[item.id]}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        <ul className="grid gap-3 overflow-y-auto bg-blue-dark/[0.03] p-5 sm:p-6">
          {filtered.map((event) => (
            <li key={event.id}>
              <EventNoticeCard event={event} />
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body,
  );
}

export { EventNoticesModal };
