interface IProductProps {
  params: {
    categories: string;
    subcategory: string;
    productDetail: string;
  };
}

export default async function Product({ params }: IProductProps) {
  const resolveParams = await params;

  return (
    <section className="w-full flex justify-around">
        <article className="">
      img
        </article>
        <article className="">
          details
        </article>
    </section>
  );
}
