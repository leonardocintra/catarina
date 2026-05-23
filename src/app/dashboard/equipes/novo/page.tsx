"use client";

import EquipeForm from "@/components/custom/dashboard/equipe/form-equipe";
import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import { SkeletonLoading } from "@/components/custom/ui/SkeletonLoading";
import { BASE_URL } from "@/lib/utils";
import { useEquipeConfigurations } from "@/hooks/useEquipeConfigurations";

export default function NovaEquipePage() {
  const { tiposDeEquipe, carismaEquipe, isLoading } = useEquipeConfigurations();

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
