export class AppError extends Error {
  constructor(status, code, message, fields) {
    super(message);
    this.status = status;
    this.code = code;
    this.fields = fields;
  }
}

export function handleError(error, c) {
  if (error instanceof AppError) {
    return c.json(
      {
        error: {
          code: error.code,
          message: error.message,
          ...(error.fields ? { fields: error.fields } : {}),
        },
        requestId: c.get("requestId"),
      },
      error.status,
    );
  }
  // No registrar cuerpos, cabeceras, mensajes SQL ni credenciales.
  console.error(JSON.stringify({ event: "request_failed", requestId: c.get("requestId") }));
  return c.json(
    {
      error: { code: "INTERNAL_ERROR", message: "No se pudo completar la solicitud." },
      requestId: c.get("requestId"),
    },
    500,
  );
}
