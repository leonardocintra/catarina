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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IRegioesCaminho } from "@/interfaces/IRegioesCaminho";
import { Globe } from "lucide-react";
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
      setRegioes(data.data);
    };

    fetchData();
  }, [baseUrl]);

  return (
    <div className="grid grid-cols-3 gap-2">
      {regioes?.map((r) => (
        <Card key={r.id}>
          <CardHeader>
            <CardTitle className="flex space-x-2 justify-center">
              <h2 className="hover:underline">{r.descricao}</h2>
            </CardTitle>
            <CardDescription>
              {r.macroRegiao ? "Macro-região" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Equipe</TableHead>
                  <TableHead>Dioceses</TableHead>
                  <TableHead>Paroquias</TableHead>
                  <TableHead>Comunidade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Portinari I</TableCell>
                  <TableCell>233</TableCell>
                  <TableCell>12</TableCell>
                  <TableCell>12</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Portinari II</TableCell>
                  <TableCell>233</TableCell>
                  <TableCell>12</TableCell>
                  <TableCell>12</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Anhaguera II</TableCell>
                  <TableCell>233</TableCell>
                  <TableCell>12</TableCell>
                  <TableCell>12</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
