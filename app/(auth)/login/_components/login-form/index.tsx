"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

import { useLoginCartSync } from "@/app/utils/cart/handleLogin";
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

import { loginSchema, TloginSchema } from "./schema";

interface ILoginForm {
  returnTo?: string;
}

export function LoginForm({ returnTo }: ILoginForm) {
  const { handleLoginSyncLocalDb } = useLoginCartSync();
  const [showPassword, setShowPassword] = useState(false);

  //params redirect (evita open redirect)
  const safeReturnTo = returnTo?.startsWith("/") ? returnTo : "/";

  const form = useForm<TloginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData: TloginSchema) {
    await authClient.signIn.email(
      {
        email: formData.email,
        password: formData.password,
        callbackURL: safeReturnTo,
      },
      {
        onRequest: (ctx) => {
          //enquanto esta processando (pode ativar loading, qualquer coisa)
        },
        onSuccess: async (ctx) => {
          //quando acabar
          //sincronizar carrinho localStorage/db
          await handleLoginSyncLocalDb(ctx.data.user.id);
        },
        onError: (ctx) => {
          //caso ocorra algum erro(falhe requsicao, nao conseguiu conectar com db)

          console.log("erro ao logar");
          toast.error("Erro a logar, favor verificar credenciais");
          console.log(ctx.error.code);
        },
      }
    );
  }

  async function handleSignInWithGoogle() {
    await authClient.signIn.social({
      provider: "google",
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 bg-white p-4 rounded-lg w-full md:w-1/2 lg:w-1/3 border border-green-600"
      >
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
                    {/* <span className="sr-only">
                      {showPassword ? "Esconder senha" : "Mostrar senha"}
                    </span> */}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-end -mt-4">
          <Link href="#" className="text-sm text-green-600 font-semibold">
            Esqueci minha senha
          </Link>
        </div>
        <Button
          type="submit"
          className="w-full cursor-pointer bg-[#3a7d44] hover:bg-green-600"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className=" h-4 w-4 animate-spin" />
              Entrando...
            </>
          ) : (
            "Entrar"
          )}
        </Button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>

          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Ou continue com
            </span>
          </div>
        </div>

        <Button
          type="button"
          className="w-full border-2 border-gray-200 text-gray-500 bg-white cursor-pointer hover:bg-gray-100 "
          onClick={handleSignInWithGoogle}
        >
          <FcGoogle style={{ width: "20px", height: "20px" }} />
          Entrar com Google
        </Button>
      </form>
    </Form>
  );
}
