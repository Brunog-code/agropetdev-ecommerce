import { z } from "zod";

export const getCartLengthSchema = z.string();

export type TgetCartLengthSchema = z.infer<typeof getCartLengthSchema>;
