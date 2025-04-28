"use client";

import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import ListPessoa from "@/components/custom/dashboard/pessoa/list-pessoa";
import { BASE_URL } from "@/lib/utils";
import { Pessoa } from "neocatecumenal";
import { useEffect, useState } from "react";

export default function PessoaPage() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  useEffect(() => {
    const getPessoas = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/ambrosio/pessoa`, {
          credentials: "include",
        });

        const data = await res.json();
        setPessoas(data.data);
      } catch (error) {
        console.error("Erro ao buscar pessoas", error);
      }
    };
    getPessoas();
  }, []);

  return (
    <div className="">
      <PageSubtitle
        title={`Pessoas - ${pessoas?.length}`}
        buttonShow={true}
        buttonText="Cadastrar"
        buttonUrl="/dashboard/pessoas/novo"
      />

      <ListPessoa pessoas={pessoas} />
    </div>
  );
}
