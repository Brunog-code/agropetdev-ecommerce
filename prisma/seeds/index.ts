//category, products
import "dotenv/config";

import { normalizeText } from "@/app/utils/helpers/normalizeText";

import { prisma } from "../../lib/db";

// Estrutura de um Produto (dentro do array 'products')
interface ProductData {
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  image: string; // O nome da propriedade é 'image' no seu JSON de dados
}

// Estrutura de uma Subcategoria (dentro do array 'subcategories')
interface SubcategoryData {
  name: string;
  slug: string;
  img: string;
  products: {
    create: ProductData[]; // Array de ProductData
  };
}

// Estrutura de uma Categoria (o elemento principal do array 'categoriesData')
interface CategoryData {
  name: string;
  slug: string;
  subcategories: {
    create: SubcategoryData[]; // Array de SubcategoryData
  };
}

const categoriesData: CategoryData[] = [
  {
    name: "Cachorros",
    slug: "cachorros",
    subcategories: {
      create: [
        {
          name: "Rações",
          slug: "racoes-para-caes",
          img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/cachorros/dog-racao.webp",
          products: {
            create: [
              {
                name: "Ração Premium Adulto 15kg",
                slug: "racao-premium-adulto-15kg",
                description:
                  "Ração seca completa para cães adultos, com vitaminas e minerais essenciais para manter a saúde e vitalidade.",
                price: 189.9,
                stock: 25,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/cachorros/Racoes/cachorros-Racao%20Premium%20Adulto%2015kg.jpg",
              },
              {
                name: "Ração Filhotes 3kg",
                slug: "racao-filhotes-3kg",
                description:
                  "Ração balanceada para filhotes em crescimento, com alto teor de proteína e DHA para o desenvolvimento cerebral.",
                price: 79.9,
                stock: 40,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/cachorros/Racoes/cachorros-%20Racao%20Filhotes%20Growth%203kg.jpg",
              },
              {
                name: "Ração Light Sênior 10kg",
                slug: "racao-light-senior-10kg",
                description:
                  "Ração leve para cães idosos, com fibras e nutrientes que ajudam na digestão e mobilidade.",
                price: 159.9,
                stock: 20,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/cachorros/Racoes/cachorros-Racao%20Light%20Senior%2010kg.jpg",
              },
            ],
          },
        },
        {
          name: "Brinquedos",
          slug: "brinquedos-para-caes",
          img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/cachorros/dog-brinquedo.webp",
          products: {
            create: [
              {
                name: "Bola Fetch Premium Média",
                slug: "bola-fetch-premium-media",
                description:
                  "Bola resistente ideal para trazer, roer ou brincar no parque — material durável e atóxico.",
                price: 24.9,
                stock: 50,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/cachorros/Brinquedos/cachorros-Bola%20Fetch%20Premium%20Media.jpg",
              },
              {
                name: "Corda Mordedor Resistente",
                slug: "corda-mordedor-resistente",
                description:
                  "Corda trançada para cães que gostam de mastigar e brincar de cabo-de-guerra.",
                price: 19.9,
                stock: 35,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/cachorros/Brinquedos/cachorros-Corda%20Mordedor%20Resistente.jpg",
              },
              {
                name: "Disco Frisbee Flexível",
                slug: "disco-frisbee-flexivel",
                description:
                  "Frisbee leve e flexível, ideal para cães ativos e brincadeiras ao ar livre.",
                price: 17.9,
                stock: 40,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/cachorros/Brinquedos/cachorros-Disco%20Frisbee%20Flexivel.jpg",
              },
            ],
          },
        },
        {
          name: "Rações úmidas",
          slug: "racoes-umidas-para-caes",
          img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/cachorros/dog-racao-umida.webp",
          products: {
            create: [
              {
                name: "Sachê Carne ao Molho 100g",
                slug: "sache-carne-molho-100g",
                description:
                  "Alimento úmido sabor carne, ideal para cães adultos ou idosos que precisam de alimentação mais leve.",
                price: 5.99,
                stock: 120,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/cachorros/Racoes%20umidas/cachorros-Sache%20Carne%20ao%20Molho%20100g.jpg",
              },
              {
                name: "Sachê Frango com Legumes 100g",
                slug: "sache-frango-legumes-100g",
                description:
                  "Alimento úmido balanceado com frango e legumes, ideal como complemento à ração seca.",
                price: 5.49,
                stock: 100,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/cachorros/Racoes%20umidas/cachorros-Sache%20Frango%20com%20Legumes%20100g.jpg",
              },
              {
                name: "Patê Premium Carne 280g",
                slug: "pate-premium-carne-280g",
                description:
                  "Patê úmido de alta palatabilidade, excelente para cães exigentes ou filhotes.",
                price: 12.9,
                stock: 70,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/cachorros/Racoes%20umidas/cahorros-Pate%20Premium%20Carne%20280g.jpg",
              },
            ],
          },
        },
        {
          name: "Antipulgas",
          slug: "antipulgas-para-caes",
          img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/cachorros/dog-antipulga.webp",
          products: {
            create: [
              {
                name: "Coleira Antipulgas 8 Meses",
                slug: "coleira-antipulgas-8-meses",
                description:
                  "Coleira com ação antipulgas e carrapatos por até 8 meses.",
                price: 99.9,
                stock: 30,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/cachorros/Antipulgas/cachorros-Coleira%20Antipulgas%208%20Meses.jpg",
              },
              {
                name: "Spray Spot-on Mensal",
                slug: "spray-spoton-mensal",
                description:
                  "Spray antipulgas e carrapatos, ideal para cães de pequeno e médio porte.",
                price: 69.9,
                stock: 45,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/cachorros/Antipulgas/cachorros-Spray%20Spot-on%20Mensal.jpg",
              },
              {
                name: "Pipeta Antipulgas Grande Porte",
                slug: "pipeta-antipulgas-grande-porte",
                description:
                  "Proteção antipulgas e carrapatos por 1 mês para cães de grande porte.",
                price: 79.9,
                stock: 40,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/cachorros/Antipulgas/cachorros-Pipeta%20Antipulgas%20Grande%20Porte.jpg",
              },
            ],
          },
        },
        {
          name: "Coleiras & Guias",
          slug: "coleiras-e-guias-para-caes",
          img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/cachorros/dog-coleira.webp",
          products: {
            create: [
              {
                name: "Coleira Ajustável Nylon P/M",
                slug: "coleira-ajustavel-nylon-pm",
                description:
                  "Coleira leve e resistente, ideal para cães de porte pequeno e médio.",
                price: 22.9,
                stock: 60,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/cachorros/Coleiras%20&%20Guias/cachorros-Coleira%20ajust%20Nylon.jpg",
              },
              {
                name: "Guia Retrátil 5m",
                slug: "guia-retratil-5m",
                description:
                  "Guia retrátil confortável para passeios em parques ou ruas.",
                price: 49.9,
                stock: 40,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/cachorros/Coleiras%20&%20Guias/cachorros-Guia%20retratil%205m.jpg",
              },
              {
                name: "Peitoral Anti-Puxão",
                slug: "peitoral-antipuxao",
                description:
                  "Peitoral anatômico que evita puxões e dá mais conforto ao cão e dono.",
                price: 79.9,
                stock: 25,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/cachorros/Coleiras%20&%20Guias/cachorros-eitoral%20Anti-Puxao.jpg",
              },
            ],
          },
        },
        {
          name: "Higiene & Shampoos",
          slug: "higiene-e-shampoo-para-caes",
          img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/cachorros/dog-shampoo.webp",
          products: {
            create: [
              {
                name: "Shampoo Neutro 500ml",
                slug: "shampoo-neutro-500ml",
                description:
                  "Shampoo neutro e suave, ideal para banhos frequentes e cães com pele sensível.",
                price: 24.9,
                stock: 40,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/cachorros/Higiene%20&%20Shampoos/cachorros-Shampoo%20Neutro%20500ml.jpg",
              },
              {
                name: "Condicionador Hidratante 250ml",
                slug: "condicionador-hidratante-250ml",
                description:
                  "Condicionador que deixa os pelos macios e com brilho natural.",
                price: 29.9,
                stock: 35,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/cachorros/Higiene%20&%20Shampoos/cachorros-Condicionador%20Hidratante%20250ml.jpg",
              },
              {
                name: "Lenços Umedecidos Pet 100 un",
                slug: "lencos-umedecidos-pet-100un",
                description:
                  "Lenços para higiene rápida, ideal para patas, focinho ou limpeza pós-passeio.",
                price: 14.9,
                stock: 80,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/cachorros/Higiene%20&%20Shampoos/cachorros-Lencos%20Umedecidos%20Pet%20100%20un.jpg",
              },
            ],
          },
        },
        {
          name: "Casinhas & Camas",
          slug: "casinhas-e-camas-para-caes",
          img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/cachorros/dag-casinha.webp",
          products: {
            create: [
              {
                name: "Cama Pet Confortável M",
                slug: "cama-pet-confortavel-m",
                description:
                  "Cama macia e confortável, ideal para cães de porte médio.",
                price: 129.9,
                stock: 15,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/cachorros/Casinhas%20&%20Camas/cachorros-Cama%20Pet%20Confortavel%20M.jpg",
              },
              {
                name: "Casinha Plástica Tam M",
                slug: "casinha-plastica-m",
                description:
                  "Casinha resistente e fácil de limpar, ideal para quintal ou varanda.",
                price: 229.9,
                stock: 10,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/cachorros/Casinhas%20&%20Camas/cachorros-Casinha%20plastica%20Tam%20M.jpg",
              },
              {
                name: "Colchonete Pet Impermeável",
                slug: "colchonete-pet-impermeavel",
                description:
                  "Colchonete impermeável e fácil de lavar, ideal para cães que dormem fora ou em áreas externas.",
                price: 99.9,
                stock: 20,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/cachorros/Casinhas%20&%20Camas/cachorros-Colchonete%20Pet%20Impermeavel.jpg",
              },
            ],
          },
        },
      ],
    },
  },

  {
    name: "Gatos",
    slug: "gatos",
    subcategories: {
      create: [
        {
          name: "Caixas de areia",
          slug: "caixas-de-areia-para-gatos",
          img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/gatos/cat-caixa.webp",
          products: {
            create: [
              {
                name: "Caixa de Areia Fechada com Filtro",
                slug: "caixa-areia-fechada-filtro",
                description:
                  "Caixa de areia fechada para gatos, reduz odores e garante privacidade ao pet.",
                price: 129.9,
                stock: 20,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/gatos/Caixas%20de%20areia/gatos-Caixa%20de%20Areia%20Fechada%20com%20Filtro.jpg",
              },
              {
                name: "Caixa de Areia Básica Grande",
                slug: "caixa-areia-basica-grande",
                description:
                  "Caixa de areia simples e espaçosa, ideal para uso diário.",
                price: 49.9,
                stock: 30,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/gatos/Caixas%20de%20areia/gatos-Caixa%20de%20Areia%20Basica%20Grande.jpg",
              },
              {
                name: "Caixa de Areia com Bordas Altas",
                slug: "caixa-areia-bordas-altas",
                description:
                  "Modelo com bordas elevadas que evita respingos de areia pelo ambiente.",
                price: 69.9,
                stock: 25,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/gatos/Caixas%20de%20areia/gatos-Caixa%20de%20Areia%20com%20Bordas%20Altas.webp",
              },
            ],
          },
        },
        {
          name: "Gramas digestivas",
          slug: "gramas-digestivas-para-gatos",
          img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/gatos/cat-grama.webp",
          products: {
            create: [
              {
                name: "Kit Grama para Gatos Natural",
                slug: "kit-grama-gatos-natural",
                description:
                  "Grama natural cultivável, ajuda na digestão e reduz bolas de pelo.",
                price: 22.9,
                stock: 40,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/gatos/Gramas%20digestivas/gatos-Kit%20Grama%20para%20Gatos%20Natural.jpg",
              },
              {
                name: "Grama Digestiva Desidratada 100g",
                slug: "grama-digestiva-desidratada-100g",
                description:
                  "Mistura desidratada pronta para uso, rica em fibras naturais.",
                price: 14.9,
                stock: 50,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/gatos/Gramas%20digestivas/gatos-Grama%20Digestiva%20Desidratada%20100g.jpg",
              },
              {
                name: "Grama Orgânica Crescimento Rápido",
                slug: "grama-organica-crescimento-rapido",
                description:
                  "Sementes orgânicas que germinam em 3 dias, ideal para estimular o intestino do gato.",
                price: 18.9,
                stock: 35,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/gatos/Gramas%20digestivas/gatos-Grama%20organica%20Crescimento%20Rapido.jpg",
              },
            ],
          },
        },
        {
          name: "Rações",
          slug: "racoes-para-gatos",
          img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/gatos/cat-racao.webp",
          products: {
            create: [
              {
                name: "Ração Premium Gatos Adultos 10kg",
                slug: "racao-premium-gatos-adultos-10kg",
                description:
                  "Ração completa para gatos adultos, rica em taurina e nutrientes essenciais.",
                price: 159.9,
                stock: 25,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/gatos/Racoes/gatos-Racao%20Premium%20Gatos%20Adultos%2010kg.jpg",
              },
              {
                name: "Ração Filhotes Indoor 3kg",
                slug: "racao-filhotes-indoor-3kg",
                description:
                  "Ração para gatinhos com alto teor proteico e DHA para desenvolvimento saudável.",
                price: 74.9,
                stock: 40,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/gatos/Racoes/gatos-Racao%20Filhotes%20Indoor%203kg.jpg",
              },
              {
                name: "Ração Light Castrados 1.5kg",
                slug: "racao-light-castrados-1-5kg",
                description:
                  "Ração específica para gatos castrados, controla peso e reduz formação de cálculos.",
                price: 49.9,
                stock: 50,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/gatos/Racoes/gatos-Racao%20Light%20Castrados%2015kg.jpg",
              },
            ],
          },
        },
        {
          name: "Rações úmidas",
          slug: "racoes-umidas-para-gatos",
          img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/gatos/cat-racao-umida.webp",
          products: {
            create: [
              {
                name: "Sachê Gatos Adultos Carne 85g",
                slug: "sache-gatos-carne-85g",
                description:
                  "Sachê úmido sabor carne, muito palatável e nutritivo.",
                price: 4.99,
                stock: 120,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/gatos/Racoes%20umidas/gatos-Sache%20Gatos%20Adultos%20Carne%2085g.jpg",
              },
              {
                name: "Sachê Filhotes Frango 85g",
                slug: "sache-filhotes-frango-85g",
                description:
                  "Alimento úmido para filhotes, ideal como complemento da dieta.",
                price: 4.49,
                stock: 100,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/gatos/Racoes%20umidas/gatos-Sache%20Filhotes%20Frango%2085g.jpg",
              },
              {
                name: "Patê Premium Peixe 170g",
                slug: "pate-premium-peixe-170g",
                description:
                  "Patê sabor peixe, rico em ômegas e excelente para gatos exigentes.",
                price: 9.9,
                stock: 60,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/gatos/Racoes%20umidas/gatos-pate%20Premium%20Peixe%20170g.jpg",
              },
            ],
          },
        },
        {
          name: "Brinquedos",
          slug: "brinquedos-para-gatos",
          img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/gatos/cat-brinquedo.webp",
          products: {
            create: [
              {
                name: "Varinha com Pena Interativa",
                slug: "varinha-pena-interativa",
                description:
                  "Brinquedo ideal para estimular a caça e brincadeira ativa.",
                price: 19.9,
                stock: 40,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/gatos/Brinquedos/gatos-Varinha%20com%20Pena%20Interativa.jpg",
              },
              {
                name: "Bolinhas Coloridas Kit 3un",
                slug: "bolinhas-coloridas-3un",
                description:
                  "Conjunto com 3 bolinhas leves e barulhentas, perfeitas para gatos brincalhões.",
                price: 12.9,
                stock: 50,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/gatos/Brinquedos/gatos-Bolinhas%20Coloridas%20Kit%203un.jpg",
              },
              {
                name: "Pelúcia Catnip Ratinho",
                slug: "pelucia-catnip-ratinho",
                description:
                  "Brinquedo com catnip natural, estimula atividade e curiosidade.",
                price: 15.9,
                stock: 45,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/gatos/Brinquedos/gatos-pelucia%20Catnip%20Ratinho.jpg",
              },
            ],
          },
        },
        {
          name: "Arranhadores",
          slug: "arranhadores-para-gatos",
          img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/gatos/cat-arranhador.webp",
          products: {
            create: [
              {
                name: "Arranhador Torre 3 Andares",
                slug: "arranhador-torre-3-andares",
                description:
                  "Torre com sisal e plataformas, ideal para gatos ativos.",
                price: 219.9,
                stock: 10,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/gatos/Arranhadores/gatos-Arranhador%20Torre%203%20Andares.jpg",
              },
              {
                name: "Arranhador Simples de Sisal",
                slug: "arranhador-simples-sisal",
                description:
                  "Poste vertical com sisal natural, resistente e compacto.",
                price: 79.9,
                stock: 25,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/gatos/Arranhadores/gatos-Arranhador%20Simples%20de%20Sisal.jpg",
              },
              {
                name: "Arranhador com Base e Brinquedo",
                slug: "arranhador-base-brinquedo",
                description:
                  "Poste com bola presa, ideal para brincar e arranhar.",
                price: 99.9,
                stock: 18,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/gatos/Arranhadores/gatos-Arranhador%20com%20Base%20e%20Brinquedo.jpg",
              },
            ],
          },
        },
        {
          name: "Fontes de água",
          slug: "fontes-de-agua-para-gatos",
          img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/gatos/cat-fonte.webp",
          products: {
            create: [
              {
                name: "Fonte Elétrica Silenciosa 2L",
                slug: "fonte-eletrica-silenciosa-2l",
                description:
                  "Fonte com filtro carvão, mantém a água sempre fresca e corrente.",
                price: 139.9,
                stock: 20,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/gatos/Fontes%20de%20agua/gatos-Fonte%20eletrica%20Silenciosa%202L.jpg",
              },
              {
                name: "Fonte Plástica 1.5L",
                slug: "fonte-plastica-1-5l",
                description:
                  "Modelo econômico, ideal para gatos que bebem pouca água.",
                price: 79.9,
                stock: 35,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/gatos/Fontes%20de%20agua/gatos-Fonte%20Plastica%2015L.jpg",
              },
              {
                name: "Fonte Inox Premium 2.5L",
                slug: "fonte-inox-premium-2-5l",
                description:
                  "Fonte moderna em aço inox com filtro duplo e jato ajustável.",
                price: 199.9,
                stock: 15,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/gatos/Fontes%20de%20agua/gatos-Fonte%20Inox%20Premium%2025L.jpg",
              },
            ],
          },
        },
      ],
    },
  },

  {
    name: "Aves",
    slug: "aves",
    subcategories: {
      create: [
        {
          name: "Rações para aves",
          slug: "racoes-para-aves",
          img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/aves/bird-racoes.webp",
          products: {
            create: [
              {
                name: "Ração Nutrópica Papagaio Seleção Natural 1kg",
                slug: "racao-nutropica-papagaio-selecao-natural-1kg",
                price: 59.9,
                description:
                  "Alimento completo extrusado para papagaios, feito com ingredientes naturais.",
                stock: 50,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/aves/racoes%20para%20aves/aves-Racao%20Nutropica%20Papagaio%20Selecao%20Natural%201kg.jpg",
              },
              {
                name: "Ração Alcon Club Curió 500g",
                slug: "racao-alcon-club-curio-500g",
                price: 29.9,
                description:
                  "Ração premium para curiós, rica em vitaminas essenciais para manutenção da saúde.",
                stock: 60,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/aves/racoes%20para%20aves/aves-Racao%20Alcon%20Club%20Curio%20500g.jpg",
              },
              {
                name: "Ração Zootekna Mix Calopsita 500g",
                slug: "racao-zootekna-mix-calopsita-500g",
                price: 22.5,
                description:
                  "Mistura balanceada de sementes selecionadas para calopsitas.",
                stock: 80,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/aves/racoes%20para%20aves/aves-Racao%20Zootekna%20Mix%20Calopsita%20500g.jpg",
              },
            ],
          },
        },
        {
          name: "Gaiolas",
          slug: "gaiolas-para-aves",
          img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/aves/bird-gaiolas.webp",
          products: {
            create: [
              {
                name: "Gaiola Nº 4 para Calopsita",
                slug: "gaiola-n4-para-calopsita",
                price: 199.9,
                description:
                  "Gaiola espaçosa e resistente, ideal para calopsitas e outras aves médias.",
                stock: 20,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/aves/Gaiolas/aves-Gaiola%20N%204%20para%20Calopsita.jpg",
              },
              {
                name: "Gaiola Redonda Luxo para Canário",
                slug: "gaiola-redonda-luxo-para-canario",
                price: 139.9,
                description:
                  "Gaiola decorativa redonda ideal para canários, periquitos e pequenos pássaros.",
                stock: 30,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/aves/Gaiolas/aves-gaiola-redonda-luxo-para-canario.jpg",
              },
              {
                name: "Gaiola Tucano Premium",
                slug: "gaiola-tucano-premium",
                price: 349.9,
                description:
                  "Gaiola premium com bandeja removível, poleiros e comedouros inclusos.",
                stock: 15,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/aves/Gaiolas/aves-Gaiola%20Tucano%20Premium.jpg",
              },
            ],
          },
        },
        {
          name: "Bebedouros & Comedouros",
          slug: "bebedouros-e-comedouros-para-aves",
          img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/aves/bird-bebedouro.webp",
          products: {
            create: [
              {
                name: "Bebedouro Automático para Aves 200ml",
                slug: "bebedouro-automatico-para-aves-200ml",
                price: 12.9,
                description:
                  "Bebedouro automático compatível com diversas gaiolas.",
                stock: 120,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/aves/Bebedouros%20&%20Comedouros/aves-Bebedouro%20Automatico%20para%20Aves%20200ml.jpg",
              },
              {
                name: "Comedouro Coletor de Sementes",
                slug: "comedouro-coletor-de-sementes",
                price: 18.5,
                description:
                  "Comedouro que evita desperdício e sujeira, ideal para pássaros pequenos.",
                stock: 90,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/aves/Bebedouros%20&%20Comedouros/aves-Comedouro%20Coletor%20de%20Sementes.jpg",
              },
              {
                name: "Bebedouro Fonte Mini para Passáros",
                slug: "bebedouro-fonte-mini-para-passaros",
                price: 25.9,
                description:
                  "Bebedouro estilo fonte que incentiva a hidratação das aves.",
                stock: 70,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/aves/Bebedouros%20&%20Comedouros/aves-Bebedouro%20Fonte%20Mini%20para%20Passaros.jpg",
              },
            ],
          },
        },
        {
          name: "Brinquedos para aves",
          slug: "brinquedos-para-aves",
          img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/aves/bird-brinquedo.webp",
          products: {
            create: [
              {
                name: "Brinquedo Escada de 6 Degraus",
                slug: "brinquedo-escada-de-6-degraus",
                price: 19.9,
                description:
                  "Escada de madeira natural ideal para calopsitas e periquitos.",
                stock: 100,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/aves/Brinquedos%20para%20aves/aves-Brinquedo%20Escada%20de%206%20Degraus.jpg",
              },
              {
                name: "Brinquedo Mordedor Colorido",
                slug: "brinquedo-mordedor-colorido",
                price: 14.9,
                description:
                  "Brinquedo interativo com cordas coloridas e madeira para roer.",
                stock: 85,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/aves/Brinquedos%20para%20aves/aves-Brinquedo%20Mordedor%20Colorido.jpg",
              },
              {
                name: "Balanço para Calopsita em Madeira",
                slug: "balanco-para-calopsita-em-madeira",
                price: 17.5,
                description:
                  "Balanço confortável e resistente feito em madeira natural.",
                stock: 75,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/aves/Brinquedos%20para%20aves/aves-Balanco%20para%20Calopsita%20em%20Madeira.jpg",
              },
            ],
          },
        },
        {
          name: "Vitaminas & Suplementos",
          slug: "vitaminas-para-aves",
          img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/aves/bird-vitamina.webp",
          products: {
            create: [
              {
                name: "Avitrin Vitamina para Aves 15ml",
                slug: "avitrin-vitamina-para-aves-15ml",
                price: 24.9,
                description:
                  "Suplemento vitamínico líquido para aves de pequeno e médio porte.",
                stock: 60,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/aves/Vitaminas%20&%20Suplementos/aves-Avitrin%20Vitamina%20para%20Aves%2015ml.jpg",
              },
              {
                name: "Complexo B Vetnil 30ml",
                slug: "complexo-b-vetnil-30ml",
                price: 32.9,
                description:
                  "Complexo vitamínico para fortalecer a saúde e evitar estresse.",
                stock: 40,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/aves/Vitaminas%20&%20Suplementos/aves-Complexo%20B%20Vetnil%2030ml.jpg",
              },
              {
                name: "Suplemento Oropharma Calci-Lux 150g",
                slug: "suplemento-oropharma-calci-lux-150g",
                price: 79.9,
                description:
                  "Cálcio de alta qualidade para fortalecer ossos e melhorar reprodução.",
                stock: 25,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/aves/Vitaminas%20&%20Suplementos/aves-Suplemento%20Oropharma%20Calci-Lux%20150g.jpg",
              },
            ],
          },
        },
      ],
    },
  },

  {
    name: "Piscina",
    slug: "piscina",
    subcategories: {
      create: [
        {
          name: "Cloro & Tratamento",
          slug: "cloro-e-tratamento",
          img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/psicina/psicina-cloro.webp",
          products: {
            create: [
              {
                name: "Cloro Granulado 1kg HTH",
                slug: "cloro-granulado-1kg-hth",
                description:
                  "Cloro granulado para tratamento de piscina, eficaz contra bactérias e algas.",
                price: 34.9,
                stock: 50,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/piscina/Cloro%20&%20Tratamento/piscina-Cloro%20Granulado%201kg%20HTH.jpg",
              },
              {
                name: "Algicida Shock 1L",
                slug: "algicida-shock-1l",
                description:
                  "Algicida concentrado para eliminar algas e manter a água cristalina.",
                price: 29.9,
                stock: 40,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/piscina/Cloro%20&%20Tratamento/piscina-algicida%20Shock%201L.jpg",
              },
              {
                name: "Clarificante Líquido 1L",
                slug: "clarificante-liquido-1l",
                description:
                  "Clarificante que ajuda a deixar a água transparente e limpa.",
                price: 24.9,
                stock: 45,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/piscina/Cloro%20&%20Tratamento/piscina-Clarificante%20liquido%201L.jpg",
              },
            ],
          },
        },
        {
          name: "Aspiradores",
          slug: "aspiradores-de-piscina",
          img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/psicina/psicina-aspirador.webp",
          products: {
            create: [
              {
                name: "Aspirador Manual para Piscina",
                slug: "aspirador-manual-piscina",
                description:
                  "Aspirador manual para limpeza de fundo e laterais da piscina.",
                price: 89.9,
                stock: 30,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/piscina/Aspiradores/piscina-Aspirador%20Manual%20para%20Piscina.webp",
              },
              {
                name: "Aspirador Elétrico Automático",
                slug: "aspirador-eletrico-automatico",
                description:
                  "Aspirador automático para limpeza completa da piscina sem esforço.",
                price: 499.9,
                stock: 10,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/piscina/Aspiradores/piscina-Aspirador%20eletrrico%20auto.jpg",
              },
              {
                name: "Aspirador Pó e Areia - Refil 2L",
                slug: "aspirador-po-areia-refil-2l",
                description:
                  "Aspirador eficiente para remoção de pó, areia e resíduos leves.",
                price: 149.9,
                stock: 25,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/piscina/Aspiradores/piscina-Aspirador%20po%20e%20areia.webp",
              },
            ],
          },
        },
        {
          name: "Filtros & Bombas",
          slug: "filtros-e-bombas",
          img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/psicina/psicina-filtro.webp",
          products: {
            create: [
              {
                name: "Bomba Filtro 1/2 HP",
                slug: "bomba-filtro-1-2-hp",
                description:
                  "Bomba com filtro para piscina de até 40 mil litros.",
                price: 349.9,
                stock: 12,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/piscina/Filtros%20&%20Bombas/piscina-Bomba%20Filtro%2012%20HP.jpg",
              },
              {
                name: "Filtro de Areia 300mm",
                slug: "filtro-de-areia-300mm",
                description:
                  "Filtro de areia para limpeza eficiente da água da piscina.",
                price: 499.9,
                stock: 8,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/piscina/Filtros%20&%20Bombas/piscina-Filtro%20de%20Areia%20300mm.webp",
              },
              {
                name: "Kit Manutenção Filtros e Bombas",
                slug: "kit-manutencao-filtros-bombas",
                description:
                  "Kit com mangueiras e ferramentas para manutenção de filtros e bombas de piscina.",
                price: 129.9,
                stock: 20,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/piscina/Filtros%20&%20Bombas/piscina-Kit%20manut%20Filtros%20e%20Bombas.webp",
              },
            ],
          },
        },
      ],
    },
  },

  {
    name: "Jardim",
    slug: "jardim",
    subcategories: {
      create: [
        {
          name: "Adubos & Fertilizantes",
          slug: "adubos-e-fertilizantes",
          img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/jardim/garden-adubo.webp",
          products: {
            create: [
              {
                name: "Adubo Orgânico 5kg",
                slug: "adubo-organico-5kg",
                description:
                  "Adubo orgânico para hortas e jardins, promove crescimento saudável das plantas.",
                price: 29.9,
                stock: 50,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/jardim/Adubos%20&%20Fertilizantes/jardim-Adubo%20organico%205kg.webp",
              },
              {
                name: "Fertilizante NPK 10-10-10 1kg",
                slug: "fertilizante-npk-10-10-10-1kg",
                description:
                  "Fertilizante NPK completo para todas as plantas, rico em nutrientes.",
                price: 19.9,
                stock: 60,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/jardim/Adubos%20&%20Fertilizantes/jardim-Fertilizante%20NPK%2010-10-10%201kg.webp",
              },
              {
                name: "Composto Orgânico 10L",
                slug: "composto-organico-10l",
                description:
                  "Composto orgânico para adubação natural de jardins e hortas.",
                price: 39.9,
                stock: 40,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/jardim/Adubos%20&%20Fertilizantes/jardim-Composto%20organico%2010L.jpg",
              },
            ],
          },
        },
        {
          name: "Ferramentas",
          slug: "ferramentas-de-jardim",
          img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/jardim/garden-ferramerta.webp",
          products: {
            create: [
              {
                name: "Pá de Jardim",
                slug: "pa-de-jardim",
                description:
                  "Pá resistente para jardinagem, plantio e manuseio de terra.",
                price: 24.9,
                stock: 70,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/jardim/Ferramentas/jardim-pa%20de%20jardim.png",
              },
              {
                name: "Tesoura de Poda",
                slug: "tesoura-de-poda",
                description:
                  "Tesoura de poda para cortes precisos em arbustos e flores.",
                price: 34.9,
                stock: 55,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/jardim/Ferramentas/jardim-Tesoura%20de%20Poda.jpg",
              },
              {
                name: "Enxada de Jardim",
                slug: "enxada-de-jardim",
                description:
                  "Enxada resistente para capinar, preparar canteiros e mexer a terra.",
                price: 49.9,
                stock: 35,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/jardim/Ferramentas/jardim-Enxada%20de%20Jardim.png",
              },
            ],
          },
        },
        {
          name: "Regadores & Mangueiras",
          slug: "regadores-e-mangueiras",
          img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/jardim/garden-regador.webp",
          products: {
            create: [
              {
                name: "Regador Plástico 10L",
                slug: "regador-plastico-10l",
                description:
                  "Regador plástico resistente, ideal para regar plantas e flores.",
                price: 29.9,
                stock: 60,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/jardim/Regadores%20&%20Mangueiras/jardim-Regador%20plastico10L.webp",
              },
              {
                name: "Mangueira Flexível 15m",
                slug: "mangueira-flexivel-15m",
                description:
                  "Mangueira flexível para irrigação de jardins e hortas, resistente e durável.",
                price: 69.9,
                stock: 40,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/jardim/Regadores%20&%20Mangueiras/jardim-Mangueira%20flexivel%2015m.jpg",
              },
              {
                name: "Kit Regador + Mangueira 5m",
                slug: "kit-regador-mangueira-5m",
                description:
                  "Kit completo com regador e mangueira para irrigação prática de plantas.",
                price: 79.9,
                stock: 30,
                image:
                  "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/prodcts-img/jardim/Regadores%20&%20Mangueiras/jardim-Kit%20Regador%20Mangueira%205m.webp",
              },
            ],
          },
        },
      ],
    },
  },
];

async function mainSeeds() {
  console.log("=== Iniciando seeds Categorias... ===");

  for (const category of categoriesData) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: {
        name: category.name,
        slug: category.slug,
        subcategories: {
          create: category.subcategories.create.map((sub) => ({
            name: sub.name,
            slug: sub.slug,
            img: sub.img,
            products: {
              create: sub.products.create.map((product) => ({
                name: product.name,
                nameNormalized: normalizeText(product.name),
                slug: product.slug,
                description: product.description,
                price: product.price,
                stock: product.stock,
                image: product.image,
              })),
            },
          })),
        },
      },
    });
    console.log(`${category.name} criada com sucesso!`);
  }

  console.log("=== Seeds Categorias finalizados com sucesso! ===");
}

mainSeeds().finally(() => prisma.$disconnect());
