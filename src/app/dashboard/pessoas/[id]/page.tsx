"use client";

import PessoaForm from "@/components/custom/dashboard/pessoa/form-pessoa";
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

      <PessoaForm urlBase={BASE_URL} pessoa={pessoa} />
    </div>
  );
}