export const CANCELLED_NOTICE_GRACE_MS = 24 * 60 * 60_000;
export const POSTPONED_NOTICE_GRACE_MS = 7 * 24 * 60 * 60_000;

const NOTICE_PRIORITY = { cancelled: 0, postponed: 1, scheduled: 2 };

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
export function noticeExpiresAt(event) {
  const end = eventEndTime(event);
  if (!Number.isFinite(end)) return null;
  if (event.status === "cancelled") return end + CANCELLED_NOTICE_GRACE_MS;
  if (event.status === "postponed") return end + POSTPONED_NOTICE_GRACE_MS;
  if (event.scheduleNotice) return end;
  return null;
}
export function visibleEventNotices(events, now) {
  const notices = [];
  for (const event of events ?? []) {
    const expiresAt = noticeExpiresAt(event);
    if (expiresAt !== null && expiresAt > now) notices.push(event);
  }
  notices.sort((a, b) => {
    const pa = NOTICE_PRIORITY[a.status ?? "scheduled"] ?? 2;
    const pb = NOTICE_PRIORITY[b.status ?? "scheduled"] ?? 2;
    if (pa !== pb) return pa - pb;
    return (
      Date.parse(a.startsAt ?? a.date) - Date.parse(b.startsAt ?? b.date)
    );
  });
  return notices;
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
export function nextLifecycleBoundary(events, now) {
  let next = Infinity;
  for (const event of events ?? []) {
    const noticeExpiry = noticeExpiresAt(event);
    if (noticeExpiry !== null && noticeExpiry > now && noticeExpiry < next)
      next = noticeExpiry;
    if (event.status && event.status !== "scheduled") continue;
    const start = Date.parse(event.startsAt ?? event.date);
    if (Number.isFinite(start) && start > now && start < next) next = start;
    const end = eventEndTime(event);
    if (Number.isFinite(end) && end > now && end < next) next = end;
  }
  return Number.isFinite(next) ? next : null;
}
