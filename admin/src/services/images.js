import { authenticated } from "./postAuthenticatedAuth";
import { sendApiRequest } from "./authRequest";

export function uploadImage(file) {
  return authenticated((session) => {
    const body = new FormData();
    body.append("image", file);
    return sendApiRequest(
      "admin/images",
      {
        method: "POST",
        body,
        headers: {
          Authorization: "Bearer " + session.accessToken,
          "X-IPC-Client": "admin",
          "X-CSRF-Token": session.csrfToken,
        },
      },
      201,
    );
  });
}

export function loadPrivateImage(url, signal) {
  return authenticated(async (session) => {
    const response = await fetch(url, {
      signal,
      headers: { Authorization: "Bearer " + session.accessToken },
    });
    if (!response.ok) {
      const error = new Error("No se pudo cargar la imagen guardada.");
      error.status = response.status;
      throw error;
    }
    return response.blob();
  });
}
