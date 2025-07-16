"use client";

import { useState, useEffect } from "react";
import { BASE_URL } from "@/lib/utils";
import { CarismaVinculado } from "neocatecumenal";
import { SkeletonLoading } from "@/components/custom/ui/SkeletonLoading";

export default function VinculadosSection() {
  const [vinculados, setVinculados] = useState<CarismaVinculado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVinculados = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/ambrosio/configuracoes/carismas/vinculado`
        );
        if (!res.ok) throw new Error('Erro ao carregar vinculados');
        const data = await res.json();
        setVinculados(data.data);
      } catch (error) {
        setError('Erro ao carregar vinculados');
        console.error("Erro ao buscar vinculados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVinculados();
  }, []);

  if (loading) return <SkeletonLoading mensagem="Carregando vinculados..." />;
  if (error) return <div className="text-red-500">{error}</div>;

  if (vinculados.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">Vinculados</h2>
      <ul className="list-disc pl-5">
        {vinculados.map((carisma) => (
          <li key={carisma.id} className="mb-2">
            <span className="font-normal">{carisma.descricao}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
