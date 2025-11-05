"use client";

import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import PessoaForm from "@/components/custom/dashboard/pessoa/form-pessoa";
import { SkeletonLoading } from "@/components/custom/ui/SkeletonLoading";
import { getDadosDaPessoa } from "@/lib/api/pessoa";
import { BASE_URL } from "@/lib/utils";
import { SituacaoReligiosa } from "neocatecumenal";
import { useEffect, useState } from "react";

export default function NovaPessoaPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [situacoesReligiosa, setSituacoesReligiosa] = useState<
    SituacaoReligiosa[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const { situacoesReligiosaData } = await getDadosDaPessoa();

      setSituacoesReligiosa(situacoesReligiosaData);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      <PageSubtitle
        title="Cadastro de nova pessoa"
        buttonShow={true}
        buttonText="Voltar"
        buttonUrl="/dashboard/pessoas"
        buttonVariant="outline"
      />

      {isLoading ? (
        <SkeletonLoading mensagem="Carregando situações religiosas ..." />
      ) : (
        <PessoaForm
          urlBase={BASE_URL}
          situacoesReligiosa={situacoesReligiosa}
        />
      )}
    </div>
  );
}
