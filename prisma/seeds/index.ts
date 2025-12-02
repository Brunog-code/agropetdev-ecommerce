//category, products
import "dotenv/config";
import { prisma } from "../../lib/db";

const categoriesData = [
  {
    name: "Cachorros",
    slug: "cachorros",
    subcategories: [
      {
        name: "Rações",
        slug: "racoes-para-caes",
        img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/cachorros/dog-racao.webp",
      },
      {
        name: "Brinquedos",
        slug: "brinquedos-para-caes",
        img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/cachorros/dog-brinquedo.webp",
      },
      {
        name: "Rações úmidas",
        slug: "racoes-umidas-para-caes",
        img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/cachorros/dog-racao-umida.webp",
      },
      {
        name: "Antipulgas",
        slug: "antipulgas-para-caes",
        img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/cachorros/dog-antipulga.webp",
      },
      {
        name: "Coleiras & Guias",
        slug: "coleiras-e-guias-para-caes",
        img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/cachorros/dog-coleira.webp",
      },
      {
        name: "Higiene & Shampoos",
        slug: "higiene-e-shampoo-para-caes",
        img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/cachorros/dog-shampoo.webp",
      },
      {
        name: "Casinhas & Camas",
        slug: "casinhas-e-camas-para-caes",
        img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/cachorros/dag-casinha.webp",
      },
    ],
  },

  {
    name: "Gatos",
    slug: "gatos",
    subcategories: [
      {
        name: "Caixas de areia",
        slug: "caixas-de-areia-para-gatos",
        img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/gatos/cat-caixa.webp",
      },
      {
        name: "Gramas digestivas",
        slug: "gramas-digestivas-para-gatos",
        img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/gatos/cat-grama.webp",
      },
      {
        name: "Rações",
        slug: "racoes-para-gatos",
        img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/gatos/cat-racao.webp",
      },
      {
        name: "Rações úmidas",
        slug: "racoes-umidas-para-gatos",
        img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/gatos/cat-racao-umida.webp",
      },
      {
        name: "Brinquedos",
        slug: "brinquedos-para-gatos",
        img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/gatos/cat-brinquedo.webp",
      },
      {
        name: "Arranhadores",
        slug: "arranhadores-para-gatos",
        img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/gatos/cat-arranhador.webp",
      },
      {
        name: "Fontes de água",
        slug: "fontes-de-agua-para-gatos",
        img: "https://wcpvdrfhvnarjagqwhho.supabase.co/storage/v1/object/public/images-agropet/imagens-agropet/subcategorias-img/gatos/cat-fonte.webp",
      },
    ],
  },

  {
    name: "Aves",
    slug: "aves",
    subcategories: [
      { name: "Rações para aves", slug: "racoes-para-aves" },
      { name: "Gaiolas", slug: "gaiolas-para-aves" },
      {
        name: "Bebedouros & Comedouros",
        slug: "bebedouros-e-comedouros-para-aves",
      },
      { name: "Brinquedos para aves", slug: "brinquedos-para-aves" },
      { name: "Vitaminas & Suplementos", slug: "vitaminas-para-aves" },
    ],
  },

  {
    name: "Piscina",
    slug: "piscina",
    subcategories: [
      { name: "Cloro & Tratamento", slug: "cloro-e-tratamento" },
      { name: "Aspiradores", slug: "aspiradores-de-piscina" },
      { name: "Filtros & Bombas", slug: "filtros-e-bombas" },
    ],
  },

  {
    name: "Jardim",
    slug: "jardim",
    subcategories: [
      { name: "Adubos & Fertilizantes", slug: "adubos-e-fertilizantes" },
      { name: "Ferramentas", slug: "ferramentas-de-jardim" },
      { name: "Regadores & Mangueiras", slug: "regadores-e-mangueiras" },
    ],
  },
];

async function mainSeeds() {
  console.log(" === Iniciando seeds Categorias... ===");

  for (const category of categoriesData) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: {
        name: category.name,
        slug: category.slug,
        subcategories: {
          create: category.subcategories,
        },
      },
    });
    console.log(`${category.name} criada com sucesso!`);
  }

  console.log("=== Seeds Categorias finalizados com sucesso! ===");
}

mainSeeds().finally(() => prisma.$disconnect());
