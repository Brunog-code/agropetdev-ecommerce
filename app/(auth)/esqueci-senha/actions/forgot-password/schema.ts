import { z } from "zod";

export const forgotPasswordSchema = z.email();

export type TforgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
