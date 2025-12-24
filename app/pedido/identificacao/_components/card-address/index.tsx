"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { fetchAddressByCep } from "@/app/utils/address/fetchAddressByCep";
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

export const CardAddress = () => {
  const [selectedAddress, setSelectedAdress] = useState<string | null>(null);

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

  function onSubmit(formData: TAddressIdentificationSchema) {}

  //api cep
  async function handleCepBlur(cep: string) {
    try {
      const dataCep: TDataCep = await fetchAddressByCep(cep);

      form.setValue("street", dataCep.street);
      form.setValue("district", dataCep.district);
      form.setValue("city", dataCep.city);
      form.setValue("state", dataCep.state);

      form.setFocus("number");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao consultar o CEP");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold text-lg">Endereços</CardTitle>
      </CardHeader>

      <CardContent>
        <RadioGroup value={selectedAddress} onValueChange={setSelectedAdress}>
          <Label htmlFor="add_new">
            <Card className="w-full">
              <CardContent className="flex items-center gap-3">
                <RadioGroupItem value="add_new" id="add_new" />
                <span>Adicionar novo endereço</span>
              </CardContent>
            </Card>
          </Label>
        </RadioGroup>

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
                            disabled={form.formState.isSubmitting}
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
                              disabled={form.formState.isSubmitting}
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
                              disabled={form.formState.isSubmitting}
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
                              disabled={form.formState.isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button className="bg-green-600 hover:bg-green-600 mt-6 text-white rounded-lg transition-all duration-200 hover:opacity-85 cursor-pointer w-full flex gap-2 p-2 justify-center">
                  Continuar pagamento
                </Button>
              </form>
            </Form>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
