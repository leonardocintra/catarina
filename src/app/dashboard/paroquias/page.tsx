import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function ParoquiasPage() {
  return (
    <div className="grid sm:grid-cols-3 gap-2">
      <Card>
        <CardHeader>
          <CardTitle>Regiões do caminho</CardTitle>
          <CardDescription>Regiões do caminho no Brasil</CardDescription>
        </CardHeader>
        <CardContent>
          <ul>
            <li>Portinari 1</li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Dioceses</CardTitle>
          <CardDescription>Consulta dioceses</CardDescription>
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
