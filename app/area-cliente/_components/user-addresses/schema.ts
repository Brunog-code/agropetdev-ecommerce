import { z } from "zod";

export const AddressIdentificationSchema = z.object({
  street: z.string().nonempty({ message: "Favor preencher a rua" }),
  number: z.string().nonempty({ message: "Favor preencher o número" }),
  district: z.string().nonempty({ message: "Favor preencher o bairro" }),
  city: z.string().nonempty({ message: "Favor preencher a cidade" }),
  state: z
    .string()
    .nonempty({ message: "Favor selecionar o estado" })
    .length(2, { message: "O estado deve ter 2 caracteres (sigla)" }),
  zip: z
    .string()
    .nonempty({ message: "Favor preencher o CEP" })
    .regex(/^\d{5}-?\d{3}$/, { message: "Formato de CEP inválido" }),
});

export type TAddressIdentificationSchema = z.infer<
  typeof AddressIdentificationSchema
>;
