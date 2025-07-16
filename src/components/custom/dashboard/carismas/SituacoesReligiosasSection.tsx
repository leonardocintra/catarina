"use client";

import { useState, useEffect } from "react";
import { BASE_URL } from "@/lib/utils";
import { SituacaoReligiosa } from "neocatecumenal";
import { SkeletonLoading } from "@/components/custom/ui/SkeletonLoading";

export default function SituacoesReligiosasSection() {
  const [situacoesReligiosas, setSituacoesReligiosas] = useState<SituacaoReligiosa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSituacoesReligiosas = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/ambrosio/configuracoes/situacaoReligiosa`
        );
        if (!res.ok) throw new Error('Erro ao carregar situações religiosas');
        const data = await res.json();
        setSituacoesReligiosas(data.data);
      } catch (error) {
        setError('Erro ao carregar situações religiosas');
        console.error("Erro ao buscar situações religiosas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSituacoesReligiosas();
  }, []);

  if (loading) return <SkeletonLoading mensagem="Carregando situações religiosas..." />;
  if (error) return <div className="text-red-500">{error}</div>;

  if (situacoesReligiosas.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">Situações Religiosas</h2>
      <ul className="list-disc pl-5">
        {situacoesReligiosas.map((situacao) => (
          <li key={situacao.id} className="mb-2">
            <span className="font-normal">{situacao.descricao}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
