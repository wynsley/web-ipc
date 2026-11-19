import { z } from "zod";

export const eventFields = z
  .object({
    imageCrop: z
      .object({
        x: z.number().min(0).max(100),
        y: z.number().min(0).max(100),
        zoom: z.number().min(1).max(3),
      })
      .strict()
      .optional(),
    featured: z.boolean().optional(),
    title: z.string().trim().min(1).max(160),
    description: z.string().trim().min(1).max(2000),
    location: z.string().trim().min(1).max(200),
    imageUrl: z
      .union([
        z.url({ protocol: /^https$/ }).max(2048),
        z
          .string()
          .regex(
            /^\/api\/v1\/media\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
          ),
      ])
      .nullable()
      .optional(),
    highlights: z.array(z.string().trim().min(1).max(160)).max(4).optional(),
    endsAt: z.iso
      .datetime({ offset: true })
      .transform((value) => new Date(value))
      .nullable()
      .optional(),
    startsAt: z.iso.datetime({ offset: true }).transform((value) => new Date(value)),
  })
  .strict();
export const versionInput = z.object({ version: z.number().int().positive() }).strict();
export const editInput = eventFields
  .partial()
  .extend(versionInput.shape)
  .refine((input) => Object.keys(input).length > 1, { message: "Indica al menos un cambio." });

export const scheduleActionInput = versionInput.extend({
  reason: z.string().trim().min(5).max(500),
});
export const rescheduleInput = scheduleActionInput.extend({
  startsAt: eventFields.shape.startsAt,
  endsAt: z.iso.datetime({ offset: true }).transform((value) => new Date(value)),
});
