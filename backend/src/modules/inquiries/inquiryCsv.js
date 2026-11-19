const STATUS_LABELS = {
  new: "Nueva",
  in_progress: "En seguimiento",
  resolved: "Resuelta",
  archived: "Archivada",
};

const CAREER_LABELS = {
  administracion: "Administración de Empresas",
  contabilidad: "Contabilidad",
  informatica: "Computación e Informática",
  idiomas: "Traducción de Idiomas",
};

const SHIFT_LABELS = {
  manana: "Mañana",
  tarde: "Tarde",
  noche: "Noche",
};

const dateFormatter = new Intl.DateTimeFormat("es-PE", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "America/Lima",
});

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

export function formatInquiriesCsv(rows) {
  const headers = [
    "Fecha (Lima)",
    "Estado",
    "Nombre",
    "Correo",
    "Teléfono",
    "Dirección",
    "Carrera",
    "Turno",
    "Mensaje",
    "Responsable",
    "Notas internas",
    "Resuelta (Lima)",
  ];
  const lines = [headers.map(safeCsvCell).join(",")];
  for (const row of rows) {
    lines.push(
      [
        dateFormatter.format(new Date(row.createdAt)),
        STATUS_LABELS[row.status] ?? row.status,
        row.name,
        row.email,
        row.phone,
        row.address,
        CAREER_LABELS[row.career] ?? row.career,
        SHIFT_LABELS[row.shift] ?? row.shift,
        row.message,
        row.assignedTo?.name ?? "Sin asignar",
        row._count?.notes ?? 0,
        row.resolvedAt ? dateFormatter.format(new Date(row.resolvedAt)) : "",
      ]
        .map(safeCsvCell)
        .join(","),
    );
  }
  return "\uFEFF" + lines.join("\r\n") + "\r\n";
}
