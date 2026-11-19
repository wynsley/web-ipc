import { z } from "zod";

export const AUDIT_CATEGORIES = ["auth", "admin", "event", "image", "inquiry", "audit", "content"];

const isoDateDay = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Usa el formato YYYY-MM-DD.")
  .refine((value) => {
    const parsed = new Date(value + "T00:00:00.000Z");
    return !Number.isNaN(parsed.getTime()) && parsed.toISOString().startsWith(value);
  }, "Fecha inválida.");

const optionalDateDay = z.preprocess(
  (value) => (value === "" || value === undefined ? undefined : value),
  isoDateDay.optional(),
);

export const auditListQuery = z
  .object({
    page: z.coerce.number().int().min(1).max(100000).default(1),
    category: z.enum(["all", ...AUDIT_CATEGORIES]).default("all"),
    actor: z.union([z.enum(["all", "system"]), z.uuid()]).default("all"),
    from: optionalDateDay,
    to: optionalDateDay,
    q: z.string().trim().max(100).default(""),
  })
  .refine((data) => !data.from || !data.to || data.from <= data.to, {
    message: "La fecha inicial no puede ser posterior a la fecha final.",
    path: ["to"],
  });
