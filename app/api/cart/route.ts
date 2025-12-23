import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

export type CartItem = {
  id: string;
  description: string;
  image: string;
  price: number;
  name: string;
  slug: string;
  stock: number;
  subcategoryId?: string;
  quantity: number;
};

//GET
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "Necessário userId", items: [] },
        { status: 400 }
      );
    }

    //buscar carrinho
    const cart = await prisma.cart.findFirst({
      where: {
        userId,
      },
      include: {
        itemsCart: {
          include: {
            product: true,
          },
        },
      },
    });

    //mapear itens cart
    const items =
      cart?.itemsCart.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        description: item.product.description,
        image: item.product.image,
        slug: item.product.slug,
        stock: item.product.stock,
        price: Number(item.price),
        quantity: item.quantity,
      })) ?? [];

    return NextResponse.json({ items });
  } catch (error) {
    console.error("[GET /api/cart]", error);

    return NextResponse.json(
      { error: "Erro ao buscar carrinho", items: [] },
      { status: 500 }
    );
  }
}

//POST
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, currentItems } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "userId obrigatório" },
        { status: 400 }
      );
    }

    //garantir que o carrinho exista
    const cart = await prisma.cart.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    //limpar items antigos
    await prisma.itemCart.deleteMany({
      where: { cartId: cart.id },
    });

    //recriar items do carrinho
    await prisma.itemCart.createMany({
      data: currentItems.map((item: CartItem) => ({
        cartId: cart.id,
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: `Erro ao salvar carrinho, ${error}` },
      { status: 500 }
    );
  }
}
