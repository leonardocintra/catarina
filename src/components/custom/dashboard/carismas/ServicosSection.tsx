"use client";

import { useState, useEffect } from "react";
import { BASE_URL } from "@/lib/utils";
import { CarismaServico } from "neocatecumenal";
import { SkeletonLoading } from "@/components/custom/ui/SkeletonLoading";

export default function ServicosSection() {
  const [servicos, setServicos] = useState<CarismaServico[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/ambrosio/configuracoes/carismas/servico`
        );
        if (!res.ok) throw new Error('Erro ao carregar serviços');
        const data = await res.json();
        setServicos(data.data);
      } catch (error) {
        setError('Erro ao carregar serviços');
        console.error("Erro ao buscar serviços:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServicos();
  }, []);

  if (loading) return <SkeletonLoading mensagem="Carregando serviços..." />;
  if (error) return <div className="text-red-500">{error}</div>;

  if (servicos.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">Serviço</h2>
      <ul className="list-disc pl-5">
        {servicos.map((carisma) => (
          <li key={carisma.id} className="mb-2">
            <span className="font-normal">{carisma.descricao}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
