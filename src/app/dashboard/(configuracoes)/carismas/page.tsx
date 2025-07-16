"use client";

import { useEffect, useState } from "react";
import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import { BASE_URL } from "@/lib/utils";
import { SkeletonLoading } from "@/components/custom/ui/SkeletonLoading";
import {
  CarismaPrimitivo,
  CarismaServico,
  CarismaVinculado,
  SituacaoReligiosa,
} from "neocatecumenal";

export default function CarismasPage() {
  const [primitivos, setPrimitivos] = useState<CarismaPrimitivo[]>([]);
  const [servicos, setServicos] = useState<CarismaServico[]>([]);
  const [vinculados, setVinculados] = useState<CarismaVinculado[]>([]);
  const [situacoesReligiosas, setSituacoesReligiosas] = useState<
    SituacaoReligiosa[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resPrimitivo = await fetch(
          `${BASE_URL}/api/ambrosio/configuracoes/carismas/primitivo`
        );
        const dataPrimitivo = await resPrimitivo.json();
        setPrimitivos(dataPrimitivo.data);

        const resServico = await fetch(
          `${BASE_URL}/api/ambrosio/configuracoes/carismas/servico`
        );
        const dataServico = await resServico.json();
        setServicos(dataServico.data);

        const resVinculado = await fetch(
          `${BASE_URL}/api/ambrosio/configuracoes/carismas/vinculado`
        );
        const dataVinculado = await resVinculado.json();
        setVinculados(dataVinculado.data);

        const resSituacao = await fetch(
          `${BASE_URL}/api/ambrosio/configuracoes/situacaoReligiosa`
        );
        const dataSituacao = await resSituacao.json();
        setSituacoesReligiosas(dataSituacao.data);
      } catch (error) {
        console.error("Erro ao buscar carismas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <SkeletonLoading mensagem="Carregando carismas ..." />;

  return (
    <div>
      <PageSubtitle
        title={`Carismas - ${primitivos.length}`}
        subTitle="do Caminho"
        buttonShow={true}
        buttonText="Cadastrar"
        buttonUrl="/dashboard/carismas/novo"
      />

      <div className="flex space-x-4 justify-center mt-7">
        {primitivos.length > 0 && (
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
        )}

        {servicos.length > 0 && (
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
        )}

        {vinculados.length > 0 && (
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
        )}

        {situacoesReligiosas.length > 0 && (
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
        )}
      </div>
    </div>
  );
}
