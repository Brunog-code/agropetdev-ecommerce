import { z } from "zod";

export const getOrdersSchema = z.string().min(10);

export type TgetOrdersSchema = z.infer<typeof getOrdersSchema>;
