import { z } from "zod";

export const getCategoriesAndSubcategoriesSchema = z.string();

export type TgetCategoriesAndSubcategoriesSchema = z.infer<
  typeof getCategoriesAndSubcategoriesSchema
>;
