interface ISubCategoriasProps {
  params: {
    categorias: string;
    subcategorias: string;
  };
}

export default async function SubCategorias({ params }: ISubCategoriasProps) {
  const resolveParams = await params;

  return (
    <>
      <div>{resolveParams.categorias}</div>
      <div>{resolveParams.subcategorias}</div>
    </>
  );
}
