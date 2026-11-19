import assert from "node:assert/strict";
import { test } from "node:test";
import sharp from "sharp";
import { digest } from "../src/modules/auth/authCrypto.js";
import { createJwtContext } from "./helpers/jwtContext.js";

test("Imágenes: validación, permisos, vista privada y publicación", async () => {
  const ctx = await createJwtContext();
  const ids = [];
  let eventId;
  try {
    const session = await ctx.login();
    const headers = {
      Authorization: "Bearer " + session.accessToken,
      "X-IPC-Client": "admin",
      "X-CSRF-Token": session.csrf,
    };
    async function upload(bytes, type = "image/png", overrides = {}) {
      const body = new FormData();
      body.append("image", new File([bytes], "foto.png", { type }));
      return ctx.app.request("/api/v1/admin/images", {
        method: "POST",
        headers: { ...headers, ...overrides },
        body,
      });
    }
    const pixels = await sharp({
      create: {
        width: 32,
        height: 24,
        channels: 3,
        background: "blue",
      },
    })
      .png()
      .toBuffer();
    assert.equal((await upload(pixels, "image/png", { Authorization: "" })).status, 401);
    assert.equal((await upload(pixels, "image/png", { "X-CSRF-Token": "" })).status, 403);
    assert.equal((await upload("<svg/>")).status, 422);
    assert.equal((await upload(Buffer.alloc(5 * 1024 * 1024 + 1))).status, 422);
    await ctx.db.admin.update({ where: { id: session.admin.id }, data: { role: "admissions" } });
    assert.equal((await upload(pixels)).status, 403);
    await ctx.db.admin.update({ where: { id: session.admin.id }, data: { role: "events" } });
    const result = await upload(pixels);
    assert.equal(result.status, 201);
    const { imageUrl } = (await result.json()).data;
    ids.push(imageUrl.split("/").pop());
    assert.equal((await ctx.app.request(imageUrl)).status, 404);
    const privatePreview = await ctx.app.request(imageUrl, { headers });
    assert.equal(privatePreview.status, 200);
    assert.equal(privatePreview.headers.get("cache-control"), "private, no-store");
    assert.equal(privatePreview.headers.get("etag"), null);
    assert.equal(privatePreview.headers.get("content-type"), "image/webp");
    assert.equal(
      (await sharp(Buffer.from(await privatePreview.arrayBuffer())).metadata()).format,
      "webp",
    );
    const request = (path, body) =>
      ctx.app.request("/api/v1/admin/events" + path, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    const created = await request("", {
      title: "Foto de prueba",
      location: "IPC",
      description: "Prueba",
      startsAt: "2030-01-01T10:00:00-05:00",
      imageUrl,
    });
    assert.equal(created.status, 201);
    eventId = (await created.json()).data.id;
    assert.equal((await request("/" + eventId + "/publish", { version: 1 })).status, 200);
    const publishedImage = await ctx.app.request(imageUrl);
    assert.equal(publishedImage.status, 200);
    assert.equal(publishedImage.headers.get("cache-control"), "public, no-cache");
    const etag = publishedImage.headers.get("etag");
    assert.ok(etag);
    const revalidated = await ctx.app.request(imageUrl, {
      headers: { "If-None-Match": etag },
    });
    assert.equal(revalidated.status, 304);
    assert.equal((await revalidated.arrayBuffer()).byteLength, 0);
    assert.equal((await request("/" + eventId + "/unpublish", { version: 2 })).status, 200);
    const withdrawn = await ctx.app.request(imageUrl, {
      headers: { "If-None-Match": etag },
    });
    assert.equal(withdrawn.status, 404);
    assert.equal(withdrawn.headers.get("cache-control"), "no-store");
  } finally {
    if (eventId) await ctx.db.event.deleteMany({ where: { id: eventId } });
    await ctx.db.image.deleteMany({ where: { id: { in: ids } } });
    await ctx.db.$disconnect();
  }
});

test("Imágenes: límite de subidas es independiente del límite de autenticación", async () => {
  const ctx = await createJwtContext();
  const ids = [];
  try {
    const session = await ctx.login();
    const pixels = await sharp({
      create: { width: 16, height: 16, channels: 3, background: "blue" },
    })
      .png()
      .toBuffer();
    async function upload() {
      const body = new FormData();
      body.append("image", new File([pixels], "foto.png", { type: "image/png" }));
      return ctx.app.request("/api/v1/admin/images", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + session.accessToken,
          "X-IPC-Client": "admin",
          "X-CSRF-Token": session.csrf,
        },
        body,
      });
    }
    const first = await upload();
    assert.equal(first.status, 201);
    ids.push((await first.json()).data.imageUrl.split("/").pop());
    await ctx.db.authRateLimit.update({
      where: { key: digest("media-upload-ip:jwt-tests") },
      data: { hits: 60 },
    });
    assert.equal((await upload()).status, 429);
    const loginAttempt = await ctx.app.request("/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-IPC-Client": "admin",
      },
      body: JSON.stringify({ email: "nadie@ipc.test", password: "ClaveDePruebaSegura123!" }),
    });
    assert.equal(loginAttempt.status, 401);
  } finally {
    await ctx.db.authRateLimit.deleteMany({
      where: {
        key: {
          in: [
            digest("media-upload-global"),
            digest("media-upload-ip:jwt-tests"),
            digest("account:nadie@ipc.test"),
            digest("ip:jwt-tests"),
            digest("global-auth"),
          ],
        },
      },
    });
    await ctx.db.image.deleteMany({ where: { id: { in: ids } } });
    await ctx.db.$disconnect();
  }
});
