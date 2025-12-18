"use client";

import EquipeForm from "@/components/custom/dashboard/equipe/form-equipe";
import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import { BASE_URL } from "@/lib/utils";

export default function NovaEquipePage() {
  return (
    <div>
      <PageSubtitle
        title="Cadastro de nova equipe"
        buttonShow={true}
        buttonText="Voltar"
        buttonUrl="/dashboard/equipes"
        buttonVariant="outline"
      />

      <EquipeForm situacoesReligiosa={[]} urlBase={BASE_URL} />
    </div>
  );
}
