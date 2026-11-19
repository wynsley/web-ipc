import { useEffect, useRef, useState } from "react";
import { getEventHistory } from "../../../services/events";
import { Badge } from "../../atoms/badge";
import { Button } from "../../atoms/button";
import { Paragraph } from "../../atoms/paragraph";
import { Title } from "../../atoms/titles";
import { StatusBanner } from "../../molecules/statusBanner";
const date = new Intl.DateTimeFormat("es-PE", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/Lima",
});
const labels = {
  scheduled: "Programado",
  postponed: "Pospuesto",
  cancelled: "Cancelado",
  reschedule: "Reprogramación",
  postpone: "Aplazamiento",
  cancel: "Cancelación",
  draft_dates: "Corrección del borrador",
};
const summary = (value) =>
  labels[value.status] +
  " · " +
  date.format(new Date(value.startsAt)) +
  (value.endsAt ? " → " + date.format(new Date(value.endsAt)) : "");
export function EventHistory({ event, inline = false, onClose }) {
  const sectionRef = useRef(null);
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    sectionRef.current?.scrollIntoView?.({
      behavior: "smooth",
      block: "nearest",
    });
  }, []);
  useEffect(() => {
    let active = true;
    getEventHistory(event.id, page)
      .then((value) => {
        if (active) {
          setData(value);
          setError("");
        }
      })
      .catch((e) => {
        if (active) setError(e.message);
      });
    return () => {
      active = false;
    };
  }, [event.id, page]);
  return (
    <section
      ref={sectionRef}
      className={
        inline
          ? "grid gap-4"
          : "mt-5 grid gap-4 rounded-xl border border-line bg-card p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-3">
        <div>
          <Title level="h4" text={"Historial: " + event.title} />
          <Paragraph
            size="sm"
            text="Las fechas anteriores se conservan para consulta; no representan el horario vigente."
            className="mt-0.5"
          />
        </div>
        <Button
          variant="secondary"
          size="sm"
          text="Cerrar historial"
          onClick={onClose}
        />
      </div>
      {error && <StatusBanner role="alert" variant="danger" text={error} />}
      {!data && !error && (
        <Paragraph role="status" text="Cargando historial…" />
      )}
      {data && !data.changes.length && (
        <Paragraph text="Todavía no se han registrado cambios de horario o situación." />
      )}
      {data && data.changes.length > 0 && (
        <ol className="divide-y divide-line/60">
          {data.changes.map((change) => (
            <li key={change.id} className="grid gap-1.5 py-3.5 first:pt-0 last:pb-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Badge variant="institutional" text={labels[change.action]} />
                <Paragraph
                  size="small"
                  className="tabular-nums"
                  text={date.format(new Date(change.createdAt))}
                />
              </div>
              <Paragraph
                size="sm"
                variant="ink"
                weight="semi"
                text={change.actorName + ": " + change.reason}
              />
              <Paragraph
                size="small"
                className="tabular-nums"
                text={"Antes: " + summary(change.before)}
              />
              <Paragraph
                size="small"
                className="tabular-nums"
                text={"Después: " + summary(change.after)}
              />
            </li>
          ))}
        </ol>
      )}
      {(page > 1 || data?.hasMore) && (
        <div className="flex flex-wrap gap-3 border-t border-line/60 pt-3">
          {page > 1 && (
            <Button
              variant="secondary"
              size="sm"
              text="Página anterior"
              onClick={() => {
                setData(null);
                setPage((p) => p - 1);
              }}
            />
          )}
          {data?.hasMore && (
            <Button
              variant="secondary"
              size="sm"
              text="Más cambios"
              onClick={() => {
                setData(null);
                setPage((p) => p + 1);
              }}
            />
          )}
        </div>
      )}
    </section>
  );
}
