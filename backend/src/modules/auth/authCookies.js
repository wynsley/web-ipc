import { getCookie, setCookie, deleteCookie } from "hono/cookie";

export const refreshCookie = "ipc_refresh";
const options = (config) => ({
  httpOnly: true,
  secure: config.production,
  sameSite: "Strict",
  path: "/api/v1/auth",
});
export const readRefreshCookie = (c) => getCookie(c, refreshCookie);
export function clearAuthCookies(c, config) {
  deleteCookie(c, refreshCookie, options(config));
  deleteCookie(c, "ipc_session", {
    path: "/api/v1",
    httpOnly: true,
    sameSite: "Strict",
    secure: config.production,
  });
}
export function sendTokens(c, result, config) {
  const { refreshToken, sessionExpiresAt, ...data } = result;
  setCookie(c, refreshCookie, refreshToken, {
    ...options(config),
    maxAge: Math.max(0, Math.floor((sessionExpiresAt.getTime() - Date.now()) / 1000)),
  });
  return c.json({ data });
}
