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
    <div className="grid sm:grid-cols-3 gap-2">
      <RegioesCaminho baseUrl={BASE_URL} />

      <Card>
        <CardHeader>
          <CardTitle>Dioceses</CardTitle>
          <CardDescription>Consulta dioceses do Brasil</CardDescription>
        </CardHeader>
        <CardContent>
          <ul>
            <li>Portinari 1</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cidades que tem o caminho</CardTitle>
          <CardDescription>
            Consulta se determinada cidade tem o Caminho Neocatecumenal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul>
            <li>Portinari 1</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}