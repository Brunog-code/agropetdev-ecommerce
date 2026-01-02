import { z } from "zod";

export const deleteUserAddressSchema = z.object({
  userId: z.string().min(10),
  addressId: z.string().min(10),
});

export type TdeleteUserAddressSchema = z.infer<typeof deleteUserAddressSchema>;
