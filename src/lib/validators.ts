import { z } from "zod";

export const createBalloonSchema = z.object({
  styleId: z.number().int().min(1).max(5),
  shapeId: z.number().int().min(0).max(12).default(0),
  wishText: z.string().min(1).max(120).trim(),
  category: z.string().optional(),
  displayName: z.string().max(30).trim().optional(),
  privacy: z.enum(["public", "blurred_until_tap"]).default("public"),
});

export type CreateBalloonInput = z.infer<typeof createBalloonSchema>;

export const listBalloonsSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});
