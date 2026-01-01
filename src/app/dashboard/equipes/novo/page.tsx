"use client";

import EquipeForm from "@/components/custom/dashboard/equipe/form-equipe";
import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import { SkeletonLoading } from "@/components/custom/ui/SkeletonLoading";
import { BASE_URL } from "@/lib/utils";
import { Catequista, TipoEquipe } from "neocatecumenal";
import { useEffect, useState } from "react";

export default function NovaEquipePage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tiposDeEquipe, setTiposDeEquipe] = useState<TipoEquipe[]>([]);
  const [catequistas, setCatequistas] = useState<Catequista[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/ambrosio/configuracoes/tipoEquipe`, {
        credentials: "include",
        cache: "force-cache",
      });
      const data = await response.json();
      const tiposDeEquipeData = data.data;

      const catequistaResponse = await fetch(
        `/api/ambrosio/configuracoes/carismas/catequistas`,
        {
          credentials: "include",
        }
      );
      const catequistaDataJson = await catequistaResponse.json();
      const catequistasData = catequistaDataJson.data;
      setCatequistas(catequistasData);
      setTiposDeEquipe(tiposDeEquipeData);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      <PageSubtitle
        title="Cadastro de nova equipe"
        buttonShow={true}
        buttonText="Voltar"
        buttonUrl="/dashboard/equipes"
        buttonVariant="outline"
      />

      {isLoading ? (
        <SkeletonLoading mensagem="Carregando catequistas e tipos de equipe ..." />
      ) : (
        <EquipeForm
          tiposDeEquipe={tiposDeEquipe}
          urlBase={BASE_URL}
          catequistas={catequistas}
        />
      )}
    </div>
  );
}
