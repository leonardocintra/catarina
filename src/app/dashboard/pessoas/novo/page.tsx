"use client";

import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import PessoaForm from "@/components/custom/dashboard/pessoa/form-pessoa";
import { getDadosDaPessoa } from "@/lib/api/pessoa";
import { BASE_URL } from "@/lib/utils";
import { Escolaridade, EstadoCivil, SituacaoReligiosa } from "neocatecumenal";
import { useEffect, useState } from "react";

export default function NovaPessoaPage() {
  const [estadoCivils, setEstadoCivils] = useState<EstadoCivil[]>([]);
  const [escolaridades, setEscolaridades] = useState<Escolaridade[]>([]);
  const [situacaoReligiosas, setSituacaoReligiosas] = useState<
    SituacaoReligiosa[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const { estadoCivils, escolaridades, situacaoReligosas } =
        await getDadosDaPessoa();

      setEstadoCivils(estadoCivils);
      setEscolaridades(escolaridades);
      setSituacaoReligiosas(situacaoReligosas);
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

      <PessoaForm
        urlBase={BASE_URL}
        estadoCivils={estadoCivils}
        escolaridades={escolaridades}
        situacaoReligiosas={situacaoReligiosas}
      />
    </div>
  );
}
