"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
              {r.macroRegiao && <Badge>Macro Região</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
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
