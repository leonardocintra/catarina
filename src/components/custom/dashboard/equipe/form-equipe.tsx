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
import { Equipe, TipoEquipe } from "neocatecumenal";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

type EquipeFormProps = {
  urlBase: string;
  equipe?: Equipe;
  tiposDeEquipe: TipoEquipe[];
};

export default function EquipeForm({
  urlBase,
  equipe,
  tiposDeEquipe,
}: EquipeFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    descricao: z
      .string()
      .min(2, { message: "Descrição deve ter no minimo 2 caracteres." })
      .max(80, { message: "Descrição deve ter no máximo 80 caracteres." }),
    tipoEquipe: z.string().min(1, { message: "Tipo de equipe é obrigatório." }),
    observacao: z
      .string()
      .max(255, { message: "Observação deve ter no máximo 255 caracteres." })
      .optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      descricao: equipe?.descricao || "",
      tipoEquipe: equipe?.tipoEquipe.id.toString() || "",
      observacao: equipe?.observacao || "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    let url = `${urlBase}/api/ambrosio/equipe`;
    let method = "POST";

    if (equipe) {
      url = `${url}/${equipe.id}`;
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
          title: `${values.descricao}`,
          variant: "default",
          description: `Cadastrado(a) com sucesso!`,
        });
        router.push(`/dashboard/pessoas/${data.id}`);
      } else if (res.status === 200 && method === "PATCH") {
        toast({
          title: `${values.descricao}`,
          variant: "default",
          description: `Editado(a) com sucesso!`,
        });
        // Não redirecionamos na edição, apenas reabilitamos o botão
        setIsLoading(false);
      } else {
        if (res.status === 403 || res.status === 401) {
          toast({
            title: `${values.descricao} não foi cadastrado!`,
            variant: "destructive",
            description: `Você não tem permissão para cadastro`,
          });
        } else if (res.status === 400) {
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
        setIsLoading(false);
      }
    } catch (error) {
      toast({
        title: `${values.descricao} não foi cadastrado!`,
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
            name="tipoEquipe"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Equipe</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={equipe?.tipoEquipe.id.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {tiposDeEquipe.map((tipoEquipe) => (
                      <SelectItem
                        key={tipoEquipe.descricao}
                        value={tipoEquipe.id.toString()}
                      >
                        {tipoEquipe.descricao}
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
            name="observacao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observação</FormLabel>
                <FormControl>
                  <Input placeholder="Observação ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              equipe ? (
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
