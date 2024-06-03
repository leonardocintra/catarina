import { SelecaoGrandeRegiao } from "@/components/custom/dashboard/relatorios/selecao";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CNC - Relatorios",
  description: "A task and issue tracker build using Tanstack Table.",
}


export default function RelatorioPage() {
  return (
    <div>
      <h2>Relatorios aqui</h2>

      <SelecaoGrandeRegiao />
    </div>
  );
}
