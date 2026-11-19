import { useState } from "react";
import { AnimatePresence, motion as Motion } from "motion/react";
import {
  FaBullhorn,
  FaChevronLeft,
  FaChevronRight,
  FaListUl,
} from "react-icons/fa";
import { Title } from "@/components/atoms/titles";
import { EventNoticeCard } from "@/components/molecules/events/eventNoticeCard";
import { EventNoticesModal } from "@/components/modals/eventNoticesModal";
import { useMotionPreference } from "@/hooks/globals/useMotionPreference";

function buildSummary(events) {
  const counts = { cancelled: 0, postponed: 0, scheduled: 0 };
  for (const event of events) {
    const key = event.status in counts ? event.status : "scheduled";
    counts[key]++;
  }
  const parts = [];
  if (counts.cancelled)
    parts.push(
      `${counts.cancelled} ${counts.cancelled === 1 ? "cancelado" : "cancelados"}`,
    );
  if (counts.postponed)
    parts.push(
      `${counts.postponed} ${counts.postponed === 1 ? "pospuesto" : "pospuestos"}`,
    );
  if (counts.scheduled)
    parts.push(
      `${counts.scheduled} ${counts.scheduled === 1 ? "reprogramado" : "reprogramados"}`,
    );
  return parts.join(" · ");
}

export function EventNotices({ events }) {
  const [index, setIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const reducedMotion = useMotionPreference();

  if (!events.length) return null;

  const total = events.length;
  const safeIndex = index < total ? index : 0;
  const activeEvent = events[safeIndex];
  const multiple = total > 1;

  const goPrev = () => setIndex((safeIndex - 1 + total) % total);
  const goNext = () => setIndex((safeIndex + 1) % total);

  return (
    <section
      aria-label="Avisos de cambios en la agenda"
      className="mx-auto w-full max-w-6xl px-5 pb-10 sm:px-6"
    >
      <div className="overflow-hidden rounded-xl border border-blue-dark/15 bg-blue-dark/[0.04] shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-dark/12 bg-blue-deep px-4 py-3 text-white sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange/20 text-orange">
              <FaBullhorn aria-hidden="true" className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Title
                  level="h2"
                  text="Cambios en la agenda"
                  weight="bold"
                  variant="primary"
                  className="font-hani text-xl leading-none tracking-wide uppercase sm:text-2xl"
                />
                <span className="rounded-full bg-orange px-2 py-0.5 font-poppins text-xs font-bold text-white tabular-nums">
                  {total}
                </span>
              </div>
              {multiple && (
                <p className="mt-0.5 font-poppins text-xs text-white/75">
                  {buildSummary(events)}
                </p>
              )}
            </div>
          </div>

          {multiple && (
            <div className="flex flex-wrap items-center gap-2">
              <div
                role="group"
                aria-label="Navegar avisos"
                className="flex items-center rounded-lg border border-white/15 bg-white/10"
              >
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Aviso anterior"
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-l-lg text-white transition hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                >
                  <FaChevronLeft aria-hidden="true" className="h-3.5 w-3.5" />
                </button>
                <span
                  aria-live="polite"
                  className="min-w-12 px-2 text-center font-poppins text-xs font-semibold text-white tabular-nums"
                >
                  {safeIndex + 1} / {total}
                </span>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Aviso siguiente"
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-r-lg text-white transition hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                >
                  <FaChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-lg bg-orange px-3.5 py-2 font-poppins text-xs font-semibold text-white transition hover:bg-orange/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-sm"
              >
                <FaListUl aria-hidden="true" className="h-3.5 w-3.5" />
                <span>Ver todos ({total})</span>
              </button>
            </div>
          )}
        </div>

        <div className="p-4 sm:p-5">
          {reducedMotion ? (
            <EventNoticeCard event={activeEvent} compact />
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <Motion.div
                key={activeEvent.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <EventNoticeCard event={activeEvent} compact />
              </Motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {modalOpen && (
        <EventNoticesModal
          events={events}
          onClose={() => setModalOpen(false)}
        />
      )}
    </section>
  );
}
