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
import { IPessoa } from "@/interfaces/IPessoa";
import { BASE_URL } from "@/lib/utils";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditarPessoaPage() {
  const params = useParams();
  const router = useRouter();
  const pessoaId = params.id;

  const [pessoa, setPessoa] = useState<IPessoa>();
  const [editar, setEditar] = useState<boolean>(false);
  const [redirectNotFound, setRedirectNotFound] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      async function getPessoa() {
        const res = await fetch(`${BASE_URL}/api/ambrosio/pessoa/${pessoaId}`);

        if (res.status === 404) {
          setRedirectNotFound(true);
        }

        return res.json();
      }

      try {
        const [resPessoa] = await Promise.all([getPessoa()]);
        setPessoa(resPessoa);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchData();
  }, [pessoaId]);

  if (redirectNotFound) {
    router.push("/dashboard/pessoas");
  }

  if (!pessoa) {
    return (
      <div>
        <h2>Carregando ...</h2>
      </div>
    );
  }

  return (
    <div>
      <PageSubtitle
        title={`Editar ${pessoa.nome}`}
        subTitle={pessoa.tipoPessoa.descricao}
        buttonShow={true}
        buttonText="Voltar"
        buttonUrl="/dashboard/pessoas"
        buttonVariant="outline"
      />

      {!editar && (
        <div className="grid gap-2 sm:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Dados principais</CardTitle>
              <CardDescription>Dados principais</CardDescription>
            </CardHeader>
            <CardContent>
              <LabelData
                titulo="Nome"
                descricao={`${pessoa.nome} - ${pessoa.tipoPessoa.descricao}`}
              />
              <LabelData titulo="Sexo" descricao={pessoa.sexo} />
              <LabelData
                titulo="Estado Civil"
                descricao={pessoa.estadoCivil.descricao}
              />
              <LabelData
                titulo="Escolaridade"
                descricao={pessoa.escolaridade.descricao}
              />
            </CardContent>
            <CardFooter>
              <Button onClick={() => setEditar(!editar)}>Editar dados</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Comunidade</CardTitle>
              <CardDescription>Historico de comunide</CardDescription>
            </CardHeader>
            <CardContent>
              <LabelData titulo="Comunidade" descricao="8" />
              <LabelData titulo="Cidade" descricao="Franca" />
              <LabelData titulo="Paroquia" descricao="Franca" />
              <LabelData titulo="Regiao" descricao="Franca" />
            </CardContent>
            <CardFooter>
              <Button disabled>Editar comunidade</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Carismas</CardTitle>
              <CardDescription>Carismas de {pessoa.nome}</CardDescription>
            </CardHeader>
            <CardContent>
              <LabelData titulo="Comunidade" descricao="8" />
              <LabelData titulo="Cidade" descricao="Franca" />
              <LabelData titulo="Paroquia" descricao="Franca" />
              <LabelData titulo="Regiao" descricao="Franca" />
            </CardContent>
            <CardFooter>
              <Link href={`/dashboard/pessoas/${pessoa.id}/carismas`}>
                <Button variant={"outline"}>Cadastrar carismas</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Endereços</CardTitle>
              <CardDescription>Todos os endereços dessa pessoa</CardDescription>
            </CardHeader>
            <CardContent>
              {pessoa.enderecos.length > 0 &&
                pessoa.enderecos.map((end) => (
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
                        <LabelData titulo="Cidade" descricao={end.cidade} />
                        <LabelData titulo="UF" descricao={end.UF} />
                      </div>
                      <Separator />
                    </div>
                    <Button variant={"link"}>Editar</Button>
                  </div>
                ))}
            </CardContent>
            <CardFooter>
              <Link href={`/dashboard/pessoas/${pessoa.id}/enderecos`}>
                <Button variant={"outline"}>Cadastrar endereços</Button>
              </Link>
            </CardFooter>
          </Card>

          {pessoa.estadoCivil.descricao === "CASADO(A)" && (
            <Card>
              <CardHeader>
                <CardTitle>Conjugue</CardTitle>
                <CardDescription>
                  {pessoa.nome} é
                  {pessoa.sexo === "MASCULINO" ? " casado com" : " casada com"}
                </CardDescription>
              </CardHeader>
              <CardContent>
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
              <CardFooter>
                {!pessoa.conjugue && (
                  <DialogPessoaCasada sexo={pessoa.sexo} pessoaId={pessoa.id} />
                )}
              </CardFooter>
            </Card>
          )}
        </div>
      )}

      {editar && <PessoaForm urlBase={BASE_URL} pessoa={pessoa} />}
    </div>
  );
}
