import assert from "node:assert/strict";
import { decodeJwt } from "jose";
import { digest } from "../../src/modules/auth/authCrypto.js";

export async function rotationCases(t, ctx) {
  await t.test("refresh rota cookie y hash sin ampliar el vencimiento absoluto", async () => {
    await ctx.fresh();
    const initial = await ctx.login();
    const sid = decodeJwt(initial.accessToken).sid;
    const before = await ctx.db.session.findUnique({ where: { id: sid } });
    const response = await ctx.request("/refresh", {}, initial);
    assert.match(response.headers.get("set-cookie"), /HttpOnly/);
    assert.match(response.headers.get("set-cookie"), /SameSite=Strict/);
    assert.match(response.headers.get("set-cookie"), /Path=\/api\/v1\/auth/);
    const fresh = await ctx.read(response);
    assert.notEqual(initial.cookie, fresh.cookie);
    assert.notEqual(initial.accessToken, fresh.accessToken);
    assert.equal((await ctx.request("/me", undefined, fresh)).status, 200);
    const rows = await ctx.db.refreshToken.findMany({ where: { sessionId: sid } });
    assert.equal(rows.length, 2);
    assert.equal(rows.filter((row) => row.usedAt).length, 1);
    assert.ok(rows.some((row) => row.tokenHash === digest(fresh.cookie.split("=")[1])));
    assert.equal(JSON.stringify(rows).includes(fresh.cookie.split("=")[1]), false);
    const after = await ctx.db.session.findUnique({ where: { id: sid } });
    assert.equal(after.expiresAt.getTime(), before.expiresAt.getTime());
  });
  await t.test("reutilización revoca toda la familia y conserva otras sesiones", async () => {
    await ctx.fresh();
    const initial = await ctx.login();
    const independent = await ctx.login();
    const fresh = await ctx.read(await ctx.request("/refresh", {}, initial));
    const replay = await ctx.request("/refresh", {}, initial);
    assert.equal(replay.status, 401);
    assert.equal((await replay.json()).error.code, "REFRESH_REUSED");
    assert.equal((await ctx.request("/me", undefined, initial)).status, 401);
    assert.equal((await ctx.request("/me", undefined, fresh)).status, 401);
    assert.equal((await ctx.request("/refresh", {}, fresh)).status, 401);
    assert.equal((await ctx.request("/me", undefined, independent)).status, 200);
    assert.ok(await ctx.db.auditLog.findFirst({ where: { action: "auth.refresh_reuse" } }));
  });
  await t.test("rotaciones simultáneas consumen una vez y revocan ante la segunda", async () => {
    await ctx.fresh();
    const initial = await ctx.login();
    const responses = await Promise.all([
      ctx.request("/refresh", {}, initial),
      ctx.request("/refresh", {}, initial),
    ]);
    assert.deepEqual(responses.map((res) => res.status).sort(), [200, 401]);
    const winner = await ctx.read(responses.find((res) => res.status === 200));
    assert.equal((await ctx.request("/me", undefined, winner)).status, 401);
    assert.equal(await ctx.db.refreshToken.count(), 2);
  });
}
