"use client";

import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import PessoaForm from "@/components/custom/dashboard/pessoa/form-pessoa";
import { IEscolaridade } from "@/interfaces/IEscolaridade";
import { IEstadoCivil } from "@/interfaces/IEstadoCivil";
import { ITipoPessoa } from "@/interfaces/ITipoPessoa";
import { getDadosDaPessoa } from "@/lib/api/pessoa";
import { BASE_URL } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function NovaPessoaPage() {
  const [estadoCivils, setEstadoCivils] = useState<IEstadoCivil[]>([]);
  const [escolaridades, setEscolaridades] = useState<IEscolaridade[]>([]);
  const [tipoPessoas, setTipoPessoas] = useState<ITipoPessoa[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { estadoCivils, escolaridades, tipoPessoas } =
        await getDadosDaPessoa();

      setEstadoCivils(estadoCivils);
      setEscolaridades(escolaridades);
      setTipoPessoas(tipoPessoas);
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
        tipoPessoas={tipoPessoas}
      />
    </div>
  );
}
