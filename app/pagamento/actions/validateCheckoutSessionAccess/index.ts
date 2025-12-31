import { prisma } from "@/lib/db";

import {
  TvalidateCheckoutSessionAccessSchema,
  validateCheckoutSessionAccessSchema,
} from "./schema";

export type TvalidateCheckoutSessionAccessResponse =
  | {
      success: false;
      message: string;
    }
  | { success: true; message: string };

export const validateCheckoutSessionAccess = async ({
  sessionId,
  userId,
}: TvalidateCheckoutSessionAccessSchema): Promise<TvalidateCheckoutSessionAccessResponse> => {
  //zod
  const validation = validateCheckoutSessionAccessSchema.safeParse({
    sessionId,
    userId,
  });
  if (!validation.success) {
    return { success: false, message: "Não foi possivel validar os dados" };
  }

  const validationSessionId = validation.data?.sessionId;
  const validationUserId = validation.data?.userId;

  //verificar se o stripeId é do usuario logado
  const authorizedOrder = await prisma.order.findFirst({
    where: {
      userId: validationUserId,
      stripeSessionId: validationSessionId,
    },
  });
  if (!authorizedOrder) {
    return {
      success: false,
      message: "Session de pagamento não pertence ao usuario logado",
    };
  }

  //verificar o horario que foi criado o stripeId
  // verifica se o pedido foi criado há mais de 10 minutos
  const now = new Date();
  const createdAt = authorizedOrder.createdAt;
  const diffMinutes = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

  if (diffMinutes > 24) {
    return {
      success: false,
      message: "Session de pagamento expirou",
    };
  }

  return { success: true, message: "Session autorizada" };
};
