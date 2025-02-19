"use client";

import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IPais } from "@/interfaces/IPais";

type FormPaisProps = {
  urlBase: string;
  pais?: IPais;
};

export default function PaisForm({ urlBase, pais }: FormPaisProps) {
  const { toast } = useToast();
  const router = useRouter();

  const formSchema = z.object({
    nome: z
      .string()
      .min(2, { message: "O nome deve ter no minimo 2 caracteres." })
      .max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: pais?.nome,
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    let url = `${urlBase}/api/ambrosio/configuracoes/pais`;
    let method = "POST";

    if (pais) {
      url = `${url}/${pais.id}`;
      method = "PATCH";
    }

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();
    if (res.status === 201 && method === "POST") {
      toast({
        title: `${values.nome}`,
        variant: "default",
        description: `Pais cadastrado(a) com sucesso!`,
      });
      router.push(`/dashboard/pais`);
    } else if (res.status === 200 && method === "PATCH") {
      toast({
        title: `${values.nome}`,
        variant: "default",
        description: `Pais editado com sucesso!`,
      });
    } else {
      if (res.status === 400 || res.status === 404) {
        toast({
          title: `${values.nome} não foi cadastrado!`,
          variant: "destructive",
          description: `Erro: ${data.message}`,
        });
      } else {
        toast({
          title: `${values.nome} não foi cadastrado!`,
          variant: "destructive",
          description: `Erro: ${res.text}`,
        });
      }
    }
  };

  return (
    <div className="max-w-md mx-auto sm:mt-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do pais ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Salvar</Button>
        </form>
      </Form>
    </div>
  );
}
