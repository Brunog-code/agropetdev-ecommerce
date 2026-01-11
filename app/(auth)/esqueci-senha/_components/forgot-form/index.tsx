"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

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

import { forgotPassword } from "../../actions/forgot-password";
import { forgotFormSchema, TForgotForm } from "./schema";

export const ForgotForm = () => {
  const form = useForm<TForgotForm>({
    resolver: zodResolver(forgotFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(FormData: TForgotForm) {
    if (!FormData) return;

    try {
      //chama action
      const response = await forgotPassword(FormData.email);
    } catch (error) {
      console.error(error);
    }
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

        <Button
          type="submit"
          className="w-full cursor-pointer bg-[#3a7d44] hover:bg-green-600"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className=" h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar email de recuperação"
          )}
        </Button>
      </form>
    </Form>
  );
};
