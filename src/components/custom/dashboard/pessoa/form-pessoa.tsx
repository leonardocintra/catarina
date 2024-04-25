"use client";

import * as z from "zod";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { IEstadoCivil } from "@/interfaces/IEstadoCivil";
import { IEscolaridade } from "@/interfaces/IEscolaridade";
import { ITipoCarisma } from "@/interfaces/ITipoCarisma";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { IPessoa } from "@/interfaces/IPessoa";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type PessoaFormProps = {
  urlBase: string;
  pessoa?: IPessoa;
};

export default function PessoaForm({ urlBase }: PessoaFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const [estadoCivils, setEstadoCivils] = useState<IEstadoCivil[]>();
  const [escolaridades, setEscolaridades] = useState<IEscolaridade[]>();
  const [tipoCarismas, setTipoCarismas] = useState<ITipoCarisma[]>();

  async function getEstadoCivil() {
    const res = await fetch(
      `${urlBase}/api/ambrosio/configuracoes/estadoCivil`
    );
    return res.json();
  }

  async function getEscolaridade() {
    const res = await fetch(
      `${urlBase}/api/ambrosio/configuracoes/escolaridade`
    );
    return res.json();
  }

  async function getTipoCarisma() {
    const res = await fetch(
      `${urlBase}/api/ambrosio/configuracoes/tipoCarisma`
    );
    return res.json();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resEstadoCivil, resEscolaridade, resTipoCarisma] =
          await Promise.all([
            getEstadoCivil(),
            getEscolaridade(),
            getTipoCarisma(),
          ]);

        setEstadoCivils(resEstadoCivil.data);
        setEscolaridades(resEscolaridade.data);
        setTipoCarismas(resTipoCarisma.data);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const formSchema = z.object({
    nome: z
      .string()
      .min(2, { message: "Nome deve ter no minimo 2 caracteres." })
      .max(50),
    nacionalidade: z.string().max(50),
    estadoCivil: z.string({ message: "Campo obrigatório" }).min(1),
    escolaridade: z.string({ message: "Campo obrigatório" }).min(1),
    tipoCarisma: z.string({ message: "Campo obrigatório" }).min(1),
    sexo: z.enum(["MASCULINO", "FEMININO"]),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      nacionalidade: "brasileira",
      sexo: "MASCULINO",
    },
  });

  if (!estadoCivils || !escolaridades || !tipoCarismas) {
    return (
      <div>
        <h2>Carregando ...</h2>
      </div>
    );
  }

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log({ values });

    const res = await fetch(`${urlBase}/api/ambrosio/pessoa`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (res.status === 201) {
      toast({
        title: `${values.nome}`,
        variant: "default",
        description: `Cadastrado(a) com sucesso!`,
      });
      router.push("/dashboard/pessoas");
    } else {
      toast({
        title: `${values.nome} não foi cadastrado!`,
        variant: "destructive",
        description: `Erro: ${res.text}`,
      });
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
                  <Input placeholder="Nome completo ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sexo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sexo</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={"MASCULINO"}>Masculino</SelectItem>
                    <SelectItem value={"FEMININO"}>Feminino</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="estadoCivil"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado Civil</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {estadoCivils.map((es) => (
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

          <FormField
            control={form.control}
            name="escolaridade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Escolaridade</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {escolaridades.map((es) => (
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

          <FormField
            control={form.control}
            name="tipoCarisma"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Carisma</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {tipoCarismas.map((es) => (
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

          <FormField
            control={form.control}
            name="nacionalidade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nacionalidade</FormLabel>
                <FormControl>
                  <Input placeholder="Nacionalidade ..." {...field} />
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
