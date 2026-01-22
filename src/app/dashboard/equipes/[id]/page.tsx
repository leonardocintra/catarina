"use client";

import EquipeForm from "@/components/custom/dashboard/equipe/form-equipe";
import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import { SkeletonLoading } from "@/components/custom/ui/SkeletonLoading";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BASE_URL } from "@/lib/utils";
import { Equipe } from "neocatecumenal";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditarEquipePage() {
  const { toast } = useToast();
  const params = useParams();
  const router = useRouter();
  const equipeId = params.id;

  const [equipe, setEquipe] = useState<Equipe>();
  const [editar, setEditar] = useState<boolean>(false);
  const [redirectNotFound, setRedirectNotFound] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      async function getEquipe() {
        const res = await fetch(`${BASE_URL}/api/ambrosio/equipe/${equipeId}`);

        if (res.status === 404) {
          // TODO: esta dando erro no console log quando usa esse toast
          toast({
            title: `Equipe não encontrada`,
            variant: "destructive",
            description: `Equipe não encontrada. Tente novamente`,
          });
          setRedirectNotFound(true);
        }

        if (res.status === 401) {
          // TODO: esta dando erro no console log quando usa esse toast
          toast({
            title: `Sem permissão`,
            variant: "destructive",
            description: `Você não tem permissão para ver essa equipe`,
          });
          setRedirectNotFound(true);
        }

        return res.json();
      }

      try {
        const [resEquipe] = await Promise.all([getEquipe()]);
        setEquipe(resEquipe);
      } catch (error: any) {
        toast({
          title: `Erro ao buscar diocese`,
          variant: "destructive",
          description: `Erro: ${error}`,
        });
      }
    };

    fetchData();
  }, [equipeId, toast]);

  if (redirectNotFound) {
    router.push("/dashboard/equipes");
  }

  if (!equipe) {
    return <SkeletonLoading mensagem="Carregando equipe ..." />;
  }

  return (
    <div>
      <PageSubtitle
        title={`Equipe: ${equipe.descricao}`}
        subTitle={`${equipe.tipoEquipe.descricao}`}
        buttons={[
          {
            buttonText: "Voltar",
            buttonUrl: "/dashboard/equipes",
            buttonShow: true,
            buttonVariant: "outline",
          },
        ]}
      />

      {!editar && (
        <div>
          <div className="max-w-lg mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Equipe {equipe.descricao}</CardTitle>
                <CardDescription>
                  Tipo: {equipe.tipoEquipe.descricao}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Situação religiosa</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {equipe.pessoas.map((pessoa) => (
                      <TableRow key={pessoa.id}>
                        <TableCell>
                          {pessoa.nome}{" "}
                          {pessoa.conhecidoPor
                            ? `(${pessoa.conhecidoPor})`
                            : ""}
                        </TableCell>
                        <TableCell>
                          {pessoa.situacaoReligiosa.descricao}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditar(true)}>
                  Editar equipe
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}

      {editar && (
        <EquipeForm
          urlBase={BASE_URL}
          equipe={equipe}
          pessoasComCarismaEquipe={[]}
          tiposDeEquipe={[]}
        />
      )}
    </div>
  );
}
