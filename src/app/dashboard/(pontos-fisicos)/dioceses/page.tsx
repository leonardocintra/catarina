"use client";

import ListDioceses from "@/components/custom/dashboard/diocese/list-dioceses";
import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import UnauthorizedAccessAlert from "@/components/custom/ui/AlertSemCadastroOuPermissao";
import { SkeletonLoading } from "@/components/custom/ui/SkeletonLoading";
import { Diocese } from "neocatecumenal";
import { useEffect, useState } from "react";

export default function DiocesesPage() {
  const [dioceses, setDioceses] = useState<Diocese[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDioceses = async () => {
      try {
        const res = await fetch("/api/ambrosio/diocese", {
          credentials: "include",
        });
        const data = await res.json();
        setDioceses(data.data);
      } catch (error) {
        console.error("Erro ao listar dioceses", error);
      } finally {
        setLoading(false);
      }
    };

    getDioceses();
  }, []);

  const listar = () => {
    if (dioceses) {
      return <ListDioceses dioceses={dioceses} />;
    } else {
      return <UnauthorizedAccessAlert title="Dioceses" />;
    }
  };

  return (
    <div>
      <PageSubtitle
        title={`Dioceses - ${dioceses?.length || 0}`}
        subTitle="do Brasil"
        buttons={[
          {
            buttonText: "Cadastrar",
            buttonUrl: "/dashboard/dioceses/novo",
            buttonShow: true,
          },
        ]}
      />

      {loading ? (
        <SkeletonLoading mensagem="Carregando dioceses ..." />
      ) : (
        listar()
      )}
    </div>
  );
}
