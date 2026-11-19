export function eventSituation(event, now = Date.now()) {
  if (event.status === "postponed") return "Pospuesto · Fecha por confirmar";
  if (event.status === "cancelled") return "Cancelado";
  const start = Date.parse(event.startsAt);
  if (now < start) return "Programado";
  const limaDay = new Date(start - 5 * 3600000).toISOString().slice(0, 10);
  const end = event.endsAt
    ? Date.parse(event.endsAt)
    : Date.parse(limaDay + "T23:59:59.999-05:00");
  return now >= end ? "Finalizado" : "En curso";
}
