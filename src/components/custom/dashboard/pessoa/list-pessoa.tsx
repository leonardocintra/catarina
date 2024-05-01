"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IPessoa } from "@/interfaces/IPessoa";
import { ITipoCarisma } from "@/interfaces/ITipoCarisma";
import { removerAcento } from "@/lib/utils";
import { Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type ListPessoaProps = {
  pessoas: IPessoa[];
  tipoCarisma: ITipoCarisma[];
};

export default function ListPessoa({ pessoas, tipoCarisma }: ListPessoaProps) {
  const [search, setSearch] = useState("");

  const pessoasFiltradas =
    search.length > 0
      ? pessoas.filter((p) => {
          const nome = removerAcento(p.nome).toLowerCase();
          const nomePesquisa = removerAcento(search).toLowerCase();
          return nome.includes(nomePesquisa);
        })
      : pessoas;

  return (
    <div>
      <div className="flex items-center gap-2 max-w-md mb-3">
        <Label>Pesquisa</Label>
        <Input
          placeholder="Digite o nome da pessoa ..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="hidden sm:grid grid-cols-7 gap-3 mb-4">
        {tipoCarisma.map((tipo) => (
          <Card key={tipo.id} x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {tipo.descricao}
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {pessoas.filter((p) => p.tipoCarisma.id === tipo.id).length}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Table>
        <TableCaption>
          Ultimos cadastros - Pessoas: {pessoas.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Detalhes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pessoasFiltradas.slice(0, 10).map((pessoa) => (
            <TableRow key={pessoa.id}>
              <TableCell>#{pessoa.id}</TableCell>
              <TableCell>
                <div className="font-semibold">
                  {pessoa.nome}
                  <p className="text-xs font-light lowercase text-slate-700 italic">
                    {pessoa.tipoCarisma.descricao}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <Link href={`/dashboard/pessoas/${pessoa.id}`}>
                  <Button variant={"link"} size={"sm"}>
                    Ver detalhes
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
