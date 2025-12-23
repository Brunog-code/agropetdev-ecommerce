import { z } from "zod";

export const getfavoritesSchema = z.string();

export type TgetFavoritesSchema = z.infer<typeof getfavoritesSchema>;
