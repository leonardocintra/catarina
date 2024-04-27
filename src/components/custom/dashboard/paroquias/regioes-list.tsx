"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IRegioesCaminho } from "@/interfaces/IRegioesCaminho";
import { useEffect, useState } from "react";

type RegioesCaminhoProps = {
  baseUrl: string;
};

export default function RegioesCaminho({ baseUrl }: RegioesCaminhoProps) {
  const [regioes, setRegioes] = useState<IRegioesCaminho[]>();

  useEffect(() => {
    const fetchData = async () => {
      async function getRegioes() {
        const res = await fetch(`${baseUrl}/api/ambrosio/regioes`);
        return res.json();
      }

      const data = await getRegioes();

      setRegioes(data);
    };

    fetchData();
  }, [baseUrl]);

  console.log("cade as regioes ?");

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
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="link">{r.descricao}</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clicou em {r.descricao}</AlertDialogTitle>
                    <AlertDialogDescription>
                      Verificar com Orley o que vamos mostrar de informações se
                      o usuario clicar aqui
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction>Continuar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
