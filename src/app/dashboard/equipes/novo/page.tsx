"use client";

import EquipeForm from "@/components/custom/dashboard/equipe/form-equipe";
import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import { SkeletonLoading } from "@/components/custom/ui/SkeletonLoading";
import { BASE_URL } from "@/lib/utils";
import { TipoEquipe } from "neocatecumenal";
import { useEffect, useState } from "react";

export default function NovaEquipePage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tiposDeEquipe, setTiposDeEquipe] = useState<TipoEquipe[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/ambrosio/configuracoes/tipoEquipe`, {
        credentials: "include",
        cache: "force-cache",
      });
      const data = await response.json();
      const tiposDeEquipeData = data.data;

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
        <SkeletonLoading mensagem="Carregando tipos de equipe ..." />
      ) : (
        <EquipeForm tiposDeEquipe={tiposDeEquipe} urlBase={BASE_URL} />
      )}
    </div>
  );
}
