"use client";

import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import { use, useEffect, useState } from "react";
import { SkeletonLoading } from "@/components/custom/ui/SkeletonLoading";
import { BASE_URL } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Comunidade } from "neocatecumenal";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EditarComunidadePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [comunidade, setComunidade] = useState<Comunidade>();
  const { id } = use(params);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      async function getComunidade() {
        const res = await fetch(`${BASE_URL}/api/ambrosio/comunidade/${id}`);

        if (res.status === 404) {
          // TODO: esta dando erro no console log quando usa esse toast
          toast({
            title: `Comunidade não encontrada`,
            variant: "destructive",
            description: `Comunidade não encontrada. Tente novamente`,
          });
          setRedirectNotFound(true);
        }

        if (res.status === 401) {
          toast({
            title: `Sem permissão`,
            variant: "destructive",
            description: `Você não tem permissão para ver essa comunidade`,
          });
          setRedirectNotFound(true);
        }

        return res.json();
      }

      try {
        const [resComunidade] = await Promise.all([getComunidade()]);
        setComunidade(resComunidade);
      } catch (error: any) {
        toast({
          title: `Erro ao buscar comunidade`,
          variant: "destructive",
          description: `Erro: ${error}`,
        });
      }
    };

    fetchData();
  }, [id, toast]);

  if (!comunidade)
    return <SkeletonLoading mensagem="Carregando comunidade ..." />;

  return (
    <div>
      <PageSubtitle
        title={`${comunidade.descricao}`}
        subTitle={`${comunidade.quantidadeMembros} irmãos da paróquia ${comunidade.paroquia.descricao}`}
        buttonShow={true}
        buttonText="Voltar"
        buttonUrl="/dashboard/comunidades"
        buttonVariant="outline"
      />

      <div className="grid gap-2 sm:grid-cols-3 items-start">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Etapas / Catequistas</CardTitle>
            </CardHeader>
            <CardContent>
              {comunidade.comunidadeEtapas.map((ce) => (
                <div key={ce.id} className="mb-4">
                  <div className="flex space-x-1.5">
                    <div>Etapa:</div>
                    <div className="font-semibold">{ce.etapa}</div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="link" size="sm">
                Incluir etapa
              </Button>
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
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Historico</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="italic text-slate-500">
                Em breve histórico das atividades da comunidade
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
function setRedirectNotFound(arg0: boolean) {
  throw new Error("Function not implemented.");
}
