"use client";

import EquipeForm from "@/components/custom/dashboard/equipe/form-equipe";
import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import { SkeletonLoading } from "@/components/custom/ui/SkeletonLoading";
import { BASE_URL } from "@/lib/utils";
import { CarismaEquipe, TipoEquipe } from "neocatecumenal";
import { useEffect, useState } from "react";

export default function NovaEquipePage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tiposDeEquipe, setTiposDeEquipe] = useState<TipoEquipe[]>([]);
  const [carismaEquipe, setCarismaEquipe] = useState<CarismaEquipe[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/ambrosio/configuracoes/tipoEquipe`, {
        credentials: "include",
        cache: "force-cache",
      });
      const data = await response.json();
      const tiposDeEquipeData = data.data;

      const catequistaResponse = await fetch(
        `/api/ambrosio/configuracoes/carismas/equipe`,
        {
          credentials: "include",
        },
      );
      const carisma = await catequistaResponse.json();
      const carismaData = carisma.data;
      setCarismaEquipe(carismaData);
      setTiposDeEquipe(tiposDeEquipeData);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      <PageSubtitle
        title="Cadastro de nova equipe"
        buttons={[
          {
            buttonText: "Voltar",
            buttonUrl: "/dashboard/equipes",
            buttonShow: true,
            buttonVariant: "outline",
          },
        ]}
      />

      {isLoading ? (
        <SkeletonLoading mensagem="Carregando catequistas e tipos de equipe ..." />
      ) : (
        <EquipeForm
          tiposDeEquipe={tiposDeEquipe}
          urlBase={BASE_URL}
          equipe={undefined}
          pessoasComCarismaEquipe={carismaEquipe}
        />
      )}
    </div>
  );
}
