//itens do pedido
export type TShippingType = "PAC" | "SEDEX";
export type TStatusOrder =
  | "pending"
  | "paid"
  | "shipped"
  | "delivered"
  | "failed"
  | "refunded"
  | "canceled";

export interface IItemOrder {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number; // Decimal já convertido
  product?: {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    subcategoryId?: string;
    nameNormalized: string;
    subcategory: {
      categoryId: string;
      id: string;
      img: string | null;
      name: string;
      slug: string;
      category: {
        id: string;
        name: string;
        slug: string;
      };
    };
  };
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

//extendendo para o getOrders
export interface IGetOrders extends IFormattedOrder {
  createdAt: Date;
  status: TStatusOrder;
  stripeSessionId: string | null;
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
      productsEmpty?: string[];
    };
