"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

import { saveAddress } from "../../actions/save-address";

interface IAddressData {
  cep: string;
  city: string;
  neighborhood: string;
  service: string;
  state: string;
  street: string;
}

//schema zod
const registerSchema = z
  .object({
    email: z
      .string()
      .nonempty({ message: "Favor preencher o email" })
      .email({ message: "Email inválido" }),
    name: z.string().nonempty({ message: "Favor preencher o nome" }),
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
    password: z
      .string()
      .nonempty({ message: "Favor preencher a senha" })
      .min(6, { message: "A senha deve ter pelo menos 8 caracteres" }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Favor confirmar a senha" })
      .min(6, {
        message: "A confirmação da senha deve ter pelo menos 6 caracteres",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

//type zod
type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  //RHF
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      street: "",
      number: "",
      district: "",
      city: "",
      state: "",
      zip: "",
      password: "",
      confirmPassword: "",
    },
  });

  //api cep
  async function handleCepBlur(cep: string) {
    try {
      const response = await fetch(
        `https://brasilapi.com.br/api/cep/v1/${cep}`
      );

      if (!response.ok) {
        toast.error("CEP não encontrado");
        return;
      }

      const data: IAddressData = await response.json();

      // Atualiza os campos do RHF
      form.setValue("street", data.street || "");
      form.setValue("district", data.neighborhood || "");
      form.setValue("city", data.city || "");
      form.setValue("state", data.state || "");

      form.setFocus("number");
    } catch (error) {
      console.error("Erro na requisição:", error);
      toast.error("Erro ao consultar o CEP");
    }
  }

  //cadastrar
  async function onSubmit(formData: RegisterFormValues) {
    await authClient.signUp.email(
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        callbackURL: "/",
      },

      {
        onRequest: (ctx) => {
          //enquanto esta processando (pode ativar loading, qualquer coisa)
        },

        onSuccess: async (ctx) => {
          //quando acabar
          const dataAddAddress = {
            id: ctx.data.user.id,
            street: formData.street,
            number: formData.number,
            district: formData.district,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
          };

          //cadastrar endereço
          let addressSaved = false;
          try {
            const responseAddress = await saveAddress(dataAddAddress);

            if (responseAddress.success) addressSaved = true;
          } catch (error) {
            console.error("Erro ao salvar endereço:", error);
          }

          //encerra a sessão criada automaticamente
          await authClient.signOut();

          router.replace("/login");

          //se der erro avisar o usuario
          if (addressSaved) {
            toast.success("Cadastro realizado");
          } else {
            toast(
              "Cadastro realizado, mas não foi possível salvar o endereço.",
              {
                icon: "⚠️",
              }
            );
          }
        },
        onError: (ctx) => {
          //caso ocorra algum erro(falhe requsicao, nao conseguiu conectar com db)
          if (ctx.error.code == "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
            toast.error("Email ja cadastrado");
          }
          console.log("erro ao criar conta");
          console.log(ctx);
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 bg-white p-6 rounded-xl w-full md:w-1/2 border border-green-600 shadow-lg"
      >
        {/* EMAIL */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="seu@email.com"
                  type="email"
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* NOME */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  placeholder="Seu nome"
                  type="text"
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* SEÇÃO ENDEREÇO */}
        <div className="p-2 border border-gray-200 rounded-lg bg-gray-50">
          <h2 className="text-lg font-bold text-gray-700 mb-4">
            Informações de Endereço
          </h2>

          <FormField
            control={form.control}
            name="zip"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CEP</FormLabel>
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
                <FormLabel className="mt-2">Rua</FormLabel>
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

        {/* SENHAS */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    {...field}
                    disabled={form.formState.isSubmitting}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={form.formState.isSubmitting}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Esconder senha" : "Mostrar senha"}
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirme a senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    {...field}
                    disabled={form.formState.isSubmitting}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={form.formState.isSubmitting}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Esconder senha" : "Mostrar senha"}
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* BOTÃO */}
        <Button
          type="submit"
          className="w-full cursor-pointer bg-[#3a7d44] hover:bg-green-600"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Cadastrando...
            </>
          ) : (
            "Cadastrar"
          )}
        </Button>
      </form>
    </Form>
  );
}
