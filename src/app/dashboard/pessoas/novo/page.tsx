"use client";

import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import PessoaForm from "@/components/custom/dashboard/pessoa/form-pessoa";
import { SkeletonLoading } from "@/components/custom/ui/SkeletonLoading";
import { getDadosDaPessoa } from "@/lib/api/pessoa";
import { BASE_URL } from "@/lib/utils";
import { Escolaridade, EstadoCivil, SituacaoReligiosa } from "neocatecumenal";
import { useEffect, useState } from "react";

export default function NovaPessoaPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [estadoCivils, setEstadoCivils] = useState<EstadoCivil[]>([]);
  const [escolaridades, setEscolaridades] = useState<Escolaridade[]>([]);
  const [situacoesReligiosa, setSituacoesReligiosa] = useState<
    SituacaoReligiosa[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const { estadosCivilData, escolaridadesData, situacoesReligiosaData } =
        await getDadosDaPessoa();

      setSituacoesReligiosa(situacoesReligiosaData);
      setEstadoCivils(estadosCivilData);
      setEscolaridades(escolaridadesData);
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
        <SkeletonLoading mensagem="Carregando estados civils, escolaridades e situações religiosas ..." />
      ) : (
        <PessoaForm
          urlBase={BASE_URL}
          estadosCivil={estadoCivils}
          escolaridades={escolaridades}
          situacoesReligiosa={situacoesReligiosa}
        />
      )}
    </div>
  );
}
