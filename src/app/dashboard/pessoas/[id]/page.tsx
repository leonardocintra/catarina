"use client";

import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import { DialogPessoaCasada } from "@/components/custom/dashboard/pessoa/dialog-casal/dialog-casal";
import PessoaForm from "@/components/custom/dashboard/pessoa/form-pessoa";
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
import { Separator } from "@/components/ui/separator";
import { getDadosDaPessoa, getPessoa } from "@/lib/api/pessoa";
import { BASE_URL } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import {
  Escolaridade,
  EstadoCivil,
  Pessoa,
  SituacaoReligiosa,
} from "neocatecumenal";
import { SkeletonLoading } from "@/components/custom/ui/SkeletonLoading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export default function EditarPessoaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [editar, setEditar] = useState<boolean>(false);
  const [pessoa, setPessoa] = useState<Pessoa | null>(null);
  const [estadosCivil, setEstadosCivil] = useState<EstadoCivil[]>([]);
  const [escolaridades, setEscolaridades] = useState<Escolaridade[]>([]);
  const [situacoesReligiosa, setSituacoesReligiosa] = useState<
    SituacaoReligiosa[]
  >([]);
  const [loading, setLoading] = useState(true);
  const { id } = use(params);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const pessoaData = await getPessoa(parseInt(id));
      const { estadosCivilData, escolaridadesData, situacoesReligiosaData } =
        await getDadosDaPessoa();

      setPessoa(pessoaData);
      setEstadosCivil(estadosCivilData);
      setEscolaridades(escolaridadesData);
      setSituacoesReligiosa(situacoesReligiosaData);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) return <SkeletonLoading mensagem="Carregando pessoa ..." />;
  if (!pessoa) return notFound();

  return (
    <div>
      <PageSubtitle
        title={`${pessoa.nome}`}
        subTitle={`Situação: ${pessoa.situacaoReligiosa.descricao}`}
        buttonShow={true}
        buttonText="Voltar"
        buttonUrl="/dashboard/pessoas"
        buttonVariant="outline"
      />

      {!editar && (
        <div className="grid gap-2 sm:grid-cols-3 items-start">
          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle>Documentos</CardTitle>
              <CardDescription>Dados civis</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <LabelData
                titulo="Conhecido por"
                descricao={`${
                  pessoa.conhecidoPor ? pessoa.conhecidoPor : pessoa.nome
                }`}
              />
              <div className="flex space-x-2">
                <LabelData
                  titulo="CPF"
                  descricao={pessoa.cpf ? pessoa.cpf : "não informado"}
                />
                <LabelData titulo="Sexo" descricao={pessoa.sexo} />
              </div>
              <LabelData
                titulo="Estado Civil"
                descricao={pessoa.estadoCivil.descricao}
              />
              <LabelData
                titulo="Escolaridade"
                descricao={
                  pessoa.escolaridade
                    ? pessoa.escolaridade.descricao
                    : "não informado"
                }
              />
            </CardContent>
            <CardFooter className="mt-auto">
              <Button className="w-full" onClick={() => setEditar(!editar)}>
                Editar dados
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle>Comunidade</CardTitle>
              <CardDescription>Historico de comunide</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <LabelData titulo="Comunidade" descricao="8" />
              <LabelData titulo="Cidade" descricao="Franca" />
              <LabelData titulo="Paroquia" descricao="Franca" />
              <LabelData titulo="Regiao" descricao="Franca" />
            </CardContent>
            <CardFooter className="mt-auto">
              <Button className="w-full" disabled>
                Editar comunidade
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle>Carismas</CardTitle>
              <CardDescription>Carismas de {pessoa.nome}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Carismas em implementação</AlertTitle>
                <AlertDescription>
                  <p>Novos carismas estão disponíveis.</p>
                  <ul className="list-inside list-disc text-sm">
                    <li>Carismas primitivos</li>
                    <li>Carismas serviço</li>
                    <li>Carismas vinculado</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button className="w-full" disabled variant={"outline"}>
                <Link href={`/dashboard/pessoas/${pessoa.id}/carismas`}>
                  Ajustar carismas
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle>Endereços</CardTitle>
              <CardDescription>Todos os endereços dessa pessoa</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              {pessoa.enderecos?.map((end) => (
                <div
                  key={end.id}
                  className="mb-2 text-sm flex gap-2 items-center"
                >
                  <div>
                    <LabelData titulo="CEP" descricao={end.cep} />
                    <div className="flex space-x-2">
                      <LabelData titulo="Rua" descricao={end.logradouro} />
                      <LabelData titulo="Nº" descricao={end.numero} />
                    </div>
                    <LabelData titulo="Bairro" descricao={end.bairro} />
                    <div className="flex space-x-2">
                      <LabelData titulo="Cidade" descricao={end.cidade.nome} />
                      <LabelData
                        titulo="UF"
                        descricao={end.cidade.estado.nome}
                      />
                    </div>
                    <Separator />
                  </div>
                  <Button variant={"link"}>Editar</Button>
                </div>
              ))}
            </CardContent>
            <CardFooter className="mt-auto">
              <Button className="w-full" variant={"outline"}>
                <Link href={`/dashboard/pessoas/${pessoa.id}/enderecos`}>
                  Cadastrar endereços
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {pessoa.estadoCivil.descricao === "CASADO(A)" && (
            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>Conjugue</CardTitle>
                <CardDescription>
                  {pessoa.nome} é
                  {pessoa.sexo === "MASCULINO" ? " casado com" : " casada com"}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                {pessoa.conjugue ? (
                  <Link
                    className="text-2xl font-semibold underline decoration-sky-500"
                    href={`/dashboard/pessoas/${pessoa.conjugue.id}`}
                  >
                    {pessoa.conjugue.nome}
                  </Link>
                ) : (
                  <LabelData
                    titulo={
                      pessoa.sexo === "MASCULINO" ? "Casado com" : "Casada com"
                    }
                    descricao={"Não informado"}
                  />
                )}
              </CardContent>
              <CardFooter className="mt-auto">
                {!pessoa.conjugue && (
                  <DialogPessoaCasada sexo={pessoa.sexo} pessoaId={pessoa.id} />
                )}
              </CardFooter>
            </Card>
          )}
        </div>
      )}

      {editar && (
        <PessoaForm
          urlBase={BASE_URL}
          pessoa={pessoa}
          escolaridades={escolaridades}
          estadosCivil={estadosCivil}
          situacoesReligiosa={situacoesReligiosa}
        />
      )}
    </div>
  );
}
