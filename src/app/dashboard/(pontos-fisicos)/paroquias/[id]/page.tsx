"use client";

import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import ParoquiaForm from "@/components/custom/dashboard/paroquias/form-paroquia";
import LabelData from "@/components/custom/dashboard/pessoa/label-data";
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/lib/utils";
import { Paroquia } from "neocatecumenal";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditarParoquiaPage() {
  const { toast } = useToast();
  const params = useParams();
  const router = useRouter();
  const paroquiaId = params.id;

  const [paroquia, setParoquia] = useState<Paroquia>();
  const [editar, setEditar] = useState<boolean>(false);
  const [redirectNotFound, setRedirectNotFound] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      async function getParoquia() {
        const res = await fetch(
          `${BASE_URL}/api/ambrosio/paroquia/${paroquiaId}`
        );

        if (res.status === 404) {
          // TODO: esta dando erro no console log quando usa esse toast
          toast({
            title: `Paróquia não encontrada`,
            variant: "destructive",
            description: `Paróquia não encontrada. Tente novamente`,
          });
          setRedirectNotFound(true);
        }

        if (res.status === 401) {
          // TODO: esta dando erro no console log quando usa esse toast
          toast({
            title: `Sem permissão`,
            variant: "destructive",
            description: `Você não tem permissão para ver essa paróquia`,
          });
          setRedirectNotFound(true);
        }

        return res.json();
      }

      try {
        const [resParoquia] = await Promise.all([getParoquia()]);
        setParoquia(resParoquia);
      } catch (error: any) {
        toast({
          title: `Erro ao buscar diocese`,
          variant: "destructive",
          description: `Erro: ${error}`,
        });
      }
    };

    fetchData();
  }, [paroquiaId, toast]);

  if (redirectNotFound) {
    router.push("/dashboard/paroquias");
  }

  if (!paroquia) {
    return <SkeletonLoading mensagem="Carregando paróquia ..." />;
  }

  return (
    <div>
      <PageSubtitle
        title={`Paróquia: ${paroquia.descricao}`}
        subTitle={`${paroquia.diocese.tipoDiocese.descricao}: ${paroquia.diocese.descricao}`}
        buttonShow={true}
        buttonText="Voltar"
        buttonUrl="/dashboard/paroquias"
        buttonVariant="outline"
      />

      {!editar && (
        <div>
          <div className="max-w-lg mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Paróquia {paroquia.descricao}</CardTitle>
                <CardDescription>
                  {paroquia.diocese.tipoDiocese.descricao} {" de "}
                  {paroquia.diocese.descricao}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LabelData
                  titulo="Setor"
                  descricao={`${paroquia.setor?.descricao || "Não informado"}`}
                />
                <LabelData
                  titulo="Cidade"
                  descricao={`${paroquia.endereco.cidade.nome} - ${paroquia.endereco.cidade.estado.sigla}`}
                />
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="default">
                  <Link href={`/dashboard/comunidades/novo/${paroquia.id}`}>
                    Cadastrar comunidade
                  </Link>
                </Button>
                <Button variant="outline" onClick={() => setEditar(true)}>
                  Editar paróquia
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="mt-7">
            <Table>
              <TableCaption>
                Lista de comunidades da paroquia {paroquia.descricao}.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Comunidade</TableHead>
                  <TableHead>Irmãos</TableHead>
                  <TableHead>Etapa</TableHead>
                  <TableHead>Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paroquia.comunidades?.map((comunidade) => (
                  <TableRow key={comunidade.id}>
                    <TableCell className="font-medium text-right">
                      {comunidade.numeroDaComunidade}
                    </TableCell>
                    <TableCell>{comunidade.quantidadeMembros}</TableCell>
                    <TableCell>Colocar etapa aqui</TableCell>
                    <TableCell>
                      <Link href={`/dashboard/comunidades/${comunidade.id}`}>
                        <Button variant="link">Mais detalhes</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {editar && (
        <ParoquiaForm
          urlBase={BASE_URL}
          paroquia={paroquia}
          dioceseId={paroquia.diocese.id}
          dioceseNome={paroquia.diocese.descricao}
        />
      )}
    </div>
  );
}
