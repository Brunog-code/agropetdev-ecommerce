"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import nala from "@/app/assets/mascote.webp";
import { useAuth } from "@/app/contexts/AuthCont";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type TMessage = {
  role: "user" | "nala";
  content: string;
};

export function ChatDialog({ open, onOpenChange }: Props) {
  const [message, setMessage] = useState("");

  // Estado para armazenar o histórico
  const [chatLog, setChatLog] = useState<TMessage[]>([
    { role: "nala", content: "Como posso ajudar você hoje? 😊" },
  ]);

  const [loading, setLoading] = useState(false);

  const { session, user } = useAuth();

  //scroll chat
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog, loading]);

  async function handleSubmitMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!message.trim() || loading) return;

    //mensagens do chat
    const userText = message;
    setMessage("");

    setChatLog((prev) => [...prev, { role: "user", content: userText }]);
    setLoading(true);

    let sessionId: string;

    if (!session) {
      let sessionIdLocal = localStorage.getItem("chat_session_id");
      if (!sessionIdLocal) {
        sessionIdLocal = crypto.randomUUID();
        localStorage.setItem("chat_session_id", sessionIdLocal);
      }

      sessionId = sessionIdLocal;
    } else {
      sessionId = user!.id;
    }

    const dataApi = {
      message: userText,
      sessionId,
    };

    //chamar api
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataApi),
      });

      const responseData = await response.json();

      setChatLog((prev) => [
        ...prev,
        { role: "nala", content: responseData.text },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <Image src={nala} width={50} height={50} alt="Nala" />
            <span>Olá, sou a Nala, assistente virtual</span>
          </DialogTitle>
        </DialogHeader>

        {/* Área de mensagens */}
        <div className="flex-1 overflow-y-auto space-y-4 p-2 border rounded bg-slate-50">
          {chatLog.map((chat, index) => (
            <div
              key={index}
              className={`flex ${
                chat.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  chat.role === "user"
                    ? "bg-green-600 text-white rounded-br-none"
                    : "bg-white border text-slate-800 rounded-bl-none"
                } whitespace-pre-wrap`}
              >
                {chat.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-xs text-muted-foreground animate-pulse">
              Nala está pensando...
            </div>
          )}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Input */}
        <form className="flex gap-2 mt-2" onSubmit={handleSubmitMessage}>
          <input
            className="flex-1 border rounded px-3 py-2 text-sm"
            placeholder="Digite sua mensagem..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="bg-green-600 hover:opacity-85 text-white px-4 rounded cursor-pointer">
            Enviar
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
