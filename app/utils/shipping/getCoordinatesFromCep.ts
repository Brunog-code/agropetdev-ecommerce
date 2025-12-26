//pega as coordenadas geo
type TCoordinates = {
  lat: number;
  lng: number;
};

interface IResponseData {
  cep: string;
  address_type: string;
  address_name: string;
  address: string;
  state: string;
  district: string;
  lat: string;
  lng: string;
  city: string;
  city_ibge: string;
  ddd: string;
}

export async function getCoordinatesFromCep(
  cep: string
): Promise<TCoordinates> {
  //remove tudo que não é digito
  const formattedCep = cep.replace(/\D/g, "");

  const response = await fetch(
    `https://cep.awesomeapi.com.br/json/${formattedCep}`,
    {
      headers: {
        "User-Agent": "ecommerce-nextjs",
      },
    }
  );

  const data: IResponseData = await response.json();

  if (!data) {
    throw new Error("CEP não encontrado");
  }

  return {
    lat: Number(data.lat),
    lng: Number(data.lng),
  };
}
