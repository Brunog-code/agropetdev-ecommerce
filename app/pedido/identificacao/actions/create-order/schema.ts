import { z } from "zod";

export const createOrderSchema = z.object({
  subtotal: z.number(),
  shippingCost: z.number(),
  shippingType: z.enum(["PAC", "SEDEX"]),
  shippingEta: z.number(),
  total: z.number(),
  addressId: z.string(),
  userId: z.string(),
});

export type TcreateOrderSchema = z.infer<typeof createOrderSchema>;
