import { z } from "zod";

export const cancelOrderStripeSchema = z.string().min(10);

export type TcancelOrderStripeSchema = z.infer<typeof cancelOrderStripeSchema>;
