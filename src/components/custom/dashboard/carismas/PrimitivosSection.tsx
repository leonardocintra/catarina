"use client";

import { useState, useEffect } from "react";
import { BASE_URL } from "@/lib/utils";
import { CarismaPrimitivo } from "neocatecumenal";
import { SkeletonLoading } from "@/components/custom/ui/SkeletonLoading";

export default function PrimitivosSection() {
  const [primitivos, setPrimitivos] = useState<CarismaPrimitivo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrimitivos = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/ambrosio/configuracoes/carismas/primitivo`
        );
        if (!res.ok) throw new Error('Erro ao carregar primitivos');
        const data = await res.json();
        setPrimitivos(data.data);
      } catch (error) {
        setError('Erro ao carregar primitivos');
        console.error("Erro ao buscar primitivos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrimitivos();
  }, []);

  if (loading) return <SkeletonLoading mensagem="Carregando primitivos..." />;
  if (error) return <div className="text-red-500">{error}</div>;

  if (primitivos.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">Primitivos</h2>
      <ul className="list-disc pl-5">
        {primitivos.map((carisma) => (
          <li key={carisma.id} className="mb-2">
            <span className="font-normal">{carisma.descricao}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
