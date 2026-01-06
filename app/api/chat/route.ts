import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message, sessionId } = await req.json();

  if (!message) {
    return NextResponse.json(
      { success: false, error: "Mensagem vazia" },
      { status: 400 }
    );
  }

  if (!sessionId) {
    return NextResponse.json(
      { success: false, error: "Sem id do usuario" },
      { status: 400 }
    );
  }

  try {
    const responseN8n = await fetch(process.env.N8N_WEBHOOK!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        sessionId,
      }),
    });

    if (!responseN8n.ok) {
      console.error("n8n retornou erro HTTP:", responseN8n.status);
      return NextResponse.json(
        {
          text: "Desculpe, tive um problema técnico para processar sua mensagem agora. 🐾",
        },
        { status: 200 } // Retornamos 200 para o chat não "quebrar" e exibir a mensagem de erro amigável
      );
    }

    const dataFromN8n = await responseN8n.json();
    console.log("Resposta bruta do n8n:", dataFromN8n); // LOG 3

    return NextResponse.json({
      text: dataFromN8n.pergunta || "Sem resposta",
    });
  } catch (error) {
    console.error("Erro crítico na API Route:", error);
    return NextResponse.json(
      { text: "Estou offline no momento. Tente novamente em instantes." },
      { status: 200 }
    );
  }
}
