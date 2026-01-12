"use server";

import { auth } from "@/lib/auth";

import { resetPasswordSchema, TResetPassword } from "./schema";

type TresetPasswordResponse =
  | { success: false; message: string }
  | { success: true; message: string };

export const resetPassword = async (
  resetUserData: TResetPassword
): Promise<TresetPasswordResponse> => {
  const validation = resetPasswordSchema.safeParse(resetUserData);
  if (!validation.success) {
    return { success: false, message: "Dados inválidos" };
  }
  const validationToken = validation.data.token;
  const validationConfirmPassword = validation.data.confirmPassword;

  try {
    await auth.api.resetPassword({
      body: {
        newPassword: validationConfirmPassword,
        token: validationToken,
      },
    });

    return { success: true, message: "Senha alterada com sucesso" };
  } catch (error) {
    console.error("resetPassword error:", error);
    return {
      success: false,
      message: "Erro ao alterar senha, tente novamente",
    };
  }
};
