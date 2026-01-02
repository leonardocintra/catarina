"use client";

import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import { use, useState } from "react";
import { SkeletonLoading } from "@/components/custom/ui/SkeletonLoading";

export default function EditarComunidadePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const { id } = use(params);

  if (loading) return <SkeletonLoading mensagem="Carregando comunidade ..." />;

  return (
    <div>
      <PageSubtitle
        title={`Comunidade`}
        subTitle={`Descrição aqui`}
        buttonShow={true}
        buttonText="Voltar"
        buttonUrl="/dashboard/comunidades"
        buttonVariant="outline"
      />

      <div>
        Detalhes da comunidade serão exibidos aqui.
      </div>
    </div>
  );
}
