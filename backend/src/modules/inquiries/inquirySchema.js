import { z } from "zod";

export const INQUIRY_STATUSES = ["new", "in_progress", "resolved", "archived"];
export const INQUIRY_CAREERS = ["administracion", "contabilidad", "informatica", "idiomas"];
export const INQUIRY_SHIFTS = ["manana", "tarde", "noche"];

export const publicInquiryInput = z
  .object({
    name: z
      .string()
      .trim()
      .min(2)
      .max(100)
      .regex(/^[\p{L}\s.'-]+$/u, "El nombre solo puede contener letras y espacios."),
    email: z.string().trim().toLowerCase().pipe(z.email().max(254)),
    phone: z
      .string()
      .trim()
      .min(9)
      .max(20)
      .regex(/^\+?[0-9\s()-]+$/, "Introduce un teléfono válido.")
      .refine((value) => {
        const digits = value.replace(/\D/g, "");
        return digits.length >= 9 && digits.length <= 15;
      }, "El teléfono debe contener entre 9 y 15 dígitos."),
    address: z
      .string()
      .trim()
      .min(3)
      .max(200)
      .regex(/^[\p{L}\p{N}\s.,#°/'-]+$/u, "La dirección contiene caracteres no permitidos."),
    career: z.enum(INQUIRY_CAREERS),
    shift: z.enum(INQUIRY_SHIFTS),
    message: z.string().trim().min(5).max(1000),
  })
  .strict();

export const idempotencyKeySchema = z
  .string()
  .trim()
  .min(8)
  .max(128)
  .regex(/^[A-Za-z0-9._:-]+$/);

export const inquiryVersionInput = z
  .object({
    version: z.number().int().positive(),
  })
  .strict();

export const inquiryStatusInput = inquiryVersionInput.extend({
  status: z.enum(INQUIRY_STATUSES),
});

export const inquiryAssignInput = inquiryVersionInput.extend({
  assigneeId: z.uuid().nullable(),
});

export const inquiryNoteInput = z
  .object({
    body: z.string().trim().min(1).max(1000),
  })
  .strict();

export const inquiryListQuery = z.object({
  page: z.coerce.number().int().min(1).max(100000).default(1),
  status: z.enum(["all", ...INQUIRY_STATUSES]).default("all"),
  career: z.enum(["all", ...INQUIRY_CAREERS]).default("all"),
  shift: z.enum(["all", ...INQUIRY_SHIFTS]).default("all"),
  assigned: z.union([z.enum(["all", "unassigned", "mine"]), z.uuid()]).default("all"),
  q: z.string().trim().max(100).default(""),
});
