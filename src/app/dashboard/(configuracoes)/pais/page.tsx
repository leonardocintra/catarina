"use client";

import { useEffect, useState } from "react";
import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import ListPaises from "@/components/custom/dashboard/pais/list-pais";
import { IPais } from "@/interfaces/IPais";
import { BASE_URL } from "@/lib/utils";
import { SkeletonLoading } from "@/components/custom/ui/SkeletonLoading";

export default function PaisPage() {
  const [paises, setPaises] = useState<IPais[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/ambrosio/configuracoes/pais`);
        const data = await res.json();
        setPaises(data.data);
      } catch (error) {
        console.error("Erro ao buscar países:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <SkeletonLoading mensagem="Carregando paises ..." />;

  return (
    <div>
      <PageSubtitle
        title={`Paises - ${paises.length}`}
        subTitle="do Caminho"
        buttonShow={true}
        buttonText="Cadastrar"
        buttonUrl="/dashboard/pais/novo"
      />
      <ListPaises paises={paises} />
    </div>
  );
}
