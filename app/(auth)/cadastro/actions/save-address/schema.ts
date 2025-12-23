import { z } from "zod";

export const saveAddressSchema = z.object({
  id: z.string(),
  street: z.string().min(1),
  number: z.string().min(1),
  district: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zip: z.string().min(1),
});

export type TsaveAddressSchema = z.infer<typeof saveAddressSchema>;
