"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Trash2 } from "lucide-react";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { saveAddress } from "@/app/(auth)/cadastro/actions/save-address";
import { Spinner } from "@/app/(home)/_components/spinner";
import { useAuth } from "@/app/contexts/AuthCont";
import { getAddressUser } from "@/app/pedido/identificacao/actions/get-address-user";
import { fetchAddressByCep } from "@/app/utils/address/fetchAddressByCep";
import { INewAddress } from "@/app/utils/types/new-address";
import { TDataCep } from "@/app/utils/types/zip-address";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { deleteUserAddress } from "../../actions/delete-user-address";
import {
  AddressIdentificationSchema,
  TAddressIdentificationSchema,
} from "./schema";

interface IAddressesUserResponse {
  city: string;
  district: string;
  id: string;
  number: string;
  state: string;
  street: string;
  userId: string;
  zip: string;
}

interface InewAddressData {
  newAddress: INewAddress;
  success: boolean;
}

export const UserAddresses = () => {
  const { user } = useAuth();

  //states
  const [loading, setLoading] = useState(false);
  const [loadingNewForm, setLoadingNewForm] = useState(false);
  const [addresses, setAddresses] = useState<IAddressesUserResponse[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

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

  useEffect(() => {
    async function fetchAddresses() {
      setLoading(true);
      try {
        const addressesUser: IAddressesUserResponse[] = await getAddressUser(
          user!.id
        );
        setAddresses(addressesUser);
      } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
          //error é do tipo Error, então pode acessar error.message
          toast.error(error.message);
        } else {
          //caso não seja Error, pode mostrar uma mensagem genérica
          toast.error("Ocorreu um erro desconhecido");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchAddresses();
  }, [user]);

  async function handleDeleteAddress(addressId: string) {
    if (!addressId) return;
    try {
      const dataDeleteAddress = {
        userId: user!.id,
        addressId,
      };
      const response = await deleteUserAddress(dataDeleteAddress);
      if (!response.success) {
        toast.error(response.message);
        return;
      }

      //deleta do state se deu certo o banco
      setAddresses((prev) => prev.filter((item) => item.id != addressId));
      toast.success(response.message);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCepBlur(cep: string) {
    setLoadingNewForm(true);
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
      setLoadingNewForm(false);
    }
  }

  async function onSubmit(formData: TAddressIdentificationSchema) {
    setLoadingNewForm(true);
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
      const response: InewAddressData = await saveAddress(saveAddressData);

      setAddresses((prev) => [...prev, response.newAddress]);

      form.reset();

      toast.success("Endereço adicionado");
      setOpenDialog(false);
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro inesperado ao salvar endereço");
      }
    } finally {
      setLoadingNewForm(false);
    }
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-2 relative">
      {/* listagem de endereços */}
      {addresses.length > 0 ? (
        addresses.map((address) => (
          <Card key={address.id}>
            <CardContent className="flex justify-between">
              <span>
                {address.street}, {address.number} - {address.district} -{" "}
                {address.zip} - {address.city}/{address.state}
              </span>
              <Trash2
                size={18}
                className="text-red-500 cursor-pointer hover:text-red-700"
                onClick={() => handleDeleteAddress(address.id)}
              />
            </CardContent>
          </Card>
        ))
      ) : (
        <h1>Nenhum endereço cadastrado</h1>
      )}
      <Button
        className="absolute -top-15 -right-3 text-xs cursor-pointer flex items-center gap-1 bg-green-600 hover:opacity-85 hover:bg-green-600"
        aria-label="Cadastrar endereço"
        onClick={() => setOpenDialog(true)}
      >
        <PlusIcon className="w-3 h-3" />
      </Button>

      {/* cadastrar novo */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <div className="text-center">
                <span>Cadastrar novo endereço</span>
              </div>
            </DialogTitle>
            <DialogDescription asChild>
              <div className=" border-t-2 mt-6">
                <h2 className=" font-semibold text-gray-700 mt-6">
                  Informações de Endereço
                </h2>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className=" mt-6"
                  >
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
                                disabled={
                                  loadingNewForm || form.formState.isSubmitting
                                }
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
                                    loadingNewForm ||
                                    form.formState.isSubmitting
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
                                    loadingNewForm ||
                                    form.formState.isSubmitting
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
                                    loadingNewForm ||
                                    form.formState.isSubmitting
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
                      {loadingNewForm ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Cadastrando...
                        </>
                      ) : (
                        "Cadastrar novo endereço"
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
