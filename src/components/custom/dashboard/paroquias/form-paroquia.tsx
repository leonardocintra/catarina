import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { Separator } from "@/components/ui/separator";
import { Paroquia } from "neocatecumenal";
import { addressSchema } from "@/schemas/addressSchema";
import { useCepHandler } from "@/hooks/useCepHandler";
import { IMaskInput } from "react-imask";

type FormParoquiaProps = {
  urlBase: string;
  dioceseId: number;
  dioceseNome: string;
  paroquia?: Paroquia;
};

export default function ParoquiaForm({
  urlBase,
  paroquia,
  dioceseId,
  dioceseNome,
}: FormParoquiaProps) {
  const { toast } = useToast();
  const router = useRouter();

  const [bairroDisabled, setBairroDisabled] = useState(true);
  const [cidadeDisabled, setCidadeDisabled] = useState(true);
  const [logradouroDisabled, setLogradouroDisabled] = useState(true);

  const formSchema = z
    .object({
      descricao: z
        .string({ message: "Nome da diocese é obrigatório" })
        .min(2, { message: "Nome da diocese deve ter no minimo 2 caracteres." })
        .max(50, { message: "Tamanho máximo é 50 caracteres." }),
      enderecoId: z.string().optional(),
      dioceseId: z.number(),
      diocese: z.string(),
    })
    .merge(addressSchema);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      descricao: paroquia?.descricao || "",
      enderecoId: paroquia?.endereco.id.toString() || "",
      diocese: dioceseNome,
      dioceseId,
      cep: paroquia?.endereco.cep || "",
      bairro: paroquia?.endereco.bairro || "",
      cidade: paroquia?.endereco.cidade.nome || "",
      numero: paroquia?.endereco.numero || "",
      logradouro: paroquia?.endereco.logradouro || "",
      uf: paroquia?.endereco.cidade.estado.sigla || "",
    },
  });

  const handleCep = useCepHandler({
    form,
    setBairroDisabled,
    setLogradouroDisabled,
    setCidadeDisabled,
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    let url = `${urlBase}/api/ambrosio/paroquia`;
    let method = "POST";

    if (paroquia) {
      url = `${url}/${paroquia.id}`;
      method = "PATCH";
    }

    console.log(values);

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
        title: `Paróquia ${values.descricao}`,
        variant: "default",
        description: `Cadastrado(a) com sucesso!`,
      });
      router.push(`/dashboard/paroquias/`);
    } else if (res.status === 200 && method === "PATCH") {
      toast({
        title: `${values.descricao}`,
        variant: "default",
        description: `Editada com sucesso!`,
      });
    } else {
      let acao = "cadastrado";
      if (method === "PATCH") {
        acao = "editado";
      }

      if (res.status === 400 || res.status === 404) {
        toast({
          title: `${values.descricao} não foi ${acao}!`,
          variant: "destructive",
          description: `Erro: ${data.message}`,
        });
      } else if (res.status === 401 || res.status === 403) {
        toast({
          title: `Sem permissão - ${res.status}`,
          variant: "default",
          description: `Você não tem permissão para ${
            method === "POST" ? "cadastrar" : "editar"
          } paróquia`,
        });
      } else {
        toast({
          title: `${values.descricao} não foi ${acao}!`,
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
                  <Input placeholder="Nome da paróquia ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="diocese"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diocese</FormLabel>
                <FormControl>
                  <Input disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />
          <h2>Endereço</h2>

          <FormField
            control={form.control}
            name="cep"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CEP</FormLabel>
                <FormControl>
                  <IMaskInput
                    mask="00000-000"
                    placeholder="CEP da paroquia ..."
                    value={field.value}
                    onAccept={(value, mask) => {
                      const numericCep = value.replace(/\D/g, ""); // remove hífen e tudo que não for número
                      field.onChange(numericCep); // salva o valor limpo no react-hook-form
                      if (numericCep.length === 8) {
                        handleCep(numericCep);
                      }
                    }}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="logradouro"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logradouro</FormLabel>
                <FormControl>
                  <Input
                    disabled={logradouroDisabled}
                    placeholder="Logradouro ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numero"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numero</FormLabel>
                <FormControl>
                  <Input placeholder="Numero ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bairro"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bairro</FormLabel>
                <FormControl>
                  <Input
                    disabled={bairroDisabled}
                    placeholder="Bairro ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cidade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                  <Input
                    disabled={cidadeDisabled}
                    placeholder="Cidade ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="uf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Input
                    disabled={cidadeDisabled}
                    placeholder="Estado ..."
                    {...field}
                  />
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
