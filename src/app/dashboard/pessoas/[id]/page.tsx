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
import { Pessoa, SituacaoReligiosa, TipoCarismaEnum } from "neocatecumenal";
import { SkeletonLoading } from "@/components/custom/ui/SkeletonLoading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Trash2Icon } from "lucide-react";

export default function EditarPessoaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [pessoa, setPessoa] = useState<Pessoa | null>(null);
  const [situacoesReligiosa, setSituacoesReligiosa] = useState<
    SituacaoReligiosa[]
  >([]);
  const [loading, setLoading] = useState(true);
  const { id } = use(params);

  const handleEditSuccess = async () => {
    setIsEditing(false);
    // Recarrega os dados após edição
    const pessoaData = await getPessoa(parseInt(id));
    setPessoa(pessoaData);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const pessoaData = await getPessoa(parseInt(id));
      const { situacoesReligiosaData } = await getDadosDaPessoa();

      setPessoa(pessoaData);
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
        subTitle={`Situação: ${pessoa.situacaoReligiosa.descricao} - ID: ${pessoa.externalId}`}
        buttonShow={true}
        buttonText="Voltar"
        buttonUrl="/dashboard/pessoas"
        buttonVariant="outline"
      />

      {!isEditing && (
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
              <LabelData titulo="Estado Civil" descricao={pessoa.estadoCivil} />
              <LabelData
                titulo="Escolaridade"
                descricao={
                  pessoa.escolaridade ? pessoa.escolaridade : "não informado"
                }
              />
            </CardContent>
            <CardFooter className="mt-auto">
              <Button className="w-full" onClick={() => setIsEditing(!isEditing)}>
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
              <LabelData titulo="Comunidade" descricao="NAO-INFORMADO" />
              <LabelData titulo="Cidade" descricao="NAO-INFORMADO" />
              <LabelData titulo="Paroquia" descricao="NAO-INFORMADO" />
              <LabelData titulo="Regiao" descricao="NAO-INFORMADO" />
            </CardContent>
            <CardFooter className="mt-auto">
              <Button className="w-full" disabled>
                Editar comunidade
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle>Carismas de {pessoa.nome}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              {handleCarismas(pessoa)}
            </CardContent>
            <CardFooter className="mt-auto">
              <Button className="w-full" variant={"outline"} asChild>
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
                  className="mb-2 text-sm flex gap-3 items-center"
                >
                  <Button variant={"destructive"} size={"sm"} disabled>
                    <Trash2Icon className="w-4 h-4" />
                  </Button>
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
                </div>
              ))}
            </CardContent>
            <CardFooter className="mt-auto">
              <Button className="w-full" variant={"outline"} asChild>
                <Link href={`/dashboard/pessoas/${pessoa.id}/enderecos`}>
                  Cadastrar endereços
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {pessoa.estadoCivil === "CASADO" && (
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
                  <div className="space-y-1.5">
                    <Alert variant="destructive">
                      <AlertTitle>Informe o cônjuge</AlertTitle>
                      <AlertDescription>
                        <p className="italic">
                          Informar o cônjuge logo no início do cadastro. Isso
                          ajuda a manter os dados da comunidade organizados.
                        </p>
                      </AlertDescription>
                    </Alert>
                  </div>
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

      {isEditing && (
        <PessoaForm
          urlBase={BASE_URL}
          pessoa={pessoa}
          situacoesReligiosa={situacoesReligiosa}
          onEditSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
}

function handleCarismas(pessoa: Pessoa) {
  const carismas = pessoa.carismas || [];

  // Separar por tipo
  const primitivos = carismas.filter(
    (c: any) => c.tipo === TipoCarismaEnum.PRIMITIVO
  );
  const vinculados = carismas.filter(
    (c: any) => c.tipo === TipoCarismaEnum.VINCULADO
  );
  const servicos = carismas.filter(
    (c: any) => c.tipo === TipoCarismaEnum.SERVICO
  );

  // Se não houver nenhum carisma cadastrado
  if (carismas.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">Nenhum carisma cadastrado</p>
    );
  }

  return (
    <div className="space-y-4">
      {primitivos.length > 0 && (
        <div>
          <h4 className="font-semibold text-sm mb-2">Primitivos</h4>
          <ul className="space-y-1">
            {primitivos.map((c: any) => (
              <li key={c.id} className="text-sm text-muted-foreground">
                • {c.descricao}
              </li>
            ))}
          </ul>
        </div>
      )}

      {vinculados.length > 0 && (
        <div>
          <h4 className="font-semibold text-sm mb-2">Vinculados</h4>
          <ul className="space-y-1">
            {vinculados.map((c: any) => (
              <li key={c.id} className="text-sm text-muted-foreground">
                • {c.descricao}
              </li>
            ))}
          </ul>
        </div>
      )}

      {servicos.length > 0 && (
        <div>
          <h4 className="font-semibold text-sm mb-2">Serviços</h4>
          <ul className="space-y-1">
            {servicos.map((c: any) => (
              <li key={c.id} className="text-sm text-muted-foreground">
                • {c.descricao}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
