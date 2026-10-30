import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { decodeJwt } from "jose";
import { createAccessTokenService } from "../../src/modules/auth/accessTokenService.js";

export async function claimsCases(t, ctx) {
  await t.test("JWT contiene solo identidad y sesión; requiere clave segura", async () => {
    await ctx.fresh();
    const session = await ctx.login();
    const claims = decodeJwt(session.accessToken);
    assert.equal(session.tokenType, "Bearer");
    assert.equal(session.expiresIn, 600);
    assert.equal(claims.iss, "ipc-backend");
    assert.equal(claims.aud, "ipc-admin");
    assert.equal(claims.sub, session.admin.id);
    assert.equal(claims.exp - claims.iat, 600);
    for (const field of ["password", "passwordHash", "email", "role"])
      assert.equal(field in claims, false);
    assert.throws(() => createAccessTokenService({}));
    assert.throws(() => createAccessTokenService({ jwtSecret: "short" }));
    assert.equal((await ctx.request("/me", undefined, { cookie: session.cookie })).status, 401);
    assert.equal((await ctx.request("/me", undefined, session)).status, 200);
  });
  await t.test("rechaza firma alterada, alg none y claims inválidos", async () => {
    await ctx.fresh();
    const session = await ctx.login();
    const original = session.accessToken.split(".");
    const altered = [...original.slice(0, 2), "A".repeat(original[2].length)].join(".");
    const unsigned =
      Buffer.from('{"alg":"none","typ":"at+jwt"}').toString("base64url") + "." + original[1] + ".";
    const now = Math.floor(Date.now() / 1000);
    const variants = [
      altered,
      unsigned,
      await ctx.sign(session, { iss: "other" }),
      await ctx.sign(session, { aud: "other" }),
      await ctx.sign(session, {}, { alg: "HS384" }),
      await ctx.sign(session, {}, { typ: "JWT" }),
      await ctx.sign(session, { exp: now - 1 }),
      await ctx.sign(session, { iat: now + 60 }),
      await ctx.sign(session, { sub: randomUUID() }),
      await ctx.sign(session, { sid: randomUUID() }),
      await ctx.sign(session, { jti: "" }),
      await ctx.sign(session, { exp: undefined }),
    ];
    for (const accessToken of variants) {
      assert.equal((await ctx.request("/me", undefined, { ...session, accessToken })).status, 401);
    }
  });
}
