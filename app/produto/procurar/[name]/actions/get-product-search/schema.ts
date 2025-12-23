import { z } from "zod";

export const getProductSearchSchema = z.string().min(1);

export type TgetProductSearchSchema = z.infer<typeof getProductSearchSchema>;
