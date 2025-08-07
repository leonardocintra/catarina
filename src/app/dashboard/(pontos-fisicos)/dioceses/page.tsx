"use client";

import ListDioceses from "@/components/custom/dashboard/diocese/list-dioceses";
import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
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
      return <h2>Nenhuma diocese cadastrada</h2>;
    }
  };

  return (
    <div>
      <PageSubtitle
        title={`Dioceses - ${dioceses?.length}`}
        subTitle="do Brasil"
        buttonShow={true}
        buttonText="Cadastrar"
        buttonUrl="/dashboard/dioceses/novo"
      />

      {loading ? (
        <SkeletonLoading mensagem="Carregando dioceses ..." />
      ) : (
        listar()
      )}
    </div>
  );
}
