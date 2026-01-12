"use server";

import { auth } from "@/lib/auth"; // auth do servidor

import { forgotPasswordSchema, TforgotPasswordSchema } from "./schema";

type TforgotPasswordResponse = {
  success: boolean;
  message: string;
};

export const forgotPassword = async (
  emailData: TforgotPasswordSchema
): Promise<TforgotPasswordResponse> => {
  const validation = forgotPasswordSchema.safeParse(emailData);
  if (!validation.success)
    return { success: false, message: "Dados inválidos" };

  try {
    // Isso gera o token e chama a função 'sendResetPassword' que você
    // deve configurar no seu lib/auth.ts
    await auth.api.requestPasswordReset({
      body: {
        email: validation.data,
        redirectTo: "/resetar-senha",
      },
    });

    return {
      success: true,
      message: "Se o email existir, você receberá instruções",
    };
  } catch (error) {
    console.error("Erro requestPasswordReset:", error);

    return {
      success: false,
      message: "Erro ao enviar email de recuperação",
    };
  }
};
