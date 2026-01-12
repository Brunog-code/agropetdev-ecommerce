import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { sendEmail } from "@/app/services/email-service";

import { prisma } from "./db";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    resetPasswordURL: "/resetar-senha", // A BetterAuth enviará: /resetar-senha?token=...
    
    async sendResetPassword({ user, url }) {
      await sendEmail({
        to: user.email,
        subject: "Redefinição de senha - AgropetDev",
        html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <title>Redefinição de senha</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: sans-serif; background-color: #f5f5f5;">
          <table role="presentation" style="width: 100%; background-color: #f5f5f5;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <tr>
                    <td style="background: linear-gradient(135deg, #3a7d44 0%, #2d6235 100%); padding: 40px 30px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px;">AgropetDev</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 50px 30px; text-align: center;">
                      <h2 style="color: #1a1a1a;">Redefinição de Senha</h2>
                      <p style="color: #4a4a4a;">Olá, você solicitou a redefinição de senha para sua conta.</p>
                      <div style="margin: 30px 0;">
                        <a href="${url}" style="background-color: #f28c28; color: #ffffff; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                          Redefinir Senha
                        </a>
                      </div>
                      <p style="font-size: 12px; color: #999;">Se o botão não funcionar, copie este link: ${url}</p>
                      <p style="margin-top: 20px; color: #856404; font-size: 14px; background: #fff9e6; padding: 10px;">
                        <strong>Aviso:</strong> Este link expira em breve por segurança.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
        `,
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});