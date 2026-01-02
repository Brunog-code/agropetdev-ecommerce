"use client";

import { HelpCircle, Mail, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const UserSuport = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      {/* Título */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Central de Suporte</h1>
        <p className="text-gray-600">
          Estamos aqui para ajudar você com seus pedidos, produtos e dúvidas.
        </p>
      </div>

      {/* Cards de contato */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Phone className="text-green-600" />
            <CardTitle>Telefone</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600 space-y-2">
            <p>(11) 99999-9999</p>
            <p>Seg a Sex — 08h às 18h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Mail className="text-green-600" />
            <CardTitle>E-mail</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600 space-y-2">
            <p>suporte@agropecuaria.com</p>
            <p>Respondemos em até 24h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <MessageCircle className="text-green-600" />
            <CardTitle>WhatsApp</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600 space-y-2">
            <p>Atendimento rápido e direto</p>
            <Button className="bg-green-600 hover:bg-green-600 hover:opacity-90 cursor-pointer">
              Falar no WhatsApp
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Dúvidas frequentes */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <HelpCircle className="text-green-600" />
          <CardTitle>Dúvidas Frequentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-gray-700">
          <div>
            <strong>📦 Como acompanho meu pedido?</strong>
            <p>
              Você pode acompanhar o status do pedido na área{" "}
              <b>Meus Pedidos</b>, utilizando seu login.
            </p>
          </div>

          <div>
            <strong>🚚 Qual o prazo de entrega?</strong>
            <p>
              O prazo varia conforme sua região e o método de envio escolhido no
              checkout.
            </p>
          </div>

          <div>
            <strong>🔄 Trocas e devoluções</strong>
            <p>
              Aceitamos devoluções dentro do prazo legal, desde que o produto
              esteja sem uso e na embalagem original.
            </p>
          </div>

          <div>
            <strong>💳 Pagamento não aprovado</strong>
            <p>
              Verifique os dados do cartão ou tente outro método de pagamento.
              Em caso de dúvidas, fale com nosso suporte.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Rodapé */}
      <div className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Agropecuária — Todos os direitos reservados
      </div>
    </div>
  );
};
