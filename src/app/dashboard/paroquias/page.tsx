import RegioesCaminho from "@/components/custom/dashboard/paroquias/regioes-list";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BASE_URL } from "@/lib/utils";

export default function ParoquiasPage() {
  return (
    <div className="">
      <RegioesCaminho baseUrl={BASE_URL} />
    </div>
  );
}
