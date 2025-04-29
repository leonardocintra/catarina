"use client";

import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import ListPessoa from "@/components/custom/dashboard/pessoa/list-pessoa";
import { SkeletonLoading } from "@/components/custom/ui/SkeletonLoading";
import { BASE_URL } from "@/lib/utils";
import { Pessoa } from "neocatecumenal";
import { useEffect, useState } from "react";

export default function PessoaPage() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };
    getPessoas();
  }, []);

  const listar = () => {
    if (pessoas) {
      return <ListPessoa pessoas={pessoas} />;
    } else {
      return <h2>Nenhuma pessoa cadastrada</h2>;
    }
  };

  return (
    <div className="">
      <PageSubtitle
        title={`Pessoas - ${pessoas?.length}`}
        buttonShow={true}
        buttonText="Cadastrar"
        buttonUrl="/dashboard/pessoas/novo"
      />

      {loading ? <SkeletonLoading mensagem="Carregando pessoas ..." /> : listar()}
    </div>
  );
}
