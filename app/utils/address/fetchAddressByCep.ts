//api cep
export interface IAddressData {
  cep: string;
  city: string;
  neighborhood: string;
  service: string;
  state: string;
  street: string;
}

export async function fetchAddressByCep(cep: string) {
  const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);

  if (!response.ok) {
    throw new Error("CEP não encontrado");
  }

  const data: IAddressData = await response.json();

  return {
    street: data.street || "",
    district: data.neighborhood || "",
    city: data.city || "",
    state: data.state || "",
  };
}
