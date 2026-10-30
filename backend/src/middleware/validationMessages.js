export function validationMessage(issue) {
  switch (issue.code) {
    case "invalid_type":
      return "Este campo es obligatorio o tiene un tipo incorrecto.";
    case "invalid_format":
      return issue.format === "email" ? "Introduce un correo válido." : "El formato no es válido.";
    case "too_small":
      return issue.origin === "string"
        ? `Debe tener al menos ${issue.minimum} caracteres.`
        : "El valor es menor de lo permitido.";
    case "too_big":
      return issue.origin === "string"
        ? `Debe tener como máximo ${issue.maximum} caracteres.`
        : "El valor supera lo permitido.";
    case "invalid_value":
      return "Selecciona una de las opciones permitidas.";
    case "unrecognized_keys":
      return "Se enviaron campos no permitidos.";
    default:
      return "El valor no es válido.";
  }
}

export function validationFields(issues) {
  const fields = Object.create(null);
  for (const issue of issues) {
    const path = issue.path.length ? issue.path.join(".") : "_form";
    fields[path] ??= [];
    if (!fields[path].includes(issue.message)) fields[path].push(issue.message);
  }
  return fields;
}
