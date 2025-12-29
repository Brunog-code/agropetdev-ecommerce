"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { saveAddress } from "@/app/(auth)/cadastro/actions/save-address";
import { useAuth } from "@/app/contexts/AuthCont";
import { SelectedShipping } from "@/app/pedido/_components/selected-shipping";
import { useCartStore } from "@/app/store/cartStore";
import { fetchAddressByCep } from "@/app/utils/address/fetchAddressByCep";
import { INewAddress } from "@/app/utils/types/new-address";
import { TDataCep } from "@/app/utils/types/zip-address";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  AddressIdentificationSchema,
  TAddressIdentificationSchema,
} from "./schema";

interface ICardAddressProps {
  userAddresses: INewAddress[];
}

interface InewAddressData {
  newAddress: INewAddress;
  success: boolean;
}

export const CardAddress = ({ userAddresses }: ICardAddressProps) => {
  //states
  const [selectedAddress, setSelectedAdress] = useState<string | null>(() => {
    return userAddresses.length > 0 ? userAddresses[0].id : null;
  });
  const [selectedZip, setSelectedZip] = useState<string | null>(() => {
    return userAddresses.length > 0 ? userAddresses[0].zip : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  //zustand
  const setAddressCart = useCartStore((state) => state.addAddressCart);

  //seta o endereço selecionado se estiver endereço no primeito rendersetAddressCart
  useEffect(() => {
    if (selectedAddress) {
      setAddressCart(selectedAddress);
    }
  }, [selectedAddress, setAddressCart]);

  //router
  const router = useRouter();

  //context
  const { user } = useAuth();

  //RHF
  const form = useForm<TAddressIdentificationSchema>({
    resolver: zodResolver(AddressIdentificationSchema),
    defaultValues: {
      street: "",
      number: "",
      district: "",
      city: "",
      state: "",
      zip: "",
    },
  });

  async function onSubmit(formData: TAddressIdentificationSchema) {
    const saveAddressData = {
      id: user!.id,
      street: formData.street,
      number: formData.number,
      district: formData.district,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
    };

    //chamar server action para salvar endereço
    try {
      const address: InewAddressData = await saveAddress(saveAddressData);

      form.reset();
      router.refresh();

      if (address) {
        setSelectedAdress(address.newAddress.id);
        setSelectedZip(address.newAddress.zip);
      }

      toast.success("Endereço adicionado");
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro inesperado ao salvar endereço");
      }
    }
  }

  //api cep
  async function handleCepBlur(cep: string) {
    setIsLoading(true);
    try {
      if (cep.length < 8) return;

      const dataCep: TDataCep = await fetchAddressByCep(cep);

      form.setValue("street", dataCep.street);
      form.setValue("district", dataCep.district);
      form.setValue("city", dataCep.city);
      form.setValue("state", dataCep.state);

      form.setFocus("number");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao consultar o CEP");
    } finally {
      setIsLoading(false);
    }
  }

  //setar o id, e zip selecionado
  function handleChangeSelect(addressId: string) {
    //setar o endereço
    setSelectedAdress(addressId);

    //procurar atraves do id, o zip desse endereço
    const address = userAddresses.find((item) => item.id === addressId);

    if (address) {
      setSelectedZip(address.zip);
    }

    //seta o endereço selecionado no zustand
    setAddressCart(addressId);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold text-lg border-b">
          Meus Endereços
        </CardTitle>
      </CardHeader>

      <CardContent>
        {selectedAddress !== "add_new" && userAddresses.length !== 0 && (
          <div className="mb-4">
            <small>Selecione o método de envio</small>
            <SelectedShipping cep={selectedZip!} />
          </div>
        )}

        <small>Selecione ao menos um endereço para entrega</small>
        <RadioGroup value={selectedAddress} onValueChange={handleChangeSelect}>
          {/* endereços cadastrados */}
          {userAddresses.length > 0 &&
            userAddresses.map((item) => (
              <Label htmlFor={`address-${item.id}`} key={item.id}>
                <Card className="w-full">
                  <CardContent className="flex items-center gap-3">
                    <RadioGroupItem value={item.id} id={`address-${item.id}`} />
                    <span>
                      {item.street}, {item.number} - {item.district} -{" "}
                      {item.zip} - {item.city}/{item.state}
                    </span>
                  </CardContent>
                </Card>
              </Label>
            ))}

          {/* novo endereço */}
          <Label htmlFor="add_new">
            <Card className="w-full">
              <CardContent className="flex items-center gap-3">
                <RadioGroupItem value="add_new" id="add_new" />
                <span>Adicionar novo endereço</span>
              </CardContent>
            </Card>
          </Label>
        </RadioGroup>

        {/* form cadastro novo */}
        {selectedAddress === "add_new" && (
          <div className=" border-t-2 mt-6">
            <h2 className=" font-semibold text-gray-700 mt-6">
              Informações de Endereço
            </h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className=" mt-6">
                <div className=" flex flex-col space-y-4 ">
                  <FormField
                    control={form.control}
                    name="zip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">CEP</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="00000-000"
                            type="text"
                            maxLength={8}
                            {...field}
                            disabled={form.formState.isSubmitting}
                            onBlur={(e) => {
                              field.onBlur(); //mantém a integração com RHF
                              handleCepBlur(e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Rua</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Rua"
                            type="text"
                            {...field}
                            disabled={isLoading || form.formState.isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4 mt-2">
                    <FormField
                      control={form.control}
                      name="number"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Número</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Número"
                              type="text"
                              {...field}
                              disabled={form.formState.isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="district"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Bairro</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Bairro"
                              type="text"
                              {...field}
                              disabled={
                                isLoading || form.formState.isSubmitting
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="mt-2">Cidade</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Cidade"
                              type="text"
                              {...field}
                              disabled={
                                isLoading || form.formState.isSubmitting
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="mt-2">Estado</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="SP"
                              type="text"
                              maxLength={2}
                              {...field}
                              disabled={
                                isLoading || form.formState.isSubmitting
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-600 mt-6 text-white rounded-lg transition-all duration-200 hover:opacity-85 cursor-pointer w-full flex gap-2 p-2 justify-center"
                >
                  Cadastrar novo endereço
                </Button>
              </form>
            </Form>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
