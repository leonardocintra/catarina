"use client";

import PessoaForm from "@/components/custom/dashboard/pessoa/form-pessoa";
import LabelData from "@/components/custom/dashboard/pessoa/label-data";
import { Button } from "@/components/ui/button";
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

  console.log(pessoa);

  if (!pessoa) {
    return (
      <div>
        <h2>Carregando ...</h2>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-3xl pl-3">Editar {pessoa.nome} </h2>
        <Link href={"/dashboard/pessoas"}>
          <Button variant={"outline"}>Voltar</Button>
        </Link>
      </div>
      <Separator className="mb-3 mt-2" />

      {!editar && (
        <div className="flex flex-col gap-2 sm:pl-3">
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

          <Button onClick={() => setEditar(!editar)}>Editar dados</Button>
        </div>
      )}

      {editar && <PessoaForm urlBase={BASE_URL} pessoa={pessoa} />}
    </div>
  );
}
