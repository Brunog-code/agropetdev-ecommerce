import { z } from "zod";

export const getProductDetailSchema = z.string();

export type TgetProductDetailSchema = z.infer<typeof getProductDetailSchema>;
