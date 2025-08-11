"use client";

import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import ListParoquias from "@/components/custom/dashboard/paroquias/list-paroquias";
import UnauthorizedAccessAlert from "@/components/custom/ui/AlertSemCadastroOuPermissao";
import { SkeletonLoading } from "@/components/custom/ui/SkeletonLoading";
import { Paroquia } from "neocatecumenal";
import { useEffect, useState } from "react";

export default function ParoquiasPage() {
  const [paroquias, setParoquias] = useState<Paroquia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getParoquias = async () => {
      try {
        const res = await fetch("/api/ambrosio/paroquia", {
          credentials: "include",
        });
        const data = await res.json();
        setParoquias(data.data);
      } catch (error) {
        console.error("Erro ao listar paroquias", error);
      } finally {
        setLoading(false);
      }
    };

    getParoquias();
  }, []);

  const listar = () => {
    if (paroquias) {
      return <ListParoquias paroquias={paroquias} />;
    } else {
      return <UnauthorizedAccessAlert title="Paróquias da diocese" />;
    }
  };

  return (
    <div>
      <PageSubtitle
        title={`Paroquias - ${paroquias?.length || 0}`}
        subTitle="do Brasil"
        buttonShow={true}
        buttonText="Cadastrar"
        buttonUrl="/dashboard/paroquias/novo"
      />

      {loading ? (
        <SkeletonLoading mensagem="Carregando paroquias ..." />
      ) : (
        listar()
      )}
    </div>
  );
}
