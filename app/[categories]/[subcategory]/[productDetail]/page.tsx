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
    <>
      <div>{resolveParams.categories}</div>
      <div>{resolveParams.subcategory}</div>
      <div>{resolveParams.productDetail}</div>
    </>
  );
}
