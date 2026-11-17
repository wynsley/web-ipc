import { postAuthenticatedAuth } from "./postAuthenticatedAuth";
import { postAuth } from "./authRequest";

export const changePassword = (input) =>
  postAuthenticatedAuth("password/change", input, 200);
export const regenerateCodes = (input) =>
  postAuthenticatedAuth("recovery/codes", input, 200);
export const issueRecovery = (input) =>
  postAuthenticatedAuth("recovery/issue", input, 200);
export const completeRecovery = (token, password) =>
  postAuth("recovery/complete", { token, password }, 200);
