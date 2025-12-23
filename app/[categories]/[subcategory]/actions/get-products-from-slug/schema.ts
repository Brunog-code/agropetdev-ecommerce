import { z } from "zod";

export const getProductsFromSlugSchema = z.object({
  slugCategory: z.string(),
  slugSubcategory: z.string(),
});

export type TgetProductsFromSlugSchema = z.infer<
  typeof getProductsFromSlugSchema
>;
