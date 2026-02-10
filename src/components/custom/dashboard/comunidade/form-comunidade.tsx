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
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

type ComunidadeFormProps = {
  urlBase: string;
  comunidade?: Comunidade;
  paroquiaId?: number;
  onSubmitSuccess?: () => void;
};

export default function ComunidadeForm({
  urlBase,
  comunidade,
  paroquiaId,
  onSubmitSuccess,
}: ComunidadeFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [ultimaComunidade, setUltimaComunidade] = useState<Comunidade | null>(
    null,
  );
  const [numeroDaComunidade, setNumeroDaComunidade] = useState<number>(
    comunidade?.numeroDaComunidade || 0,
  );

  const formSchema = z.object({
    quantidadeMembros: z
      .number()
      .min(1, { message: "Quantidade inválida." })
      .max(120, { message: "Quantidade inválida maxima de irmãos são 120" }),
    observacao: z.string().max(250).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantidadeMembros: comunidade?.quantidadeMembros || 1,
      observacao: comunidade?.observacao || "",
    },
  });

  useEffect(() => {
    const fetchUltimaComunidade = async () => {
      try {
        const res = await fetch(
          `${urlBase}/api/ambrosio/comunidade?paroquiaId=${paroquiaId}`,
        );
        const data = await res.json();

        if (Array.isArray(data.data) && data.data.length > 0) {
          const ultima = data.data.reduce(
            (max: Comunidade, item: Comunidade) =>
              item.numeroDaComunidade > max.numeroDaComunidade ? item : max,
          );
          const novoNumero = ultima.numeroDaComunidade + 1;
          setNumeroDaComunidade(novoNumero);
        } else {
          setNumeroDaComunidade(1);
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

    const payload = {
      ...values,
      paroquiaId,
      numeroDaComunidade,
    };

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.status === 201 && method === "POST") {
        toast({
          title: `Comunidade ${numeroDaComunidade}`,
          variant: "default",
          description: `Cadastrado(a) com sucesso!`,
        });
        router.push(`/dashboard/comunidades/${data.id}`);
      } else if (res.status === 200 && method === "PATCH") {
        toast({
          title: `Comunidade ${numeroDaComunidade}`,
          variant: "default",
          description: `Editado(a) com sucesso!`,
        });
        // Não redirecionamos na edição, apenas reabilitamos o botão
        setIsLoading(false);
        onSubmitSuccess?.();
      } else {
        if (res.status === 403 || res.status === 401) {
          toast({
            title: `Comunidade ${numeroDaComunidade} não foi cadastrado!`,
            variant: "destructive",
            description: `Você não tem permissão para cadastro`,
          });
        } else if (res.status === 400) {
          toast({
            title: `Comunidade ${numeroDaComunidade} não foi cadastrado!`,
            variant: "destructive",
            description: `Erro: ${data.message}`,
          });
        } else {
          toast({
            title: `Comunidade ${numeroDaComunidade} não foi cadastrado!`,
            variant: "destructive",
            description: `Erro: ${res.text}`,
          });
        }
        setIsLoading(false);
      }
    } catch (error) {
      toast({
        title: `Comunidade ${numeroDaComunidade} não foi cadastrado!`,
        variant: "destructive",
        description: `Erro de conexão. Tente novamente.`,
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto sm:mt-8">
      <div className="text-2xl my-2 flex items-center gap-2">
        {comunidade
          ? "Editando comunidade número:"
          : "Criando comunidade número:"}

        <Badge>{numeroDaComunidade}</Badge>
      </div>

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
                <FormLabel>Quantidade de irmãos</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Quantidade de membros na comunidade ..."
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value) || 0)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="observacao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alguma observação ?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Alguma observação sobre a etapa da comunidade ..."
                    {...field}
                  />
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
