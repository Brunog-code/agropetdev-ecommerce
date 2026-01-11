"use server";
import crypto from "crypto";

import { prisma } from "@/lib/db";

import { forgotPasswordSchema, TforgotPasswordSchema } from "./schema";

// interface IResponseForgotPassword {

// }

export const forgotPassword = async (email: TforgotPasswordSchema) => {
  try {
    const validation = forgotPasswordSchema.safeParse(email);
    if (!validation.success) {
      return { success: false, message: "Dados inválidos" };
    }

    const validationEmail = validation.data;

    //procura usuario
    const user = await prisma.user.findUnique({
      where: {
        email: validationEmail,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "Se o email existir você receberá instruções",
      };
    }

    //gera um token de redefinição
    const resetToken = crypto.randomBytes(32).toString("hex");

    //salva hash do token
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    //atribuir o token de expiração ao usuário
    await prisma.passwordResetToken.upsert({
      where: {
        userId: user.id,
      },
      update: {
        token: resetTokenHash,
        tokenExpires: new Date(Date.now() + 60 * 60 * 1000),
      },
      create: {
        userId: user.id,
        token: resetTokenHash,
        tokenExpires: new Date(Date.now() + 60 * 60 * 1000),
      },
    });

    //montar link de redefinição de senha

    //usar o emailService para enviar o email

    //resposta de sucesso


    
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Erro interno ao solicitar recuperação",
    };
  }
};
