//itens do pedido
export type TShippingType = "PAC" | "SEDEX";

export interface IItemOrder {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number; // Decimal já convertido
}

//pedido
export interface IFormattedOrder {
  id: string;
  userId: string;

  subtotal: number;
  shippingCost: number;
  total: number;

  shippingType: TShippingType;
  shippingEta: number;

  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  zip: string;

  itemsOrder: IItemOrder[];
}

//retorno do backend
export type TCreateOrderResponse =
  | {
      success: true;
      order: IFormattedOrder;
    }
  | {
      success: false;
      message: string;
    };
