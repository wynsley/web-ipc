export const AUDIT_CATEGORY_TABS = [
  { id: "all", label: "Todas" },
  { id: "auth", label: "Seguridad" },
  { id: "admin", label: "Cuentas" },
  { id: "event", label: "Eventos" },
  { id: "inquiry", label: "Admisión" },
  { id: "image", label: "Medios" },
  { id: "audit", label: "Auditoría" },
  { id: "content", label: "Contenido" },
];

export const AUDIT_CATEGORY_LABELS = {
  auth: "Seguridad",
  admin: "Cuentas",
  event: "Eventos",
  inquiry: "Admisión",
  image: "Medios",
  audit: "Auditoría",
  content: "Contenido",
  other: "Otros",
};

const SEVERITY_STYLES = {
  danger: { variant: "danger", accent: "border-l-[#f87171]" },
  warning: { variant: "warning", accent: "border-l-[#f59e0b]" },
  success: { variant: "success", accent: "border-l-[#34d399]" },
  institutional: { variant: "institutional", accent: "border-l-blue-light" },
  neutral: { variant: "neutral", accent: "border-l-muted/50" },
};

export const AUDIT_ACTION_META = {
  // Seguridad y sesiones
  "auth.login": { label: "Inicio de sesión", severity: "institutional" },
  "auth.logout": { label: "Cierre de sesión", severity: "neutral" },
  "auth.refresh": { label: "Renovación de sesión", severity: "neutral" },
  "auth.refresh_reuse": {
    label: "Alerta: reutilización de token de renovación",
    severity: "danger",
  },
  "auth.mfa_enrolled": {
    label: "Activación de autenticador MFA",
    severity: "success",
  },
  "auth.mfa_recovery": {
    label: "Acceso con código de recuperación MFA",
    severity: "warning",
  },
  "auth.password_changed": {
    label: "Cambio de contraseña propia",
    severity: "warning",
  },
  "auth.recovery_codes_replaced": {
    label: "Regeneración de códigos de recuperación",
    severity: "warning",
  },
  "auth.password_recovered": {
    label: "Recuperación de contraseña completada",
    severity: "warning",
  },
  "auth.factor_recovered": {
    label: "Restablecimiento de contraseña y MFA completado",
    severity: "warning",
  },

  // Cuentas administrativas
  "admin.bootstrap": {
    label: "Creación de administrador inicial (CLI)",
    severity: "warning",
  },
  "admin.register": {
    label: "Invitación de nueva cuenta",
    severity: "institutional",
  },
  "admin.activate": {
    label: "Activación de cuenta con código",
    severity: "success",
  },
  "admin.activation_reissued": {
    label: "Reemisión de código de activación",
    severity: "warning",
  },
  "admin.deactivate": {
    label: "Desactivación de cuenta",
    severity: "danger",
  },
  "admin.password_recovery_issued": {
    label: "Emisión de código para recuperar contraseña",
    severity: "warning",
  },
  "admin.factor_recovery_issued": {
    label: "Emisión de código para restablecer contraseña y MFA",
    severity: "warning",
  },

  // Eventos
  "event.created": {
    label: "Borrador de evento creado",
    severity: "institutional",
  },
  "event.edited": {
    label: "Borrador de evento editado",
    severity: "neutral",
  },
  "event.published": {
    label: "Evento publicado en la web",
    severity: "success",
  },
  "event.withdrawn": {
    label: "Evento retirado a borrador",
    severity: "warning",
  },
  "event.reschedule": {
    label: "Evento reprogramado",
    severity: "warning",
  },
  "event.postpone": {
    label: "Evento pospuesto sin fecha",
    severity: "warning",
  },
  "event.cancel": {
    label: "Evento cancelado",
    severity: "danger",
  },
  "event.deleted": {
    label: "Borrador de evento eliminado",
    severity: "danger",
  },

  // Medios
  "image.uploaded": {
    label: "Imagen subida al servidor",
    severity: "institutional",
  },

  // Admisión / Consultas
  "inquiry.created": {
    label: "Nueva consulta pública recibida",
    severity: "institutional",
  },
  "inquiry.claimed": {
    label: "Consulta tomada para seguimiento",
    severity: "institutional",
  },
  "inquiry.assigned": {
    label: "Responsable de consulta actualizado",
    severity: "institutional",
  },
  "inquiry.status_changed": {
    label: "Estado de consulta actualizado",
    severity: "neutral",
  },
  "inquiry.note_added": {
    label: "Nota interna registrada en consulta",
    severity: "neutral",
  },
  "inquiry.exported": {
    label: "Exportación CSV de consultas",
    severity: "warning",
  },
  "inquiry.auto_archived": {
    label: "Consulta archivada automáticamente (30 días)",
    severity: "neutral",
  },

  // Auditoría
  "audit.exported": {
    label: "Exportación CSV de auditoría",
    severity: "warning",
  },
};

export function auditActionInfo(action, category) {
  const known = AUDIT_ACTION_META[action];
  const severity = known?.severity ?? "neutral";
  const style = SEVERITY_STYLES[severity] ?? SEVERITY_STYLES.neutral;
  const resolvedCategory =
    category || String(action ?? "").split(".")[0] || "other";

  return {
    label: known?.label ?? action,
    severity,
    variant: style.variant,
    accent: style.accent,
    categoryLabel:
      AUDIT_CATEGORY_LABELS[resolvedCategory] ?? AUDIT_CATEGORY_LABELS.other,
  };
}
