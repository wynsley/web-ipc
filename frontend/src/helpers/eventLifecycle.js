export function eventEndTime(event) {
  if (event.endsAt) return Date.parse(event.endsAt);
  const start = new Date(event.startsAt ?? event.date);
  if (!Number.isFinite(start.getTime())) return NaN;
  // Los registros anteriores sin finalización conservan vigencia hasta el fin del día en Lima.
  const limaDay = new Date(start.getTime() - 5 * 3600000)
    .toISOString()
    .slice(0, 10);
  return Date.parse(limaDay + "T23:59:59.999-05:00");
}
export function partitionEvents(events, now) {
  const active = [];
  const past = [];
  const exceptions = [];
  for (const event of events ?? []) {
    if (event.status && event.status !== "scheduled") exceptions.push(event);
    else (eventEndTime(event) <= now ? past : active).push(event);
  }
  active.sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
  past.sort((a, b) => eventEndTime(b) - eventEndTime(a));
  return { active, past, exceptions };
}
