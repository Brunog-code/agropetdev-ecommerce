import { z } from "zod";

export const getAddressUserSchema = z.string();

export type TgetAddressUserSchema = z.infer<typeof getAddressUserSchema>;
