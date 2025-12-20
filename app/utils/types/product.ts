export interface IFullProduct {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    subcategoryId: string;
  };
  subcategory: {
    name: string;
    slug: string;
  };
  category: {
    slug: string;
  };
}

export interface IProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  subcategoryId?: string;
}
