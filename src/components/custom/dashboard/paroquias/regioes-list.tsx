"use client";

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
import { useEffect, useState } from "react";

type RegioesCaminhoProps = {
  baseUrl: string;
};

export default function RegioesCaminho({ baseUrl }: RegioesCaminhoProps) {
  const [regioes, setRegioes] = useState<IRegioesCaminho[]>();

  useEffect(() => {
    fetch(`${baseUrl}/api/ambrosio/regioes`)
      .then((res) => res.json())
      .then((regioes) => setRegioes(regioes));
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Regiões do caminho</CardTitle>
        <CardDescription>Regiões do caminho no Brasil</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          {regioes?.map((r) => (
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
