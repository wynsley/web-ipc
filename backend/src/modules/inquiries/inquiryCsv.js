import { formatCsv, formatLimaCsvDate, safeCsvCell } from "../../infrastructure/csv.js";

export { safeCsvCell };

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
  return formatCsv(
    headers,
    rows.map((row) => [
      formatLimaCsvDate(row.createdAt),
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
      formatLimaCsvDate(row.resolvedAt),
    ]),
  );
}
