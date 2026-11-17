import { getAuthenticatedAuth, postAuthenticatedAuth } from "./postAuthenticatedAuth";

export function listAccounts() {
  return getAuthenticatedAuth("accounts", 200);
}

export function deactivateAccount(id) {
  return postAuthenticatedAuth("accounts/deactivate", { id }, 200);
}
