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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { formatDateInputValue } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowsUpFromLine } from "lucide-react";
import { EtapaEnum } from "neocatecumenal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const etapaOptions = Object.values(EtapaEnum).filter(
  (value): value is EtapaEnum => typeof value === "string",
);

interface PassarComunidadeDeEtapaProps {
  comunidadeId: string;
  etapaAtual: EtapaEnum;
  onSuccess?: () => void;
}

export function PassarComunidadeDeEtapa({
  comunidadeId,
  etapaAtual,
  onSuccess,
}: PassarComunidadeDeEtapaProps) {
  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    etapa: z.nativeEnum(EtapaEnum, {
      error: "Selecione a etapa",
    }),
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
      etapa: etapaAtual,
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
          title: `${values.etapa} cadastrada!`,
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
          <Button variant="destructive" size="sm">
            Nova Etapa <ArrowsUpFromLine className="ml-2" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Passar Comunidade de Etapa</DialogTitle>
            <DialogDescription>
              <div className="font-bold text-red-600">
                Etapa atual: {etapaAtual}
              </div>
              <div>
                Preencha as informações abaixo para confirmar a passagem de
                etapa da comunidade.
              </div>
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-3"
            >
              <FormField
                control={form.control}
                name="etapa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Selecione a nova etapa</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value) =>
                        field.onChange(value as EtapaEnum)
                      }
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a etapa" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {etapaOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option.replace(/_/g, " ")}
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
