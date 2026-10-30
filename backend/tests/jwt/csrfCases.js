import assert from "node:assert/strict";
import { digest } from "../../src/modules/auth/authCrypto.js";

export async function csrfCases(t, ctx) {
  await t.test("recupera CSRF con cookie para recarga del cliente", async () => {
    await ctx.fresh();
    const session = await ctx.login();
    const response = await ctx.request("/csrf", undefined, { cookie: session.cookie });
    assert.equal(response.status, 200);
    assert.equal((await response.json()).data.csrfToken, session.csrf);
    assert.equal((await ctx.request("/csrf")).status, 401);
    assert.equal(
      (await ctx.request("/csrf", undefined, session, { "X-IPC-Client": "" })).status,
      403,
    );
    assert.equal(
      (await ctx.request("/csrf", undefined, session, { Origin: "https://evil.example" })).status,
      403,
    );
  });
  await t.test("CSRF ajeno, ausente u origen externo no consumen refresh", async () => {
    await ctx.fresh();
    const session = await ctx.login();
    const other = await ctx.login();
    for (const headers of [
      { "X-CSRF-Token": "" },
      { "X-CSRF-Token": other.csrf },
      { Origin: "https://evil.example" },
      { "X-IPC-Client": "" },
    ]) {
      assert.equal((await ctx.request("/refresh", {}, session, headers)).status, 403);
    }
    const row = await ctx.db.refreshToken.findUnique({
      where: { tokenHash: digest(session.cookie.split("=")[1]) },
    });
    assert.equal(row.usedAt, null);
    const fresh = await ctx.read(await ctx.request("/refresh", {}, session));
    assert.equal((await ctx.request("/csrf", undefined, session)).status, 401);
    assert.equal((await ctx.request("/me", undefined, fresh)).status, 200);
  });
  await t.test("refresh tiene límite persistente independiente de login", async () => {
    await ctx.fresh();
    const session = await ctx.login();
    await ctx.request("/csrf", undefined, session);
    await ctx.db.authRateLimit.update({
      where: { key: digest("refresh-ip:jwt-tests") },
      data: { hits: 120 },
    });
    assert.equal((await ctx.request("/refresh", {}, session)).status, 429);
    assert.equal((await ctx.request("/me", undefined, session)).status, 200);
  });
}
