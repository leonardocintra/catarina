import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IRegioesCaminho } from "@/interfaces/IRegioesCaminho";
import { BASE_URL } from "@/lib/utils";
import Link from "next/link";

export default async function RegioesCaminho() {
  const res = await fetch(`${BASE_URL}/api/ambrosio/regioes`);
  const regioes: IRegioesCaminho[] = await res.json();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Regiões do caminho</CardTitle>
        <CardDescription>Regiões do caminho no Brasil</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          {regioes.map((r) => (
            <li key={r.id}>
              <Link href={"#"}>
                <Button variant={"link"}>{r.descricao}</Button>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
