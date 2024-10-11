"use client";

import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { IDiocese } from "@/interfaces/IDiocese";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ITipoDiocese } from "@/interfaces/ITipoDiocese";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormDioceseProps = {
  urlBase: string;
  diocese?: IDiocese;
};

export default function DioceseForm({ urlBase, diocese }: FormDioceseProps) {
  const { toast } = useToast();
  const router = useRouter();

  const [tipoDiocese, setTipoDiocese] = useState<ITipoDiocese[]>();

  useEffect(() => {
    const fetchData = async () => {
      async function getTipoDiocese() {
        const res = await fetch(
          `${urlBase}/api/ambrosio/configuracoes/tipoDiocese`
        );
        return res.json();
      }

      try {
        const [dataDiocese] = await Promise.all([getTipoDiocese()]);

        setTipoDiocese(dataDiocese.data);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchData();
  }, [urlBase]);

  const formSchema = z.object({
    descricao: z
      .string()
      .min(2, { message: "Descrição deve ter no minimo 2 caracteres." })
      .max(50),
    tipoDiocese: z.string({ message: "Campo obrigatório" }).min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      descricao: diocese?.descricao || "",
      tipoDiocese: diocese?.tipoDiocese.id.toString() || "",
    },
  });

  if (!tipoDiocese) {
    return (
      <div>
        <h2>Carregando ...</h2>
      </div>
    );
  }

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    let url = `${urlBase}/api/ambrosio/configuracoes/diocese`;
    let method = "POST";

    if (diocese) {
      url = `${url}/${diocese.id}`;
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
        title: `${values.descricao}`,
        variant: "default",
        description: `Cadastrado(a) com sucesso!`,
      });
      router.push(`/dashboard/dioceses/`);
    } else if (res.status === 200 && method === "PATCH") {
      toast({
        title: `${values.descricao}`,
        variant: "default",
        description: `Editada com sucesso!`,
      });
    } else {
      if (res.status === 400) {
        toast({
          title: `${values.descricao} não foi cadastrado!`,
          variant: "destructive",
          description: `Erro: ${data.message}`,
        });
      } else {
        toast({
          title: `${values.descricao} não foi cadastrado!`,
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
            name="descricao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input placeholder="Descrição ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tipoDiocese"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={diocese?.tipoDiocese.id.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {tipoDiocese.map((es) => (
                      <SelectItem key={es.id} value={es.id.toString()}>
                        {es.descricao}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
