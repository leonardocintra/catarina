import { SelecaoGrandeRegiao } from "@/components/custom/dashboard/relatorios/selecao";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CNC - Relatorios",
  description: "Aqui vai os relatorios da CNC",
}


export default function RelatorioPage() {
  return (
    <div>
      <h2>Relatorios aqui</h2>

      <SelecaoGrandeRegiao />
    </div>
  );
}
