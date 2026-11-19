import { formatCsv, formatLimaCsvDate } from "../../infrastructure/csv.js";

const ROLE_LABELS = {
  admin: "Administración",
  admissions: "Admisión",
  events: "Eventos",
};

const CATEGORY_LABELS = {
  auth: "Seguridad",
  admin: "Cuentas",
  event: "Eventos",
  image: "Medios",
  inquiry: "Admisión",
  audit: "Auditoría",
  content: "Contenido",
};

export function formatAuditCsv(rows) {
  const headers = [
    "Fecha (Lima)",
    "Módulo",
    "Acción",
    "Actor",
    "Rol",
    "Cuenta afectada",
    "ID objetivo",
    "ID solicitud",
  ];
  return formatCsv(
    headers,
    rows.map((row) => [
      formatLimaCsvDate(row.createdAt),
      CATEGORY_LABELS[row.category] ?? row.category,
      row.action,
      row.actor ? row.actor.name : "Sistema / Público",
      row.actor ? (ROLE_LABELS[row.actor.role] ?? row.actor.role) : "Sistema",
      row.targetAdmin ? row.targetAdmin.name : "",
      row.targetId ?? "",
      row.requestId,
    ]),
  );
}
