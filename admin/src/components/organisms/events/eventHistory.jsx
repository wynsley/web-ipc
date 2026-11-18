import { useEffect, useState } from "react";
import { getEventHistory } from "../../../services/events";
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
export function EventHistory({ event, onClose }) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
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
    <section className="mt-5 grid gap-3 rounded-lg border border-line bg-white p-5">
      <Title level="h4" text={"Historial: " + event.title} />
      <Paragraph text="Las fechas anteriores se conservan para consulta; no representan el horario vigente." />
      {error && <StatusBanner role="alert" variant="danger" text={error} />}
      {!data && !error && (
        <Paragraph role="status" text="Cargando historial…" />
      )}
      {data && !data.changes.length && (
        <Paragraph text="Todavía no se han registrado cambios de horario o situación." />
      )}
      <ol className="grid gap-4">
        {data?.changes.map((change) => (
          <li key={change.id} className="border-b border-line pb-3">
            <Paragraph
              className="font-bold"
              text={
                labels[change.action] +
                " · " +
                date.format(new Date(change.createdAt))
              }
            />
            <Paragraph text={change.actorName + ": " + change.reason} />
            <Paragraph text={"Antes: " + summary(change.before)} />
            <Paragraph text={"Después: " + summary(change.after)} />
          </li>
        ))}
      </ol>
      <div className="flex flex-wrap gap-3">
        {page > 1 && (
          <Button
            text="Página anterior"
            onClick={() => {
              setData(null);
              setPage((p) => p - 1);
            }}
          />
        )}
        {data?.hasMore && (
          <Button
            text="Más cambios"
            onClick={() => {
              setData(null);
              setPage((p) => p + 1);
            }}
          />
        )}
        <Button variant="secondary" text="Cerrar historial" onClick={onClose} />
      </div>
    </section>
  );
}
