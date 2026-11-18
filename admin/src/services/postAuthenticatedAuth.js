import { getAuth, postAuth } from "./authRequest";
import { EXPIRED_NOTICE, getSession, refreshSession } from "./session";

export async function authenticated(request) {
  let session = getSession();
  if (!session) throw new Error(EXPIRED_NOTICE);
  const accountId = session.admin.id;
  async function renew() {
    const renewed = await refreshSession();
    if (!renewed || renewed.admin.id !== accountId)
      throw new Error(EXPIRED_NOTICE);
    return renewed;
  }
  if (Date.now() >= session.expiresAt) session = await renew();
  try {
    return await request(session);
  } catch (error) {
    if (error.status !== 401) throw error;
    return request(await renew());
  }
}
export function postAuthenticatedAuth(path, input, status) {
  return authenticated((session) =>
    postAuth(path, input, status, session.csrfToken, session.accessToken),
  );
}
export function getAuthenticatedAuth(path, status) {
  return authenticated((session) => getAuth(path, status, session.accessToken));
}
