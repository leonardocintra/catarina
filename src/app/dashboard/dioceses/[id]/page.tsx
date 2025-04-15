"use client";

import DioceseForm from "@/components/custom/dashboard/diocese/form-diocese";
import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import LabelData from "@/components/custom/dashboard/pessoa/label-data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { IDiocese } from "@/interfaces/IDiocese";
import { BASE_URL } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditarDiocesePage() {
  const { toast } = useToast();
  const params = useParams();
  const router = useRouter();
  const dioceseId = params.id;

  const [diocese, setDiocese] = useState<IDiocese>();
  const [editar, setEditar] = useState<boolean>(false);
  const [redirectNotFound, setRedirectNotFound] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      async function getDiocese() {
        const res = await fetch(
          `${BASE_URL}/api/ambrosio/diocese/${dioceseId}`
        );

        if (res.status === 404) {
          // TODO: esta dando erro no console log quando usa esse toast
          toast({
            title: `Diocese não encontrada`,
            variant: "destructive",
            description: `Diocese não encontrada. Tente novamente`,
          });
          setRedirectNotFound(true);
        }

        if (res.status === 401) {
          // TODO: esta dando erro no console log quando usa esse toast
          toast({
            title: `Sem permissão`,
            variant: "destructive",
            description: `Você não tem permissão para ver essa diocese`,
          });
          setRedirectNotFound(true);
        }

        return res.json();
      }

      try {
        const [resDiocese] = await Promise.all([getDiocese()]);
        setDiocese(resDiocese);
      } catch (error: any) {
        toast({
          title: `Erro ao buscar diocese`,
          variant: "destructive",
          description: `Erro: ${error}`,
        });
      }
    };

    fetchData();
  }, [dioceseId, toast]);

  if (redirectNotFound) {
    router.push("/dashboard/dioceses");
  }

  if (!diocese) {
    return (
      <div>
        <h2>Carregando ...</h2>
      </div>
    );
  }

  return (
    <div>
      <PageSubtitle
        title={`Editar ${diocese.descricao}`}
        subTitle={diocese.tipoDiocese.descricao}
        buttonShow={true}
        buttonText="Voltar"
        buttonUrl="/dashboard/dioceses"
        buttonVariant="outline"
      />

      {!editar && (
        <div className="max-w-lg mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>{diocese.descricao}</CardTitle>
              <CardDescription>{diocese.tipoDiocese.descricao}</CardDescription>
            </CardHeader>
            <CardContent>
              <LabelData
                titulo="Cidade"
                descricao={`${diocese.endereco.cidade} - ${diocese.endereco.UF}`}
              />
              <LabelData
                titulo="Tipo"
                descricao={`${diocese.tipoDiocese.descricao}`}
              />
            </CardContent>
            <CardFooter>
              <Button onClick={() => setEditar(!editar)}>Editar dados</Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {editar && <DioceseForm urlBase={BASE_URL} diocese={diocese} />}
    </div>
  );
}
