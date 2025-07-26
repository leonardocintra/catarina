import { ChartCarisma } from "@/components/custom/dashboard/relatorios/chart/chart-carismas";
import { ChartComunidades } from "@/components/custom/dashboard/relatorios/chart/chart-comunidades";
import { ChartParoquias } from "@/components/custom/dashboard/relatorios/chart/chart-paroquias";

export default function DashboardPage() {
  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <ChartParoquias />
        
        <ChartComunidades />

        <ChartCarisma />
      </div>
    </>
  );
}
