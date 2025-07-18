"use client";

import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import PrimitivosSection from "@/components/custom/dashboard/carismas/PrimitivosSection";
import ServicosSection from "@/components/custom/dashboard/carismas/ServicosSection";
import VinculadosSection from "@/components/custom/dashboard/carismas/VinculadosSection";
import SituacoesReligiosasSection from "@/components/custom/dashboard/carismas/SituacoesReligiosasSection";

export default function CarismasPage() {
  return (
    <div className="space-y-6">
      <PageSubtitle
        title={`Carismas`}
        subTitle="Primitivos, Serviços, Vinculados e Situações Religiosas"
        buttonShow={false}
        buttonText="Cadastrar"
        buttonUrl="/dashboard/carismas/novo"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <PrimitivosSection />
        <ServicosSection />
        <VinculadosSection />
        <SituacoesReligiosasSection />
      </div>
    </div>
  );
}
