import { NextResponse } from "next/server";

import { prisma } from "@/lib/db"; // ajuste o path se necessário

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { category, subcategory } = body;

    if (!category || !subcategory) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Para listar os produtos, preciso da Categoria e da Subcategoria.",
        },
        { status: 400 }
      );
    }

    // Query focada na hierarquia
    const products = await prisma.product.findMany({
      where: {
        subcategory: {
          name: { equals: subcategory, mode: "insensitive" }, // Nome exato da subcat
          category: {
            name: { equals: category, mode: "insensitive" }, // Nome exato da cat
          },
        },
      },
      include: {
        subcategory: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        name: "asc", // Organiza por nome para facilitar a leitura
      },
    });

    //respostas
    if (products.length === 0) {
      return NextResponse.json({
        found: false,
        message: "Nenhum produto encontrado",
      });
    }

    return NextResponse.json({
      success: true,
      products: products.map((p) => ({
        id: p.id,
        name: p.name,
        stock: p.stock,
        price: p.price,
      })),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Erro ao consultar estoque" },
      { status: 500 }
    );
  }
}
