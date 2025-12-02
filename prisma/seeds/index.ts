//category, products
import "dotenv/config";
import {prisma} from '../../lib/db'

const categoriesData = [
  {
    name: "Cachorros",
    slug: "cachorros",
    subcategories: [
      { name: "Rações", slug: "racoes-para-caes" },
      { name: "Brinquedos", slug: "brinquedos-para-caes" },
      { name: "Rações úmidas", slug: "racoes-umidas-para-caes" },
      { name: "Antipulgas", slug: "antipulgas-para-caes" },
      { name: "Tapetes higiênicos", slug: "tapetes-higienicos-para-caes" },
      { name: "Coleiras & Guias", slug: "coleiras-e-guias-para-caes" },
      { name: "Higiene & Shampoos", slug: "higiene-e-shampoo-para-caes" },
      { name: "Casinhas & Camas", slug: "casinhas-e-camas-para-caes" },
    ],
  },

  {
    name: "Gatos",
    slug: "gatos",
    subcategories: [
      { name: "Caixas de areia", slug: "caixas-de-areia-para-gatos" },
      { name: "Gramas digestivas", slug: "gramas-digestivas-para-gatos" },
      { name: "Rações", slug: "racoes-para-gatos" },
      { name: "Rações úmidas", slug: "racoes-umidas-para-gatos" },
      { name: "Brinquedos", slug: "brinquedos-para-gatos" },
      { name: "Arranhadores", slug: "arranhadores-para-gatos" },
      { name: "Fontes de água", slug: "fontes-de-agua-para-gatos" },
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
  console.log(" === Iniciando seeds... ===");

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

  console.log("=== Seeds finalizados com sucesso! ===");
}

mainSeeds().finally(() => prisma.$disconnect());
