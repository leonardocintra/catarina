"use client";

import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import { use, useCallback, useEffect, useState } from "react";
import { SkeletonLoading } from "@/components/custom/ui/SkeletonLoading";
import { BASE_URL } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Comunidade, EtapaEnum } from "neocatecumenal";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { PassarComunidadeDeEtapa } from "@/components/custom/dashboard/comunidade/dialog-passar-etapa";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";

export default function EditarComunidadePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [comunidade, setComunidade] = useState<Comunidade>();
  const { id } = use(params);
  const { toast } = useToast();
  const routeRedirect = "/dashboard/comunidades";
  const formatDate = (date?: Date) =>
    date
      ? new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(date)
      : " - ";

  const fetchComunidade = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/ambrosio/comunidade/${id}`);

      if (res.status === 404) {
        toast({
          title: `Comunidade não encontrada`,
          variant: "destructive",
          description: `Comunidade não encontrada. Tente novamente`,
        });
        router.push(routeRedirect);
        return;
      }

      if (res.status === 401) {
        toast({
          title: `Sem permissão`,
          variant: "destructive",
          description: `Você não tem permissão para ver essa comunidade`,
        });
        router.push(routeRedirect);
        return;
      }

      const data = await res.json();
      const comunidadeNormalizada: Comunidade = {
        ...data,
        comunidadeEtapas: data.comunidadeEtapas?.map((ce: any) => ({
          ...ce,
          dataInicio: ce?.dataInicio ? new Date(ce.dataInicio) : undefined,
          dataFim: ce?.dataFim ? new Date(ce.dataFim) : undefined,
        })),
      };
      setComunidade(comunidadeNormalizada);
    } catch (error: any) {
      toast({
        title: `Erro ao buscar comunidade`,
        variant: "destructive",
        description: `Erro: ${error}`,
      });
    }
  }, [id, toast, router, routeRedirect]);

  useEffect(() => {
    fetchComunidade();
  }, [fetchComunidade]);

  if (!comunidade)
    return <SkeletonLoading mensagem="Carregando comunidade ..." />;

  return (
    <div>
      <PageSubtitle
        title={`Comunidade ${comunidade.numeroDaComunidade}`}
        subTitle={`da paróquia ${comunidade.paroquia.descricao} - Qtd: ${comunidade.quantidadeMembros} irmãos`}
        buttons={[
          {
            buttonText: "Voltar",
            buttonUrl: "/dashboard/comunidades",
            buttonShow: true,
            buttonVariant: "outline",
          },
        ]}
      />

      <div className="grid gap-2 sm:grid-cols-2 items-start">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Etapas / Catequistas</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>
                  Historico das estapas da comunidade.
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="">Etapa</TableHead>
                    <TableHead className="text-right">Inicio / Fim</TableHead>
                    <TableHead>Catequistas</TableHead>
                    <TableHead className="text-right">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comunidade.comunidadeEtapas.map((ce) => (
                    <TableRow key={ce.id}>
                      <TableCell className="font-medium">{ce.etapa}</TableCell>
                      <TableCell className="text-right">
                        {formatDate(ce.dataInicio)} / {formatDate(ce.dataFim)}
                      </TableCell>
                      <TableCell>Não informado</TableCell>
                      <TableCell className="text-right">
                        <Button size={"icon-sm"}>
                          <EditIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <PassarComunidadeDeEtapa
                comunidadeId={id}
                etapaAtual={
                  comunidade.comunidadeEtapas.at(-1)?.etapa ||
                  EtapaEnum.PRE_CATECUMENATO
                }
                onSuccess={fetchComunidade}
              />
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Carismas da comunidade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="italic text-slate-500">
                Em breve carismas da comunidade
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
