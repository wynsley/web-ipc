import { authenticated } from "./postAuthenticatedAuth";
import { sendApiRequest } from "./authRequest";

const exportUnavailable =
  "No se pudo descargar el archivo CSV de auditoría. Inténtalo de nuevo.";

function buildQuery(params = {}, { includePage = true } = {}) {
  const search = new URLSearchParams();
  if (includePage && params.page) search.set("page", String(params.page));
  if (params.category && params.category !== "all")
    search.set("category", params.category);
  if (params.actor && params.actor !== "all") search.set("actor", params.actor);
  if (params.from) search.set("from", params.from);
  if (params.to) search.set("to", params.to);
  if (params.q?.trim()) search.set("q", params.q.trim());
  const query = search.toString();
  return query ? "?" + query : "";
}

function request(path) {
  return authenticated((session) =>
    sendApiRequest(
      "admin/audit" + path,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + session.accessToken,
          "X-IPC-Client": "admin",
        },
      },
      200,
    ),
  );
}

export const listAuditLogs = (params) => request(buildQuery(params));

export const listAuditActors = () => request("/actors");

function extractFilename(disposition) {
  const match = disposition?.match(/filename="([^"]+)"/i);
  return match?.[1] || "auditoria-ipc.csv";
}

export function exportAuditCsv(params) {
  const query = buildQuery(params, { includePage: false });
  return authenticated(async (session) => {
    let response;
    try {
      response = await fetch("/api/v1/admin/audit/export" + query, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + session.accessToken,
          "X-IPC-Client": "admin",
        },
        credentials: "same-origin",
      });
    } catch {
      throw new Error(exportUnavailable);
    }
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      const error = new Error(body?.error?.message || exportUnavailable);
      error.status = response.status;
      error.code = body?.error?.code;
      throw error;
    }
    return {
      blob: await response.blob(),
      filename: extractFilename(response.headers.get("Content-Disposition")),
    };
  });
}
