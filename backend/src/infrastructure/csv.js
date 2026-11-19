const dateFormatter = new Intl.DateTimeFormat("es-PE", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "America/Lima",
});

export function formatLimaCsvDate(value) {
  return value ? dateFormatter.format(new Date(value)) : "";
}

// Neutraliza fórmulas de hojas de cálculo (CSV/Formula Injection) y aplica escape RFC 4180.
export function safeCsvCell(raw) {
  let value = raw === null || raw === undefined ? "" : String(raw);
  value = value.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  if (/^[\t ]*[=+\-@]/.test(value) || value.startsWith("\t")) {
    value = "'" + value;
  }
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function formatCsv(headers, rows) {
  const lines = [headers.map(safeCsvCell).join(",")];
  for (const cells of rows) {
    lines.push(cells.map(safeCsvCell).join(","));
  }
  return "\uFEFF" + lines.join("\r\n") + "\r\n";
}
