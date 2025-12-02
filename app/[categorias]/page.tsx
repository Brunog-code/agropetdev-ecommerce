interface ICategoriasProps {
  params: {
    categorias: string;
  };
}

export default async function Categories({ params }: ICategoriasProps) {
  const resolveParams = await params;

  return <div>{resolveParams.categorias}</div>;
}
