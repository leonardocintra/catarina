"use client";

import { useEffect, useState } from "react";
import ListLocalidades from "@/components/custom/dashboard/localidade/list-localidades";
import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import { ILocalidade } from "@/interfaces/ILocalidade";
import { BASE_URL } from "@/lib/utils";

export default function MacroRegiaoPage() {
  const [localidades, setLocalidades] = useState<ILocalidade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocalidade = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/ambrosio/configuracoes/localidade`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        setLocalidades(data.data);
      } catch (error) {
        console.error("Erro ao listar localidades", error);
      } finally {
        setLoading(false);
      }
    };

    getLocalidade();
  }, []);

  const listar = () => {
    if (localidades) {
      return <ListLocalidades localidades={localidades} />;
    } else {
      return (
        <div className="border p-4 text-center">
          <p className="text-gray-600">
            Esta página está pendente de implementação.
          </p>
        </div>
      );
    }
  };

  return (
    <div>
      <PageSubtitle
        title={`Macro Região - ${localidades ? localidades.length : 0}`}
        subTitle="do Brasil"
        buttonShow={false}
        buttonText="Cadastrar"
        buttonUrl="/dashboard/macro-regiao/novo"
      />

      {loading ? "Carregando ..." : listar()}
    </div>
  );
}
