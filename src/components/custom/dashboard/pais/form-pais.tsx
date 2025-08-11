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
import { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getTodosOsPaises } from "@/lib/api/geolocation";
import { removerAcento } from "@/lib/utils";

type FormPaisProps = {
  urlBase: string;
  pais?: IPais;
};

export default function PaisForm({ urlBase, pais }: FormPaisProps) {
  const { toast } = useToast();
  const router = useRouter();

  const [disabled, setDisabled] = useState(false);
  const [input, setInput] = useState("");
  const [paises, setPaises] = useState<string[]>([]);
  const [paisesFiltrados, setPaisesFiltrados] = useState<string[]>([]);

  useEffect(() => {
    // Esse primeiro useEffect é somente para buscar os paises
    const fetchPaises = async () => {
      const resultado: any = await getTodosOsPaises();
      if (resultado) setPaises(resultado);
    };

    fetchPaises();
  }, []);

  useEffect(() => {
    // Esse segundo useEffect é somente para filtrar os paises
    if (input.length > 1) {
      setPaisesFiltrados(
        paises.filter((pais) =>
          removerAcento(pais.toLowerCase()).includes(
            removerAcento(input.toLowerCase())
          )
        )
      );
    } else {
      setPaisesFiltrados([]);
    }
  }, [input, paises]);

  const formSchema = z.object({
    nome: z
      .string({ message: "O nome do país é obrigatório." })
      .min(2, { message: "O nome deve ter no minimo 2 caracteres." })
      .max(100, { message: "O nome deve ter no máximo 100 caracteres." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async () => {
    setDisabled(true);

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
      body: JSON.stringify({
        nome: input,
      }),
    });

    const data = await res.json();

    if (res.status === 201 && method === "POST") {
      toast({
        title: `${input}`,
        variant: "default",
        description: `Pais cadastrado(a) com sucesso!`,
      });

      router.push(`/dashboard/pais`);
    } else if (res.status === 200 && method === "PATCH") {
      toast({
        title: `${input}`,
        variant: "default",
        description: `Pais editado com sucesso!`,
      });
      router.push(`/dashboard/pais`);
    } else {
      setDisabled(false);

      if (res.status === 400 || res.status === 404) {
        toast({
          title: `${input} não foi cadastrado!`,
          variant: "destructive",
          description: `Erro: ${data.message}`,
        });
      } else {
        toast({
          title: `${input} não foi cadastrado!`,
          variant: "destructive",
          description: `Erro: ${res.text}`,
        });
      }
    }
  };

  return (
    <div className="max-w-md mx-auto sm:mt-8">
      <div>
        <Command>
          <CommandInput
            placeholder="Digite o nome do pais ..."
            value={input}
            onValueChange={setInput}
          />
          <CommandList>
            <CommandEmpty>Nenhum resultado encontrado...</CommandEmpty>
            <CommandGroup heading="Sugestões">
              {paisesFiltrados.map((p, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => {
                    form.setValue("nome", p); // Define o valor do formulário
                    setInput(p); // Atualiza o input de busca
                    setPaisesFiltrados([]);
                  }}
                >
                  {p}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="nome"
            disabled
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do pais ..." {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={disabled} type="submit">
            Salvar
          </Button>
        </form>
      </Form>
    </div>
  );
}
