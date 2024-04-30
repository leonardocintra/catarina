import RegioesCaminho from "@/components/custom/dashboard/paroquias/regioes-list";
import { BASE_URL } from "@/lib/utils";

export default function DashboardPage() {
  return (
    <div className="">
      <RegioesCaminho baseUrl={BASE_URL} />
    </div>
  );
}
