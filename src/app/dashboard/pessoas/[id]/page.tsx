"use client";

import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
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
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditarPessoaPage() {
  const params = useParams();
  const pessoaId = params.id;

  const [pessoa, setPessoa] = useState<IPessoa>();
  const [editar, setEditar] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      async function getPessoa() {
        const res = await fetch(`${BASE_URL}/api/ambrosio/pessoa/${pessoaId}`);
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
        buttonShow={true}
        buttonText="Voltar"
        buttonUrl="/dashboard/pessoas"
        buttonVariant="outline"
      />

      {!editar && (
        <div className="flex space-x-2">
          <Card>
            <CardHeader>
              <CardTitle>Dados principais</CardTitle>
              <CardDescription>Dados principais</CardDescription>
            </CardHeader>
            <CardContent>
              <LabelData titulo="Nome" descricao={pessoa.nome} />
              <LabelData titulo="Sexo" descricao={pessoa.sexo} />
              <LabelData
                titulo="Carisma"
                descricao={pessoa.tipoCarisma.descricao}
              />
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
              <CardTitle>Endereços</CardTitle>
              <CardDescription>Todos os endereços dessa pessoa</CardDescription>
            </CardHeader>
            <CardContent>
              {pessoa.enderecos ? (
                pessoa.enderecos.map((end, index) => (
                  <div key={index}>
                    <LabelData titulo="CEP" descricao="COLOCAR INFO" />
                    <div className="flex space-x-2">
                      <LabelData titulo="Rua" descricao="COLOCAR INFO" />
                      <LabelData titulo="Nº" descricao="321" />
                    </div>
                    <div className="flex space-x-2">
                      <LabelData titulo="Cidade" descricao={"COLOCAR INFO"} />
                      <LabelData titulo="UF" descricao={"MG"} />
                    </div>
                    <Separator />
                  </div>
                ))
              ) : (
                <div>
                  <Link href={`/dashboard/pessoas/${pessoa.id}/enderecos`}>
                    <Button variant={"outline"}>Cadastrar endereços</Button>
                  </Link>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {pessoa.enderecos && (
                <Button onClick={() => setEditar(!editar)}>
                  Editar endereço
                </Button>
              )}
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
              <Button onClick={() => setEditar(!editar)}>
                Editar comunidade
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {editar && <PessoaForm urlBase={BASE_URL} pessoa={pessoa} />}
    </div>
  );
}
