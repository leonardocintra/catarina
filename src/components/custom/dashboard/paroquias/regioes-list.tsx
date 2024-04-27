import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IRegioesCaminho } from "@/interfaces/IRegioesCaminho";
import Link from "next/link";

type RegioesCaminhoProps = {
  baseUrl: string;
};

export default async function RegioesCaminho({ baseUrl }: RegioesCaminhoProps) {
  const res = await fetch(`${baseUrl}/api/ambrosio/regioes`);
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
