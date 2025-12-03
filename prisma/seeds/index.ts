//category, products
import "dotenv/config";
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
                  "https://images.pexels.com/photos/4587995/pexels-photo-4587995.jpeg",
              },
              {
                name: "Ração Filhotes Growth 3kg",
                slug: "racao-filhotes-growth-3kg",
                description:
                  "Ração balanceada para filhotes em crescimento, com alto teor de proteína e DHA para o desenvolvimento cerebral.",
                price: 79.9,
                stock: 40,
                image:
                  "https://images.pexels.com/photos/4587998/pexels-photo-4587998.jpeg",
              },
              {
                name: "Ração Light Sênior 10kg",
                slug: "racao-light-senior-10kg",
                description:
                  "Ração leve para cães idosos, com fibras e nutrientes que ajudam na digestão e mobilidade.",
                price: 159.9,
                stock: 20,
                image:
                  "https://images.pexels.com/photos/4588001/pexels-photo-4588001.jpeg",
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
                  "https://images.pexels.com/photos/5731927/pexels-photo-5731927.jpeg",
              },
              {
                name: "Corda Mordedor Resistente",
                slug: "corda-mordedor-resistente",
                description:
                  "Corda trançada para cães que gostam de mastigar e brincar de cabo-de-guerra.",
                price: 19.9,
                stock: 35,
                image:
                  "https://images.pexels.com/photos/4588012/pexels-photo-4588012.jpeg",
              },
              {
                name: "Disco Frisbee Flexível",
                slug: "disco-frisbee-flexivel",
                description:
                  "Frisbee leve e flexível, ideal para cães ativos e brincadeiras ao ar livre.",
                price: 17.9,
                stock: 40,
                image:
                  "https://images.pexels.com/photos/4588421/pexels-photo-4588421.jpeg",
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
                  "https://images.pexels.com/photos/4588005/pexels-photo-4588005.jpeg",
              },
              {
                name: "Sachê Frango com Legumes 100g",
                slug: "sache-frango-legumes-100g",
                description:
                  "Alimento úmido balanceado com frango e legumes, ideal como complemento à ração seca.",
                price: 5.49,
                stock: 100,
                image:
                  "https://images.pexels.com/photos/4588006/pexels-photo-4588006.jpeg",
              },
              {
                name: "Patê Premium Carne 280g",
                slug: "pate-premium-carne-280g",
                description:
                  "Patê úmido de alta palatabilidade, excelente para cães exigentes ou filhotes.",
                price: 12.9,
                stock: 70,
                image:
                  "https://images.pexels.com/photos/4588008/pexels-photo-4588008.jpeg",
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
                  "https://images.pexels.com/photos/6231714/pexels-photo-6231714.jpeg",
              },
              {
                name: "Spray Spot-on Mensal",
                slug: "spray-spoton-mensal",
                description:
                  "Spray antipulgas e carrapatos, ideal para cães de pequeno e médio porte.",
                price: 69.9,
                stock: 45,
                image:
                  "https://images.pexels.com/photos/6231726/pexels-photo-6231726.jpeg",
              },
              {
                name: "Pipeta Antipulgas Grande Porte",
                slug: "pipeta-antipulgas-grande-porte",
                description:
                  "Proteção antipulgas e carrapatos por 1 mês para cães de grande porte.",
                price: 79.9,
                stock: 40,
                image:
                  "https://images.pexels.com/photos/6231725/pexels-photo-6231725.jpeg",
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
                  "https://images.pexels.com/photos/7210751/pexels-photo-7210751.jpeg",
              },
              {
                name: "Guia Retrátil 5m",
                slug: "guia-retratil-5m",
                description:
                  "Guia retrátil confortável para passeios em parques ou ruas.",
                price: 49.9,
                stock: 40,
                image:
                  "https://images.pexels.com/photos/7210753/pexels-photo-7210753.jpeg",
              },
              {
                name: "Peitoral Anti-Puxão",
                slug: "peitoral-antipuxao",
                description:
                  "Peitoral anatômico que evita puxões e dá mais conforto ao cão e dono.",
                price: 79.9,
                stock: 25,
                image:
                  "https://images.pexels.com/photos/7210735/pexels-photo-7210735.jpeg",
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
                  "https://images.pexels.com/photos/7310228/pexels-photo-7310228.jpeg",
              },
              {
                name: "Condicionador Hidratante 250ml",
                slug: "condicionador-hidratante-250ml",
                description:
                  "Condicionador que deixa os pelos macios e com brilho natural.",
                price: 29.9,
                stock: 35,
                image:
                  "https://images.pexels.com/photos/7310155/pexels-photo-7310155.jpeg",
              },
              {
                name: "Lenços Umedecidos Pet 100 un",
                slug: "lencos-umedecidos-pet-100un",
                description:
                  "Lenços para higiene rápida, ideal para patas, focinho ou limpeza pós-passeio.",
                price: 14.9,
                stock: 80,
                image:
                  "https://images.pexels.com/photos/7310137/pexels-photo-7310137.jpeg",
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
                  "https://images.pexels.com/photos/5731906/pexels-photo-5731906.jpeg",
              },
              {
                name: "Casinha Plástica Tam M",
                slug: "casinha-plastica-m",
                description:
                  "Casinha resistente e fácil de limpar, ideal para quintal ou varanda.",
                price: 229.9,
                stock: 10,
                image:
                  "https://images.pexels.com/photos/3933962/pexels-photo-3933962.jpeg",
              },
              {
                name: "Colchonete Pet Impermeável",
                slug: "colchonete-pet-impermeavel",
                description:
                  "Colchonete impermeável e fácil de lavar, ideal para cães que dormem fora ou em áreas externas.",
                price: 99.9,
                stock: 20,
                image:
                  "https://images.pexels.com/photos/7210755/pexels-photo-7210755.jpeg",
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
                  "https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg",
              },
              {
                name: "Caixa de Areia Básica Grande",
                slug: "caixa-areia-basica-grande",
                description:
                  "Caixa de areia simples e espaçosa, ideal para uso diário.",
                price: 49.9,
                stock: 30,
                image:
                  "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg",
              },
              {
                name: "Caixa de Areia com Bordas Altas",
                slug: "caixa-areia-bordas-altas",
                description:
                  "Modelo com bordas elevadas que evita respingos de areia pelo ambiente.",
                price: 69.9,
                stock: 25,
                image:
                  "https://images.pexels.com/photos/574093/pexels-photo-574093.jpeg",
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
                  "https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg",
              },
              {
                name: "Grama Digestiva Desidratada 100g",
                slug: "grama-digestiva-desidratada-100g",
                description:
                  "Mistura desidratada pronta para uso, rica em fibras naturais.",
                price: 14.9,
                stock: 50,
                image:
                  "https://images.pexels.com/photos/2071871/pexels-photo-2071871.jpeg",
              },
              {
                name: "Grama Orgânica Crescimento Rápido",
                slug: "grama-organica-crescimento-rapido",
                description:
                  "Sementes orgânicas que germinam em 3 dias, ideal para estimular o intestino do gato.",
                price: 18.9,
                stock: 35,
                image:
                  "https://images.pexels.com/photos/2071869/pexels-photo-2071869.jpeg",
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
                  "https://images.pexels.com/photos/6231715/pexels-photo-6231715.jpeg",
              },
              {
                name: "Ração Filhotes Indoor 3kg",
                slug: "racao-filhotes-indoor-3kg",
                description:
                  "Ração para gatinhos com alto teor proteico e DHA para desenvolvimento saudável.",
                price: 74.9,
                stock: 40,
                image:
                  "https://images.pexels.com/photos/6231717/pexels-photo-6231717.jpeg",
              },
              {
                name: "Ração Light Castrados 1.5kg",
                slug: "racao-light-castrados-1-5kg",
                description:
                  "Ração específica para gatos castrados, controla peso e reduz formação de cálculos.",
                price: 49.9,
                stock: 50,
                image:
                  "https://images.pexels.com/photos/6231720/pexels-photo-6231720.jpeg",
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
                  "https://images.pexels.com/photos/4588005/pexels-photo-4588005.jpeg",
              },
              {
                name: "Sachê Filhotes Frango 85g",
                slug: "sache-filhotes-frango-85g",
                description:
                  "Alimento úmido para filhotes, ideal como complemento da dieta.",
                price: 4.49,
                stock: 100,
                image:
                  "https://images.pexels.com/photos/4588006/pexels-photo-4588006.jpeg",
              },
              {
                name: "Patê Premium Peixe 170g",
                slug: "pate-premium-peixe-170g",
                description:
                  "Patê sabor peixe, rico em ômegas e excelente para gatos exigentes.",
                price: 9.9,
                stock: 60,
                image:
                  "https://images.pexels.com/photos/4588008/pexels-photo-4588008.jpeg",
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
                  "https://images.pexels.com/photos/127028/pexels-photo-127028.jpeg",
              },
              {
                name: "Bolinhas Coloridas Kit 3un",
                slug: "bolinhas-coloridas-3un",
                description:
                  "Conjunto com 3 bolinhas leves e barulhentas, perfeitas para gatos brincalhões.",
                price: 12.9,
                stock: 50,
                image:
                  "https://images.pexels.com/photos/7210701/pexels-photo-7210701.jpeg",
              },
              {
                name: "Pelúcia Catnip Ratinho",
                slug: "pelucia-catnip-ratinho",
                description:
                  "Brinquedo com catnip natural, estimula atividade e curiosidade.",
                price: 15.9,
                stock: 45,
                image:
                  "https://images.pexels.com/photos/1766631/pexels-photo-1766631.jpeg",
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
                  "https://images.pexels.com/photos/7075817/pexels-photo-7075817.jpeg",
              },
              {
                name: "Arranhador Simples de Sisal",
                slug: "arranhador-simples-sisal",
                description:
                  "Poste vertical com sisal natural, resistente e compacto.",
                price: 79.9,
                stock: 25,
                image:
                  "https://images.pexels.com/photos/5731903/pexels-photo-5731903.jpeg",
              },
              {
                name: "Arranhador com Base e Brinquedo",
                slug: "arranhador-base-brinquedo",
                description:
                  "Poste com bola presa, ideal para brincar e arranhar.",
                price: 99.9,
                stock: 18,
                image:
                  "https://images.pexels.com/photos/3861256/pexels-photo-3861256.jpeg",
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
                  "https://images.pexels.com/photos/4588049/pexels-photo-4588049.jpeg",
              },
              {
                name: "Fonte Plástica 1.5L",
                slug: "fonte-plastica-1-5l",
                description:
                  "Modelo econômico, ideal para gatos que bebem pouca água.",
                price: 79.9,
                stock: 35,
                image:
                  "https://images.pexels.com/photos/4588050/pexels-photo-4588050.jpeg",
              },
              {
                name: "Fonte Inox Premium 2.5L",
                slug: "fonte-inox-premium-2-5l",
                description:
                  "Fonte moderna em aço inox com filtro duplo e jato ajustável.",
                price: 199.9,
                stock: 15,
                image:
                  "https://images.pexels.com/photos/4588043/pexels-photo-4588043.jpeg",
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
                  "https://images.tcdn.com.br/img/img_prod/788540/racao_nutropica_papagaio_selecao_natural_1kg_2055_1_b2da0e87f3dbb58aa64cfb39bec57ee3.jpg",
              },
              {
                name: "Ração Alcon Club Curió 500g",
                slug: "racao-alcon-club-curio-500g",
                price: 29.9,
                description:
                  "Ração premium para curiós, rica em vitaminas essenciais para manutenção da saúde.",
                stock: 60,
                image:
                  "https://static3.tcdn.com.br/img/img_prod/708512/racao_alcon_club_curio_500g_2287_1_20201211100812.jpg",
              },
              {
                name: "Ração Zootekna Mix Calopsita 500g",
                slug: "racao-zootekna-mix-calopsita-500g",
                price: 22.5,
                description:
                  "Mistura balanceada de sementes selecionadas para calopsitas.",
                stock: 80,
                image:
                  "https://static3.tcdn.com.br/img/img_prod/698889/mix_calopsita_zootekna_500g_1687_1_20201204152243.jpg",
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
                  "https://www.bichosnaria.com.br/media/catalog/product/cache/1/image/700x/040ec09b1e35df139433887a97daa66f/g/a/gaiola_calopsita_n4.jpg",
              },
              {
                name: "Gaiola Redonda Luxo para Canário",
                slug: "gaiola-redonda-luxo-para-canario",
                price: 139.9,
                description:
                  "Gaiola decorativa redonda ideal para canários, periquitos e pequenos pássaros.",
                stock: 30,
                image:
                  "https://images.tcdn.com.br/img/img_prod/675651/gaiola_redonda_luxo_para_canario_2503_1_7fc91dc98e65ce42928de0b9230e6505.jpg",
              },
              {
                name: "Gaiola Tucano Premium",
                slug: "gaiola-tucano-premium",
                price: 349.9,
                description:
                  "Gaiola premium com bandeja removível, poleiros e comedouros inclusos.",
                stock: 15,
                image:
                  "https://static3.tcdn.com.br/img/img_prod/726504/gaiola_tucano_preta_premium_8197_1_20191206154108.jpg",
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
                  "https://images.tcdn.com.br/img/img_prod/788540/bebedouro_automatico_para_aves_200ml_2054_1_2d75d27be27fa9982f9b2585fa1313d7.jpg",
              },
              {
                name: "Comedouro Coletor de Sementes",
                slug: "comedouro-coletor-de-sementes",
                price: 18.5,
                description:
                  "Comedouro que evita desperdício e sujeira, ideal para pássaros pequenos.",
                stock: 90,
                image:
                  "https://www.petvale.com.br/media/catalog/product/cache/1/image/700x/040ec09b1e35df139433887a97daa66f/c/o/comedouro_aves_anti-desperdicio.jpg",
              },
              {
                name: "Bebedouro Fonte Mini para Passáros",
                slug: "bebedouro-fonte-mini-para-passaros",
                price: 25.9,
                description:
                  "Bebedouro estilo fonte que incentiva a hidratação das aves.",
                stock: 70,
                image:
                  "https://m.media-amazon.com/images/I/51iISiYDUFL._AC_.jpg",
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
                  "https://images.tcdn.com.br/img/img_prod/708512/escada_para_aves_6_degraus_1907_1_20201211100810.jpg",
              },
              {
                name: "Brinquedo Mordedor Colorido",
                slug: "brinquedo-mordedor-colorido",
                price: 14.9,
                description:
                  "Brinquedo interativo com cordas coloridas e madeira para roer.",
                stock: 85,
                image:
                  "https://m.media-amazon.com/images/I/61qTUSpKyDL._AC_.jpg",
              },
              {
                name: "Balanço para Calopsita em Madeira",
                slug: "balanco-para-calopsita-em-madeira",
                price: 17.5,
                description:
                  "Balanço confortável e resistente feito em madeira natural.",
                stock: 75,
                image:
                  "https://images.tcdn.com.br/img/img_prod/788540/balanco_para_aves_madeira_20122_1_78a2a97c7e1e5a1cfffbe6713923f117.jpg",
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
                  "https://images.tcdn.com.br/img/img_prod/708512/avitrin_vitamina_15ml_1794_1_20201211100807.jpg",
              },
              {
                name: "Complexo B Vetnil 30ml",
                slug: "complexo-b-vetnil-30ml",
                price: 32.9,
                description:
                  "Complexo vitamínico para fortalecer a saúde e evitar estresse.",
                stock: 40,
                image:
                  "https://static3.tcdn.com.br/img/img_prod/788540/complexo_b_vetnil_30ml_2089_1_f7e66902d9d5a0e2c75e927af6d506a5.jpg",
              },
              {
                name: "Suplemento Oropharma Calci-Lux 150g",
                slug: "suplemento-oropharma-calci-lux-150g",
                price: 79.9,
                description:
                  "Cálcio de alta qualidade para fortalecer ossos e melhorar reprodução.",
                stock: 25,
                image:
                  "https://cdn.awsli.com.br/600x450/1064/1064203/produto/52287375/4cb03d0f2c.jpg",
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
                  "https://images.tcdn.com.br/img/img_prod/262019/cloro_granulado_hth_1kg_262019_1_5f40e3c6cdbb5b06c2e5110b9dd06a06.jpg",
              },
              {
                name: "Algicida Shock 1L",
                slug: "algicida-shock-1l",
                description:
                  "Algicida concentrado para eliminar algas e manter a água cristalina.",
                price: 29.9,
                stock: 40,
                image:
                  "https://images.tcdn.com.br/img/img_prod/402345/algicida_shock_1l_402345_1_0c1f5bf3e4acd9b7c5b7157a2f82f8f1.jpg",
              },
              {
                name: "Clarificante Líquido 1L",
                slug: "clarificante-liquido-1l",
                description:
                  "Clarificante que ajuda a deixar a água transparente e limpa.",
                price: 24.9,
                stock: 45,
                image:
                  "https://images.tcdn.com.br/img/img_prod/315678/clarificante_liquido_1l_315678_1_b2aa9f2b8ee4c7ac4ea1f5ba1c8b4c27.jpg",
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
                  "https://images.tcdn.com.br/img/img_prod/152367/aspirador_manual_piscina_152367_1_9f8c3e2b1d5f4a9c7b6d8a4e3f5cdc3b.jpg",
              },
              {
                name: "Aspirador Elétrico Automático",
                slug: "aspirador-eletrico-automatico",
                description:
                  "Aspirador automático para limpeza completa da piscina sem esforço.",
                price: 499.9,
                stock: 10,
                image:
                  "https://images.tcdn.com.br/img/img_prod/478912/aspirador_eletrico_automatico_478912_1_3c2f1d4a5b7e9c8d6f3a2e1b4d9f8c1e.jpg",
              },
              {
                name: "Aspirador Pó e Areia – Refil 2L",
                slug: "aspirador-po-areia-refil-2l",
                description:
                  "Aspirador eficiente para remoção de pó, areia e resíduos leves.",
                price: 149.9,
                stock: 25,
                image:
                  "https://images.tcdn.com.br/img/img_prod/364789/aspirador_refil_2l_364789_1_6b5c2d3e4f1a9c8b7e2d4f6a8c9b3d5a.jpg",
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
                  "https://images.tcdn.com.br/img/img_prod/289401/bomba_filtro_1_2_hp_289401_1_c7d5e4f3b2a1d8c6e5f4a3b2c1d9f8e7.jpg",
              },
              {
                name: "Filtro de Areia 300mm",
                slug: "filtro-de-areia-300mm",
                description:
                  "Filtro de areia para limpeza eficiente da água da piscina.",
                price: 499.9,
                stock: 8,
                image:
                  "https://images.tcdn.com.br/img/img_prod/315678/filtro_areia_300mm_315678_1_f5e6d7c8b9a0c1d2e3f4b5a6c7d8e9f0.jpg",
              },
              {
                name: "Kit Manutenção Filtros e Bombas",
                slug: "kit-manutencao-filtros-bombas",
                description:
                  "Kit com mangueiras e ferramentas para manutenção de filtros e bombas de piscina.",
                price: 129.9,
                stock: 20,
                image:
                  "https://images.tcdn.com.br/img/img_prod/402345/kit_manutencao_piscina_402345_1_2b4c6d8e9f1a3b5c7d9e0f2a4b6c8d1e.jpg",
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
                  "https://images.tcdn.com.br/img/img_prod/315678/adubo_organico_5kg_315678_1_2a4b6c8d9e1f3a5b7c9d0e2f4a6b8c9d.jpg",
              },
              {
                name: "Fertilizante NPK 10-10-10 1kg",
                slug: "fertilizante-npk-10-10-10-1kg",
                description:
                  "Fertilizante NPK completo para todas as plantas, rico em nutrientes.",
                price: 19.9,
                stock: 60,
                image:
                  "https://images.tcdn.com.br/img/img_prod/402345/fertilizante_npk_1kg_402345_1_3c5e7f9a1b2d4e6f8a0c2d4e6b8f1a2c.jpg",
              },
              {
                name: "Composto Orgânico 10L",
                slug: "composto-organico-10l",
                description:
                  "Composto orgânico para adubação natural de jardins e hortas.",
                price: 39.9,
                stock: 40,
                image:
                  "https://images.tcdn.com.br/img/img_prod/478912/composto_organico_10l_478912_1_1d2c3b4e5f6a7b8c9d0e1f2a3b4c5d6e.jpg",
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
                  "https://images.tcdn.com.br/img/img_prod/152367/pa_jardim_152367_1_6b5c2d3e4f1a9c8b7e2d4f6a8c9b3d5a.jpg",
              },
              {
                name: "Tesoura de Poda",
                slug: "tesoura-de-poda",
                description:
                  "Tesoura de poda para cortes precisos em arbustos e flores.",
                price: 34.9,
                stock: 55,
                image:
                  "https://images.tcdn.com.br/img/img_prod/364789/tesoura_poda_364789_1_7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f.jpg",
              },
              {
                name: "Enxada de Jardim",
                slug: "enxada-de-jardim",
                description:
                  "Enxada resistente para capinar, preparar canteiros e mexer a terra.",
                price: 49.9,
                stock: 35,
                image:
                  "https://images.tcdn.com.br/img/img_prod/289401/enxada_jardim_289401_1_8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b.jpg",
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
                  "https://images.tcdn.com.br/img/img_prod/402345/regador_10l_402345_1_2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d.jpg",
              },
              {
                name: "Mangueira Flexível 15m",
                slug: "mangueira-flexivel-15m",
                description:
                  "Mangueira flexível para irrigação de jardins e hortas, resistente e durável.",
                price: 69.9,
                stock: 40,
                image:
                  "https://images.tcdn.com.br/img/img_prod/315678/mangueira_15m_315678_1_3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f.jpg",
              },
              {
                name: "Kit Regador + Mangueira 5m",
                slug: "kit-regador-mangueira-5m",
                description:
                  "Kit completo com regador e mangueira para irrigação prática de plantas.",
                price: 79.9,
                stock: 30,
                image:
                  "https://images.tcdn.com.br/img/img_prod/478912/kit_regador_mangueira_5m_478912_1_4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e.jpg",
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
