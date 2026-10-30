import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { hash, verify, Algorithm } from "@node-rs/argon2";

export const newToken = () => randomBytes(32).toString("base64url");
export const digest = (value) => createHash("sha256").update(value).digest("hex");
export const hashPassword = (password) =>
  hash(password, {
    algorithm: Algorithm.Argon2id,
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
    outputLen: 32,
  });
export const verifyPassword = (encoded, password) => verify(encoded, password);
export function equalSecret(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}
