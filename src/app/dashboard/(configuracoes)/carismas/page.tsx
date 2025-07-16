"use client";

import { Suspense } from "react";
import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import { SkeletonLoading } from "@/components/custom/ui/SkeletonLoading";
import { useCarismasCount } from "@/hooks/useCarismasCount";
import PrimitivosSection from "@/components/custom/dashboard/carismas/PrimitivosSection";
import ServicosSection from "@/components/custom/dashboard/carismas/ServicosSection";
import VinculadosSection from "@/components/custom/dashboard/carismas/VinculadosSection";
import SituacoesReligiosasSection from "@/components/custom/dashboard/carismas/SituacoesReligiosasSection";

function CarismasHeader() {
  const { totalCount, loading } = useCarismasCount();

  return (
    <PageSubtitle
      title={`Carismas - ${loading ? "0" : totalCount}`}
      subTitle="do Caminho"
      buttonShow={false}
      buttonText="Cadastrar"
      buttonUrl="/dashboard/carismas/novo"
    />
  );
}

function LoadingFallback({ }: { message: string }) {
  return (
    <div className="mb-8">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );
}

export default function CarismasPage() {
  return (
    <div>
      <Suspense
        fallback={<SkeletonLoading mensagem="Carregando cabeçalho..." />}
      >
        <CarismasHeader />
      </Suspense>

      <div className="flex space-x-4 justify-center mt-7">
        <Suspense
          fallback={<LoadingFallback message="Carregando primitivos..." />}
        >
          <PrimitivosSection />
        </Suspense>

        <Suspense
          fallback={<LoadingFallback message="Carregando serviços..." />}
        >
          <ServicosSection />
        </Suspense>

        <Suspense
          fallback={<LoadingFallback message="Carregando vinculados..." />}
        >
          <VinculadosSection />
        </Suspense>

        <Suspense
          fallback={
            <LoadingFallback message="Carregando situações religiosas..." />
          }
        >
          <SituacoesReligiosasSection />
        </Suspense>
      </div>
    </div>
  );
}
