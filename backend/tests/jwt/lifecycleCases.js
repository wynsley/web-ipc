import assert from "node:assert/strict";
import { decodeJwt } from "jose";

export async function lifecycleCases(t, ctx) {
  await t.test("JWT vencido puede renovarse y logout funciona sin JWT vigente", async () => {
    await ctx.fresh();
    const session = await ctx.login();
    const expired = {
      ...session,
      accessToken: await ctx.sign(session, { exp: Math.floor(Date.now() / 1000) - 1 }),
    };
    assert.equal((await ctx.request("/me", undefined, expired)).status, 401);
    const fresh = await ctx.read(await ctx.request("/refresh", {}, expired));
    assert.equal((await ctx.request("/me", undefined, fresh)).status, 200);
    const response = await ctx.request("/logout", {}, { ...fresh, accessToken: undefined });
    assert.equal(response.status, 204);
    assert.match(response.headers.get("set-cookie"), /Max-Age=0/);
    assert.equal((await ctx.request("/me", undefined, fresh)).status, 401);
    assert.equal((await ctx.request("/refresh", {}, fresh)).status, 401);
  });
  await t.test("refresh respeta expiración, inactividad y cuenta desactivada", async () => {
    for (const mode of ["expired", "idle", "inactive"]) {
      await ctx.fresh();
      const session = await ctx.login();
      const sid = decodeJwt(session.accessToken).sid;
      if (mode === "inactive")
        await ctx.db.admin.update({ where: { id: session.admin.id }, data: { isActive: false } });
      else
        await ctx.db.session.update({
          where: { id: sid },
          data:
            mode === "expired"
              ? { expiresAt: new Date(0) }
              : { lastSeenAt: new Date(Date.now() - 31 * 60_000) },
        });
      assert.equal((await ctx.request("/refresh", {}, session)).status, 401);
      assert.equal(await ctx.db.refreshToken.count(), 1);
      await ctx.db.admin.update({ where: { id: session.admin.id }, data: { isActive: true } });
    }
  });
  await t.test("access token nuevo nunca excede el límite de la familia", async () => {
    await ctx.fresh();
    const session = await ctx.login();
    const sid = decodeJwt(session.accessToken).sid;
    const expiresAt = new Date(Date.now() + 90_000);
    await ctx.db.session.update({ where: { id: sid }, data: { expiresAt } });
    const fresh = await ctx.read(await ctx.request("/refresh", {}, session));
    assert.ok(fresh.expiresIn <= 90);
    assert.equal(decodeJwt(fresh.accessToken).exp, Math.floor(expiresAt.getTime() / 1000));
  });
}
