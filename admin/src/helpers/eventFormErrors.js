export function normalizeEventErrors(fields = {}) {
  const errors = {};
  for (const [path, messages] of Object.entries(fields)) {
    const name = path.split(".")[0];
    errors[name] ??= Array.isArray(messages)
      ? messages.join(" ")
      : String(messages);
  }
  return errors;
}
export function validateEventForm(form) {
  const errors = {};
  for (const control of form.elements) {
    if (control.name && control.willValidate && !control.validity.valid) {
      errors[control.name] = control.validity.valueMissing
        ? "Completa este campo."
        : control.type === "url"
          ? "Introduce un enlace HTTPS válido."
          : "Revisa el valor de este campo.";
    }
  }
  const start = form.elements.namedItem("startsAt").value;
  const end = form.elements.namedItem("endsAt").value;
  if (start && end && end <= start)
    errors.endsAt = "La finalización debe ser posterior al inicio.";
  const highlights = form.elements
    .namedItem("highlights")
    .value.split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  if (highlights.length > 4 || highlights.some((line) => line.length > 160))
    errors.highlights =
      "Introduce hasta cuatro puntos destacados de 160 caracteres cada uno.";
  return errors;
}
export function focusEventError(form, errors) {
  const first = [...form.elements].find(
    (control) => errors[control.name] && control.focus,
  );
  (first || form.querySelector('[role="alert"]'))?.focus();
}
