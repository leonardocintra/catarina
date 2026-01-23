"use client";

import ComunidadeForm from "@/components/custom/dashboard/comunidade/form-comunidade";
import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import { BASE_URL } from "@/lib/utils";
import { use } from "react";

export default function NovaComunidadePage({
  params,
}: {
  params: Promise<{ paroquiaId: string }>;
}) {
  const { paroquiaId } = use(params);

  return (
    <div>
      <PageSubtitle
        title="Cadastro de nova comunidade"
        buttons={[
          {
            buttonText: "Voltar",
            buttonUrl: "/dashboard/comunidades",
            buttonShow: true,
            buttonVariant: "outline",
          },
        ]}
      />

      <ComunidadeForm urlBase={BASE_URL} paroquiaId={parseInt(paroquiaId)} />
    </div>
  );
}
