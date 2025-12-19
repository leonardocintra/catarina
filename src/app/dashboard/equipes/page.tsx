"use client";

import ListEquipe from "@/components/custom/dashboard/equipe/list-equipe";
import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import UnauthorizedAccessAlert from "@/components/custom/ui/AlertSemCadastroOuPermissao";
import { SkeletonLoading } from "@/components/custom/ui/SkeletonLoading";
import { BASE_URL } from "@/lib/utils";
import { Equipe } from "neocatecumenal";
import { useEffect, useState } from "react";

export default function EquipePage() {
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEquipes = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/ambrosio/equipe`, {
          credentials: "include",
        });

        const data = await res.json();
        setEquipes(data.data);
      } catch (error) {
        console.error("Erro ao buscar equipes", error);
      } finally {
        setLoading(false);
      }
    };
    getEquipes();
  }, []);

  const listar = () => {
    if (equipes) {
      return <ListEquipe equipes={equipes} />;
    } else {
      return <UnauthorizedAccessAlert title="Equipes" />;
    }
  };

  return (
    <div className="">
      <PageSubtitle
        title={`Equipes - ${equipes?.length || 0}`}
        buttonShow={true}
        buttonText="Nova equipe"
        buttonUrl="/dashboard/equipes/novo"
      />

      {loading ? (
        <SkeletonLoading mensagem="Carregando equipes ..." />
      ) : (
        listar()
      )}
    </div>
  );
}
