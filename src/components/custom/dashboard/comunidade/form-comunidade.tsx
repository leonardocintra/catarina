import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Comunidade } from "neocatecumenal";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { InfoIcon } from "lucide-react";

type ComunidadeFormProps = {
  urlBase: string;
  comunidade?: Comunidade;
  paroquiaId?: number;
};

export default function ComunidadeForm({
  urlBase,
  comunidade,
  paroquiaId,
}: ComunidadeFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [ultimaComunidade, setUltimaComunidade] = useState<Comunidade | null>(
    null
  );
  const [numeroDaComunidade, setNumeroDaComunidade] = useState<number>(0);

  const formSchema = z.object({
    descricao: z
      .string()
      .min(2, { message: "Descrição deve ter no minimo 2 caracteres." })
      .max(80, { message: "Descrição deve ter no máximo 80 caracteres." }),
    numeroDaComunidade: z.number().min(1, { message: "Número inválido." }),
    quantidadeMembros: z.number().min(1, { message: "Quantidade inválida." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      descricao: comunidade?.descricao || "",
      numeroDaComunidade: comunidade?.numeroDaComunidade || 1,
      quantidadeMembros: comunidade?.quantidadeMembros || 1,
    },
  });

  useEffect(() => {
    const fetchUltimaComunidade = async () => {
      try {
        const res = await fetch(
          `${urlBase}/api/ambrosio/comunidade?paroquiaId=${paroquiaId}`
        );
        const data = await res.json();

        if (Array.isArray(data.data) && data.data.length > 0) {
          const ultima = data.data.reduce((max: Comunidade, item: Comunidade) =>
            item.numeroDaComunidade > max.numeroDaComunidade ? item : max
          );
          const novoNumero = ultima.numeroDaComunidade + 1;
          setNumeroDaComunidade(novoNumero);
          form.setValue("numeroDaComunidade", novoNumero);
        } else {
          setNumeroDaComunidade(1);
          form.setValue("numeroDaComunidade", 1);
        }

        setUltimaComunidade(data.data || null);
      } catch (error) {
        console.error("Erro ao buscar última comunidade:", error);
      }
    };

    if (!comunidade) {
      fetchUltimaComunidade();
    }
  }, [urlBase, paroquiaId, comunidade]);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    let url = `${urlBase}/api/ambrosio/comunidade`;
    let method = "POST";

    if (comunidade) {
      url = `${url}/${comunidade.id}`;
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
        router.push(`/dashboard/comunidades/${data.id}`);
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
            name="quantidadeMembros"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade de Membros</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Quantidade de membros na comunidade ..."
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numeroDaComunidade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número da Comunidade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Número da comunidade ..."
                    value={numeroDaComunidade}
                    disabled={true}
                    readOnly
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="descricao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input placeholder="Descrição da comunidade ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              comunidade ? (
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

          {!comunidade && (
            <div className="flex items-center space-x-2 text-slate-700 text-sm">
              <InfoIcon size={"52"} />
              <p>
                Após o cadastro inicial, você poderá configurar a equipe de
                catequista, responsáveis, etapas, etc
              </p>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
