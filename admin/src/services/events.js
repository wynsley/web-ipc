import { authenticated } from "./postAuthenticatedAuth";
import { sendApiRequest } from "./authRequest";

function request(path, method = "GET", data, status = 200) {
  return authenticated((session) =>
    sendApiRequest(
      "admin/events" + path,
      {
        method,
        headers: {
          Authorization: "Bearer " + session.accessToken,
          "X-IPC-Client": "admin",
          ...(data && {
            "Content-Type": "application/json",
            "X-CSRF-Token": session.csrfToken,
          }),
        },
        ...(data && { body: JSON.stringify(data) }),
      },
      status,
    ),
  );
}
export const listEvents = (page, scope = "all") =>
  request("?page=" + page + "&scope=" + encodeURIComponent(scope));
export const createEvent = (input) => request("", "POST", input, 201);
export const editEvent = (event, input) =>
  request("/" + event.id, "PATCH", { ...input, version: event.version });
export const setPublication = (event) =>
  request(
    "/" + event.id + (event.published ? "/unpublish" : "/publish"),
    "POST",
    { version: event.version },
  );
export const deleteEvent = (event) =>
  request("/" + event.id, "DELETE", { version: event.version }, 204);

export const changeEventSchedule = (event, action, input) =>
  request("/" + event.id + "/" + action, "POST", {
    ...input,
    version: event.version,
  });
export const getEventHistory = (id, page = 1) =>
  request("/" + id + "/history?page=" + page);
