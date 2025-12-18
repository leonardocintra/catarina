"use client";

import ComunidadeForm from "@/components/custom/dashboard/comunidade/form-comunidade";
import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import { SkeletonLoading } from "@/components/custom/ui/SkeletonLoading";
import { BASE_URL } from "@/lib/utils";
import { TipoEquipe } from "neocatecumenal";
import { useEffect, useState } from "react";

export default function NovaComunidadePage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tipoEquipe, setTipoEquipe] = useState<TipoEquipe[]>([]);

  useEffect(() => {
    const fetchTipoEquipe = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/ambrosio/configuracoes/tipoEquipe`,
          {
            cache: "no-store",
          }
        );
        const data = await res.json();
        console.log(data);
        setTipoEquipe(data.data);
      } catch (error) {
        console.error("Erro ao buscar tipos de equipe", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTipoEquipe();
  }, []);

  return (
    <div>
      <PageSubtitle
        title="Cadastro de nova comunidade"
        buttonShow={true}
        buttonText="Voltar"
        buttonUrl="/dashboard/comunidades"
        buttonVariant="outline"
      />

      {isLoading ? (
        <SkeletonLoading mensagem="Carregando tipos de equipe ..." />
      ) : (
        <>Carminha ...</>
        // <ComunidadeForm urlBase={BASE_URL} tipoEquipe={tipoEquipe} />
      )}
    </div>
  );
}
