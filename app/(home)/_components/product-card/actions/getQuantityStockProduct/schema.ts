import { z } from "zod";

export const getQuantityStockProductSchema = z.string().min(10);

export type TgetQuantityStockProduct = z.infer<typeof getQuantityStockProductSchema>;
