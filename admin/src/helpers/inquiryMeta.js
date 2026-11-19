export const INQUIRY_STATUS_TABS = [
  { id: "new", label: "Nuevas" },
  { id: "in_progress", label: "En seguimiento" },
  { id: "resolved", label: "Resueltas" },
  { id: "archived", label: "Archivadas" },
  { id: "all", label: "Todas" },
];

export const INQUIRY_STATUS_META = {
  new: {
    label: "Nueva",
    variant: "warning",
    accent: "border-l-[#f59e0b]",
  },
  in_progress: {
    label: "En seguimiento",
    variant: "institutional",
    accent: "border-l-blue-light",
  },
  resolved: {
    label: "Resuelta",
    variant: "success",
    accent: "border-l-[#34d399]",
  },
  archived: {
    label: "Archivada",
    variant: "neutral",
    accent: "border-l-muted/50",
  },
};

export const INQUIRY_TAB_HINTS = {
  new: "Al tomar una consulta, asignar responsable o escribir la primera nota interna, pasa automáticamente a En seguimiento.",
  resolved:
    "Las consultas resueltas se archivan automáticamente 30 días después de su resolución.",
};

export const INQUIRY_CAREER_LABELS = {
  administracion: "Administración de Empresas",
  contabilidad: "Contabilidad",
  informatica: "Informática y Sistemas",
  idiomas: "Idiomas (Inglés)",
};

export const INQUIRY_CAREER_OPTIONS = [
  { value: "all", text: "Todas las carreras" },
  ...Object.entries(INQUIRY_CAREER_LABELS).map(([value, text]) => ({
    value,
    text,
  })),
];

export const INQUIRY_SHIFT_LABELS = {
  manana: "Mañana",
  tarde: "Tarde",
  noche: "Noche",
};

export const INQUIRY_SHIFT_OPTIONS = [
  { value: "all", text: "Todos los turnos" },
  ...Object.entries(INQUIRY_SHIFT_LABELS).map(([value, text]) => ({
    value,
    text,
  })),
];

export const INQUIRY_EMPTY_MESSAGES = {
  new: "No hay consultas nuevas pendientes de revisión.",
  in_progress: "No hay consultas en seguimiento en este momento.",
  resolved: "Todavía no hay consultas marcadas como resueltas.",
  archived: "No hay consultas archivadas.",
  all: "Todavía no hay consultas registradas.",
};

export function inquiryStatusInfo(status) {
  return (
    INQUIRY_STATUS_META[status] ?? {
      label: status,
      variant: "neutral",
      accent: "border-l-muted/50",
    }
  );
}

export function inquiryNextActions(inquiry) {
  if (inquiry.status === "new") {
    return [
      inquiry.assignedToId
        ? {
            id: "start",
            type: "status",
            nextStatus: "in_progress",
            label: "Iniciar seguimiento",
            variant: "primary",
          }
        : {
            id: "claim",
            type: "claim",
            label: "Tomar y atender",
            variant: "primary",
          },
      {
        id: "archive",
        type: "status",
        nextStatus: "archived",
        label: "Archivar",
        variant: "outline",
      },
    ];
  }

  if (inquiry.status === "in_progress") {
    const actions = [];
    if (!inquiry.assignedToId) {
      actions.push({
        id: "claim",
        type: "claim",
        label: "Tomar consulta",
        variant: "secondary",
      });
    }
    actions.push(
      {
        id: "resolve",
        type: "status",
        nextStatus: "resolved",
        label: "Marcar como resuelta",
        variant: "primary",
      },
      {
        id: "archive",
        type: "status",
        nextStatus: "archived",
        label: "Archivar",
        variant: "outline",
      },
    );
    return actions;
  }

  if (inquiry.status === "resolved") {
    return [
      {
        id: "reopen",
        type: "status",
        nextStatus: "in_progress",
        label: "Reabrir seguimiento",
        variant: "secondary",
      },
      {
        id: "archive",
        type: "status",
        nextStatus: "archived",
        label: "Archivar",
        variant: "outline",
      },
    ];
  }

  if (inquiry.status === "archived") {
    return [
      {
        id: "reopen",
        type: "status",
        nextStatus: "in_progress",
        label: "Reabrir seguimiento",
        variant: "secondary",
      },
    ];
  }

  return [];
}

export function inquiryStatusNotice(previousStatus, nextStatus) {
  if (nextStatus === "resolved") {
    return "Consulta marcada como resuelta. Se archivará automáticamente a los 30 días.";
  }
  if (nextStatus === "archived") {
    return "Consulta archivada.";
  }
  if (
    nextStatus === "in_progress" &&
    (previousStatus === "resolved" || previousStatus === "archived")
  ) {
    return "Seguimiento reabierto. La consulta volvió a En seguimiento.";
  }
  return `Estado actualizado a «${inquiryStatusInfo(nextStatus).label}».`;
}
