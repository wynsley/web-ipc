import { z } from "zod";

export const emailSchema = z.string().trim().toLowerCase().max(254).email();
export const passwordSchema = z.string().min(15).max(128);
export const registerSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: emailSchema,
    role: z.enum(["admin", "admissions", "events"]),
  })
  .strict();
export const reissueSchema = z.object({ email: emailSchema }).strict();
export const deactivateAccountSchema = z
  .object({
    id: z.string().uuid(),
  })
  .strict();
export const reauthSchema = z
  .object({
    password: z.string().min(1).max(128),
    code: z.string().regex(/^\d{6}$/),
  })
  .strict();
export const changePasswordSchema = reauthSchema.extend({ newPassword: passwordSchema });
export const issueRecoverySchema = reauthSchema.extend({
  email: emailSchema,
  resetMfa: z.boolean(),
  identityVerified: z.literal(true),
});
export const loginSchema = z
  .object({
    email: emailSchema,
    password: z.string().min(1).max(128),
  })
  .strict();
export const activateSchema = z
  .object({
    token: z.string().regex(/^[A-Za-z0-9_-]{43}$/),
    password: passwordSchema,
  })
  .strict();

export const verifyMfaSchema = z
  .object({
    challengeToken: z.string().regex(/^[A-Za-z0-9_-]{43}$/),
    code: z.string().regex(/^(?:[0-9]{6}|[A-Za-z0-9_-]{43})$/),
  })
  .strict();
