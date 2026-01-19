import * as React from 'react';

// Correção para o erro de ESLint no explicit-any
// Definimos uma interface para o que estamos injetando
interface ReactWithAct {
  act?: (cb: () => void | Promise<void>) => void | Promise<void>;
}

if (!(React as ReactWithAct).act) {
  (React as unknown as Required<ReactWithAct>).act = (cb) => {
    const result = cb();
    return result;
  };
}

jest.mock("@/app/contexts/AuthCont", () => ({
    useAuth: () => ({
      session: null,
      user: null,
    }),
  }));

  interface MockCartState {
    addToCart: jest.Mock;
    openDrawer: jest.Mock;
  }
  
  jest.mock("@/app/store/cartStore", () => ({
    useCartStore: (selector: (state: MockCartState) => unknown) =>
      selector({
        addToCart: jest.fn(),
        openDrawer: jest.fn(),
      }),
  }));
  
  jest.mock("../../actions/add-item-cart", () => ({
    updateItemQuantity: jest.fn(),
  }));
  
  jest.mock("react-hot-toast", () => ({
    __esModule: true,
    default: {
      success: jest.fn(),
      error: jest.fn(),
    },
  }));

import { fireEvent,render, screen, waitFor  } from "@testing-library/react";
import toast from "react-hot-toast";

import { IProduct } from "@/app/utils/types/product";

import { ButtonAddCart } from ".";

export const mockProduct: IProduct = {
    id: "prod-123",
    name: "Produto Teste",
    nameNormalized: "produto teste",
    slug: "produto-teste",
    description: "Descrição do produto teste para testes unitários",
    price: 199.9,
    stock: 10,
    image: "https://fake-image-url.com/product.png",
    subcategoryId: "subcat-1",
  };

describe('Button add cart Component', () => {

    it('should add to cart button component', async() => {
        render(<ButtonAddCart disabled={false}  product={mockProduct}/>)

        const buttonAddCart = screen.getByRole('button')

        fireEvent.click(buttonAddCart)

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith("Adicionado ao carrinho!");
        });
    })
})