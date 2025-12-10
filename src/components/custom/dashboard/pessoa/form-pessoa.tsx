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
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { EscolaridadeEnum, Pessoa, SituacaoReligiosa } from "neocatecumenal";
import { useState } from "react";
import { escolaridadesOptions, estadosCivilOptions } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

type PessoaFormProps = {
  urlBase: string;
  pessoa?: Pessoa;
  situacoesReligiosa: SituacaoReligiosa[];
};

export default function PessoaForm({
  urlBase,
  pessoa,
  situacoesReligiosa,
}: PessoaFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    nome: z
      .string()
      .min(2, { message: "Nome deve ter no minimo 2 caracteres." })
      .max(50, { message: "Nome deve ter no máximo 50 caracteres." }),
    conhecidoPor: z.string().optional(),
    cpf: z
      .string()
      .regex(/^\d{11}$/, { message: "CPF deve conter apenas números." })
      .min(11, { message: "CPF deve ter 11 caracteres." })
      .max(11, { message: "CPF deve ter 11 caracteres." }),
    nacionalidade: z
      .string()
      .max(50, { message: "Nacionalidade deve ter no máximo 50 caracteres." }),
    estadoCivil: z.string({ message: "Campo obrigatório" }).min(1),
    escolaridade: z.string().optional(),
    situacaoReligiosa: z.string({ message: "Campo obrigatório" }).min(1),
    sexo: z.enum(["MASCULINO", "FEMININO"]),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: pessoa?.nome || "",
      conhecidoPor: pessoa?.conhecidoPor || "",
      cpf: pessoa?.cpf || "",
      nacionalidade: pessoa?.nacionalidade || "brasileira",
      sexo: "MASCULINO",
      escolaridade: pessoa?.escolaridade || EscolaridadeEnum.NAO_INFORMADO,
      estadoCivil: pessoa?.estadoCivil || "",
      situacaoReligiosa: pessoa?.situacaoReligiosa.id.toString() || "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    let url = `${urlBase}/api/ambrosio/pessoa`;
    let method = "POST";

    if (pessoa) {
      url = `${url}/${pessoa.id}`;
      method = "PATCH";
    }

    try {
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
          description: `Cadastrado(a) com sucesso!`,
        });
        router.push(`/dashboard/pessoas/${data.id}`);
      } else if (res.status === 200 && method === "PATCH") {
        toast({
          title: `${values.nome}`,
          variant: "default",
          description: `Editado(a) com sucesso!`,
        });
        // Não redirecionamos na edição, apenas reabilitamos o botão
        setIsLoading(false);
      } else {
        if (res.status === 403 || res.status === 401) {
          toast({
            title: `${values.nome} não foi cadastrado!`,
            variant: "destructive",
            description: `Você não tem permissão para cadastro`,
          });
        } else if (res.status === 400) {
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
        setIsLoading(false);
      }
    } catch (error) {
      toast({
        title: `${values.nome} não foi cadastrado!`,
        variant: "destructive",
        description: `Erro de conexão. Tente novamente.`,
      });
      setIsLoading(false);
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
            name="conhecidoPor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Conhecido por</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Apelido ou como é conhecido ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <Input placeholder="CPF ..." {...field} maxLength={11} />
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={pessoa?.sexo}
                >
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
            name="situacaoReligiosa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Situação Religiosa</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={pessoa?.situacaoReligiosa.id.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {situacoesReligiosa.map((situacao) => (
                      <SelectItem
                        key={situacao.id}
                        value={situacao.id.toString()}
                      >
                        {situacao.descricao}
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
            name="estadoCivil"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado Civil</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={pessoa?.estadoCivil}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {estadosCivilOptions.map((es) => (
                      <SelectItem key={es.value} value={es.value}>
                        {es.label}
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={pessoa?.escolaridade || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {escolaridadesOptions.map((es) => (
                      <SelectItem key={es.value} value={es.value}>
                        {es.label}
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

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              pessoa ? (
                <>
                  <Spinner />
                  &quot;Salvando...&quot;
                </>
              ) : (
                <>
                  <Spinner />
                  &quot;Cadastrando...&quot;
                </>
              )
            ) : (
              "Salvar"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
