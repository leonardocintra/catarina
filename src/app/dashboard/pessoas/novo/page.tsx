"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { AmbrosioBaseUrl, BASE_URL } from "@/lib/utils";
import { IEstadoCivil } from "@/interfaces/IEstadoCivil";
import { IEscolaridade } from "@/interfaces/IEscolaridade";
import { ITipoCarisma } from "@/interfaces/ITipoCarisma";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

async function getEstadoCivil() {
  const res = await fetch(`${BASE_URL}/api/ambrosio/configuracoes/estadoCivil`);
  return res.json();
}

async function getEscolaridade() {
  const res = await fetch(
    `${BASE_URL}/api/ambrosio/configuracoes/escolaridade`
  );
  return res.json();
}

async function getTipoCarisma() {
  const res = await fetch(`${BASE_URL}/api/ambrosio/configuracoes/tipoCarisma`);
  return res.json();
}

export default function NovaPessoaPage() {
  const [estadoCivils, setEstadoCivils] = useState<IEstadoCivil[]>();
  const [escolaridades, setEscolaridades] = useState<IEscolaridade[]>();
  const [tipoCarismas, setTipoCarismas] = useState<ITipoCarisma[]>();

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
    estadoCivil: z.number().min(1),
    escolaridade: z.number().min(1),
    tipoCarima: z.number().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      nacionalidade: "brasileira",
    },
  });

  if (!estadoCivils || !escolaridades || !tipoCarismas) {
    return (
      <div>
        <h2>Carregando BASE_URL: {BASE_URL} - process.env = {process.env.BASE_URL}</h2>
        <h2>Carregando AmbroiosURL: {AmbrosioBaseUrl} - process.env = {process.env.AmbrosioBaseUrl}</h2>
      </div>
    );
  }

  // https://youtu.be/oGq9o2BxlaI?t=1076

  const handleSubmit = () => {};

  return (
    <div>
      <div>
        <div className="flex justify-between">
          <h2 className="text-3xl pl-3">Cadastrar pessoas</h2>
          <Link href={"/dashboard/pessoas"}>
            <Button variant={"outline"}>Voltar</Button>
          </Link>
        </div>
        <Separator className="mb-3 mt-2" />
      </div>

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
              name="tipoCarima"
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
    </div>
  );
}
