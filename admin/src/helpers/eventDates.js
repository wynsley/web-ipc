const displayFormatter = new Intl.DateTimeFormat("es-PE", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/Lima",
});

const inputFormatter = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "America/Lima",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export function formatLimaDateTime(value) {
  return displayFormatter.format(new Date(value));
}

export function formatLimaRange(startsAt, endsAt) {
  return (
    formatLimaDateTime(startsAt) +
    (endsAt ? " → " + formatLimaDateTime(endsAt) : "")
  );
}

export function toLimaInputValue(value) {
  return value ? inputFormatter.format(new Date(value)).replace(" ", "T") : "";
}

export function fromLimaInputValue(value, originalInput, originalIso) {
  if (!value) return null;
  return originalIso && originalInput === value
    ? originalIso
    : value + ":00-05:00";
}
