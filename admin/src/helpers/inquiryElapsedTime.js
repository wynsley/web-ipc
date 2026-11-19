const MINUTE_MS = 60_000;
const HOUR_MS = 3_600_000;
const DAY_MS = 86_400_000;

export function formatRelativeElapsed(elapsedMs) {
  const safeMs = Math.max(0, Number(elapsedMs) || 0);
  if (safeMs < MINUTE_MS) return "Hace un momento";
  const minutes = Math.floor(safeMs / MINUTE_MS);
  if (minutes < 60) return `Hace ${minutes} min`;
  const hours = Math.floor(safeMs / HOUR_MS);
  if (hours < 24) return `Hace ${hours} h`;
  const days = Math.floor(safeMs / DAY_MS);
  if (days < 7) return days === 1 ? "Hace 1 día" : `Hace ${days} días`;
  const weeks = Math.floor(days / 7);
  if (days < 30) return weeks === 1 ? "Hace 1 sem." : `Hace ${weeks} sem.`;
  const months = Math.floor(days / 30);
  return months === 1 ? "Hace 1 mes" : `Hace ${months} meses`;
}

export function inquiryElapsedInfo(inquiry, nowMs) {
  const createdMs = Date.parse(inquiry?.createdAt);
  if (!Number.isFinite(createdMs)) {
    return { label: "", isOverdue: false, isWarning: false };
  }
  const elapsedMs = Math.max(0, nowMs - createdMs);
  const hours = elapsedMs / HOUR_MS;
  return {
    label: formatRelativeElapsed(elapsedMs),
    isOverdue: inquiry.status === "new" && hours >= 24,
    isWarning: inquiry.status === "new" && hours >= 6 && hours < 24,
  };
}
