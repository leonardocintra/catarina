import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { formatDateInputValue } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowsUpFromLine } from "lucide-react";
import { EtapaEnum } from "neocatecumenal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface PassarComunidadeDeEtapaProps {
  comunidadeId: string;
  etapaAtual: EtapaEnum;
  onSuccess?: () => void;
}

function getProximaEtapa(etapaAtual: EtapaEnum): EtapaEnum | null {
  const etapas = Object.values(EtapaEnum);
  const indexAtual = etapas.indexOf(etapaAtual);

  if (indexAtual === -1 || indexAtual === etapas.length - 1) {
    return null; // Não encontrou ou já está na última etapa
  }

  return etapas[indexAtual + 1];
}

export function PassarComunidadeDeEtapa({
  comunidadeId,
  etapaAtual,
  onSuccess,
}: PassarComunidadeDeEtapaProps) {
  const proximaEtapa = getProximaEtapa(etapaAtual);
  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    local: z
      .string()
      .min(2, { message: "Descrição deve ter no minimo 2 caracteres." })
      .max(80, { message: "Descrição deve ter no máximo 80 caracteres." })
      .optional(),
    dataInicio: z.date().optional(),
    observacao: z.string().max(250).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dataInicio: undefined,
      local: "",
      observacao: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    let url = `/api/ambrosio/comunidade/etapa`;
    let method = "POST";

    const payload = {
      ...values,
      comunidadeId,
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
          title: `${proximaEtapa} cadastrada!`,
          variant: "default",
          description: `Cadastrado(a) com sucesso a etapa!`,
        });
        setOpen(false);
        onSuccess?.();
      } else {
        if (res.status === 403 || res.status === 401) {
          toast({
            title: `Etapa não foi cadastrado!`,
            variant: "destructive",
            description: `Você não tem permissão para cadastrar etapas`,
          });
        } else if (res.status === 400) {
          toast({
            title: `Etapa não foi cadastrado!`,
            variant: "destructive",
            description: `Erro: ${data.message}`,
          });
        } else {
          toast({
            title: `Etapa não foi cadastrado!`,
            variant: "destructive",
            description: `Erro: ${res.text}`,
          });
        }
      }
    } catch (error) {
      toast({
        title: `Etapa não foi cadastrado!`,
        variant: "destructive",
        description: `Erro de conexão. Tente novamente.`,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="link" size="sm">
            Passar comunidade de etapa <ArrowsUpFromLine />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>
              Nova Etapa: {proximaEtapa ?? "Última etapa alcançada"}
            </DialogTitle>
            <DialogDescription>
              Etapa atual: {etapaAtual}
              <br />
              Preencha as informações abaixo para confirmar a passagem de etapa
              da comunidade.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-3"
            >
              <FormField
                control={form.control}
                name="local"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Local da convivência</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Local que foi feito a convivência ..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dataInicio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data convivência</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="Data da convivência"
                        value={formatDateInputValue(field.value)}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value
                              ? new Date(e.target.value)
                              : undefined,
                          )
                        }
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                        disabled={field.disabled}
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
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </form>
    </Dialog>
  );
}
