"use client";

import ListCidades from "@/components/custom/dashboard/cidade/list-cidade";
import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import { SkeletonLoading } from "@/components/custom/ui/SkeletonLoading";
import { BASE_URL } from "@/lib/utils";
import { Cidade } from "neocatecumenal";
import { useEffect, useState } from "react";

export default function CidadePage() {
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/ambrosio/configuracoes/cidade`
        );
        const data = await res.json();
        setCidades(data.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <SkeletonLoading mensagem="Carregando cidades ..." />;

  return (
    <div>
      <PageSubtitle
        title={`Cidades - ${cidades.length}`}
        subTitle="do Caminho"
        buttonShow={false}
        buttonText="Cadastrar"
        buttonUrl="/dashboard/cidade/novo"
      />
      <ListCidades cidades={cidades} />
    </div>
  );
}
