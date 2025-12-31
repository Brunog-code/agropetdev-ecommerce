const statusMap: Record<string, string> = {
  pending: "Pendente",
  paid: "Pago",
  shipped: "Enviado",
  delivered: "Entregue",
  failed: "Falhou",
  refunded: "Reembolsado",
  canceled: "Cancelado",
};

export function translateStatus(status: string): string {
  return statusMap[status] || status; //retorna o próprio status se não encontrar
}
