import { authenticated } from "./postAuthenticatedAuth";
import { sendApiRequest } from "./authRequest";

const exportUnavailable =
  "No se pudo descargar el archivo CSV. Inténtalo de nuevo.";

function buildQuery(params = {}, { includePage = true } = {}) {
  const search = new URLSearchParams();
  if (includePage && params.page) search.set("page", String(params.page));
  if (params.status && params.status !== "all")
    search.set("status", params.status);
  if (params.career && params.career !== "all")
    search.set("career", params.career);
  if (params.shift && params.shift !== "all") search.set("shift", params.shift);
  if (params.assigned && params.assigned !== "all")
    search.set("assigned", params.assigned);
  if (params.q?.trim()) search.set("q", params.q.trim());
  const query = search.toString();
  return query ? "?" + query : "";
}

function request(path, method = "GET", data, status = 200) {
  return authenticated((session) =>
    sendApiRequest(
      "admin/inquiries" + path,
      {
        method,
        headers: {
          Authorization: "Bearer " + session.accessToken,
          "X-IPC-Client": "admin",
          ...(data !== undefined && {
            "Content-Type": "application/json",
            "X-CSRF-Token": session.csrfToken,
          }),
        },
        ...(data !== undefined && { body: JSON.stringify(data) }),
      },
      status,
    ),
  );
}

export const listInquiries = (params) => request(buildQuery(params));

export const getInquiry = (id) => request("/" + id);

export const listInquiryAssignees = () => request("/assignees");

export const claimInquiry = (inquiry) =>
  request("/" + inquiry.id + "/claim", "POST", { version: inquiry.version });

export const assignInquiry = (inquiry, assigneeId) =>
  request("/" + inquiry.id + "/assign", "PATCH", {
    version: inquiry.version,
    assigneeId,
  });

export const updateInquiryStatus = (inquiry, status) =>
  request("/" + inquiry.id + "/status", "PATCH", {
    version: inquiry.version,
    status,
  });

export const addInquiryNote = (id, body) =>
  request("/" + id + "/notes", "POST", { body }, 201);

function extractFilename(disposition) {
  const match = disposition?.match(/filename="([^"]+)"/i);
  return match?.[1] || "consultas-ipc.csv";
}

export function exportInquiriesCsv(params) {
  const query = buildQuery(params, { includePage: false });
  return authenticated(async (session) => {
    let response;
    try {
      response = await fetch("/api/v1/admin/inquiries/export" + query, {
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
