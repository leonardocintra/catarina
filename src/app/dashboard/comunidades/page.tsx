"use client";

import ListComunidade from "@/components/custom/dashboard/comunidade/list-comunidade";
import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import UnauthorizedAccessAlert from "@/components/custom/ui/AlertSemCadastroOuPermissao";
import { SkeletonLoading } from "@/components/custom/ui/SkeletonLoading";
import { BASE_URL } from "@/lib/utils";
import { Comunidade } from "neocatecumenal";
import { useEffect, useState } from "react";

export default function ComunidadePage() {
  const [comunidades, setComunidades] = useState<Comunidade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getComunidades = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/ambrosio/comunidade`, {
          credentials: "include",
        });

        const data = await res.json();
        setComunidades(data.data);
      } catch (error) {
        console.error("Erro ao buscar comunidades", error);
      } finally {
        setLoading(false);
      }
    };
    getComunidades();
  }, []);

  const listar = () => {
    if (comunidades) {
      return <ListComunidade comunidades={comunidades} />;
    } else {
      return <UnauthorizedAccessAlert title="Comunidades" />;
    }
  };

  return (
    <div className="">
      <PageSubtitle
        title={`Comunidades - ${comunidades?.length || 0}`}
        buttonShow={true}
        buttonVariant="outline"
        buttonText="Ir para paróquias"
        buttonUrl="/dashboard/paroquias"
        observation="Para cadastrar nova comunidade, você precisa ir nas paróquias"
      />

      {loading ? (
        <SkeletonLoading mensagem="Carregando comunidades ..." />
      ) : (
        listar()
      )}
    </div>
  );
}
