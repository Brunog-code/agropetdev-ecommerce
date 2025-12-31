import { z } from "zod";

export const validateCheckoutSessionAccessSchema = z.object({
  sessionId: z.string().min(10),
  userId: z.string().min(10),
});

export type TvalidateCheckoutSessionAccessSchema = z.infer<
  typeof validateCheckoutSessionAccessSchema
>;
