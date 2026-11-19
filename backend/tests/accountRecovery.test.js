import assert from "node:assert/strict";
import { test } from "node:test";
import { createJwtContext } from "./helpers/jwtContext.js";
import { finishTestLogin } from "./helpers/mfaLogin.js";
import { createTotp, createMfaCrypto } from "../src/modules/auth/mfaCrypto.js";
import { issueSoleAdminRecovery } from "../scripts/issueSoleAdminRecovery.js";
import { digest } from "../src/modules/auth/authCrypto.js";

test("Recuperación con sesiones y PostgreSQL", async (t) => {
  const ctx = await createJwtContext();
  try {
    const session = await ctx.login();
    const email = "persona@example.test";
    const password = "contraseña-de-prueba-larga";
    const admin = await ctx.db.admin.findUnique({ where: { id: session.admin.id } });
    const secret = createMfaCrypto(ctx.config.mfaEncryptionKey).decrypt(admin.mfaSecret, admin.id);
    const proof = async () => {
      await ctx.db.admin.update({ where: { id: admin.id }, data: { mfaLastStep: null } });
      return { password: ctx.password, code: createTotp(secret).generate() };
    };
    const issue = async (resetMfa) => {
      const res = await ctx.request(
        "/recovery/issue",
        { email, resetMfa, identityVerified: true, ...(await proof()) },
        session,
      );
      assert.equal(res.status, 200);
      return (await res.json()).data.token;
    };
    const complete = (token) => ctx.request("/recovery/complete", { token, password });
    await t.test(
      "regeneración exige CSRF, contraseña y TOTP nuevo; sustituye el juego completo",
      async () => {
        const input = await proof();
        assert.equal(
          (await ctx.request("/recovery/codes", input, { ...session, csrf: "" })).status,
          403,
        );
        assert.equal(
          (await ctx.request("/recovery/codes", { ...input, password: "incorrecta" }, session))
            .status,
          403,
        );
        const res = await ctx.request("/recovery/codes", input, session);
        assert.equal(res.status, 200);
        const { recoveryCodes } = (await res.json()).data;
        assert.equal(new Set(recoveryCodes).size, 10);
        const stored = await ctx.db.recoveryCode.findMany();
        assert.deepEqual(stored.map((r) => r.tokenHash).sort(), recoveryCodes.map(digest).sort());
        assert.equal(
          stored.some((r) => session.recoveryCodes.map(digest).includes(r.tokenHash)),
          false,
        );
        assert.equal((await ctx.request("/recovery/codes", input, session)).status, 403);
      },
    );
    const registration = await ctx.request(
      "/register",
      { name: "Persona", email, role: "events" },
      session,
    );
    const { activationToken } = (await registration.json()).data;
    assert.equal(
      (await ctx.request("/activate", { token: activationToken, password })).status,
      200,
    );
    const begin = () => ctx.request("/login", { email, password });
    const target = await ctx.read(
      await finishTestLogin(await begin(), ctx.request, ctx.db, ctx.config, email),
    );
    await t.test("solo otro administrador puede emitir tras verificar identidad", async () => {
      const data = { email, resetMfa: true, identityVerified: true, ...(await proof()) };
      assert.equal((await ctx.request("/recovery/issue", data, target)).status, 403);
      assert.equal(
        (await ctx.request("/recovery/issue", { ...data, identityVerified: false }, session))
          .status,
        422,
      );
      assert.equal(
        (await ctx.request("/recovery/issue", { ...data, email: admin.email }, session)).status,
        409,
      );
    });
    await t.test(
      "reemitir y vencer invalidan el código; el canje concurrente cambia contraseña una vez y conserva MFA",
      async () => {
        const old = await issue(false);
        const expired = await issue(false);
        assert.equal((await complete(old)).status, 400);
        await ctx.db.admin.update({ where: { email }, data: { resetExpiresAt: new Date(0) } });
        assert.equal((await complete(expired)).status, 400);
        const valid = await issue(false);
        assert.equal(
          (await ctx.db.admin.findUnique({ where: { email } })).resetHash,
          digest(valid),
        );
        const newPassword = password + "-nueva";
        const responses = await Promise.all(
          [1, 2].map(() =>
            ctx.request("/recovery/complete", { token: valid, password: newPassword }),
          ),
        );
        assert.deepEqual(responses.map((r) => r.status).sort(), [200, 400]);
        assert.equal((await ctx.request("/me", undefined, target)).status, 401);
        assert.equal((await begin()).status, 401);
        const next = await ctx.request("/login", { email, password: newPassword });
        assert.equal((await next.json()).data.enrollmentRequired, false);
        assert.equal(await ctx.db.recoveryCode.count({ where: { adminId: target.admin.id } }), 10);
      },
    );
    await t.test("restablecer todos los factores exige un enrolamiento nuevo", async () => {
      await ctx.db.authRateLimit.deleteMany();
      const valid = await issue(true);
      assert.equal((await complete(valid)).status, 200);
      assert.equal(await ctx.db.recoveryCode.count({ where: { adminId: target.admin.id } }), 0);
      const challenge = (await (await begin()).json()).data;
      assert.equal(challenge.enrollmentRequired, true);
      const res = await ctx.request("/mfa/verify", {
        challengeToken: challenge.challengeToken,
        code: createTotp(challenge.secret).generate(),
      });
      assert.equal((await ctx.read(res)).recoveryCodes.length, 10);
      assert.equal(await ctx.db.auditLog.count({ where: { action: "auth.factor_recovered" } }), 1);
    });
    await t.test("cambiar la contraseña propia revoca el acceso y conserva MFA", async () => {
      const next = ctx.password + "-nueva";
      const res = await ctx.request(
        "/password/change",
        { ...(await proof()), newPassword: next },
        session,
      );
      assert.equal(res.status, 200);
      assert.equal((await ctx.request("/me", undefined, session)).status, 401);
      assert.equal((await ctx.begin()).status, 401);
      const login = await ctx.request("/login", { email: admin.email, password: next });
      assert.equal((await login.json()).data.enrollmentRequired, false);
    });
    await t.test(
      "operación excepcional limitada al único admin con referencia auditada",
      async () => {
        await assert.rejects(issueSoleAdminRecovery(ctx.db, email, "demo", true));
        const token = await issueSoleAdminRecovery(ctx.db, admin.email, "demo", true);
        assert.equal((await complete(token)).status, 200);
        assert.equal(
          await ctx.db.auditLog.count({
            where: { action: "ops.factor_recovery_issued", requestId: "case-demo" },
          }),
          1,
        );
        await ctx.db.admin.update({ where: { email }, data: { role: "admin" } });
        await assert.rejects(issueSoleAdminRecovery(ctx.db, admin.email, "demo", false));
      },
    );
  } finally {
    await ctx.db.$disconnect();
  }
});
