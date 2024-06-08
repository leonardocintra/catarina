"use client";

import { Button } from "@/components/ui/button";
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
import { removerAcento } from "@/lib/utils";
import { CheckIcon, FolderSearch } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type ListPessoaProps = {
  pessoas: IPessoa[];
};

export default function ListPessoa({ pessoas }: ListPessoaProps) {
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
      <div className="flex items-center gap-2 max-w-lg mb-3">
        <Label className="flex items-center gap-2">
          <FolderSearch /> Pesquisa
        </Label>
        <Input
          placeholder="Digite o nome da pessoa ..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Table>
        <TableCaption>
          Ultimos cadastros - Pessoas: {pessoas.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Detalhes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pessoasFiltradas.slice(0, 10).map((pessoa) => (
            <TableRow key={pessoa.id}>
              <TableCell>#{pessoa.id}</TableCell>
              <TableCell className="text-slate-600 uppercase font-light">
                {pessoa.tipoPessoa.descricao}
              </TableCell>
              <TableCell>
                <div className="font-semibold">{pessoa.nome}</div>
              </TableCell>
              <TableCell>
                <CheckIcon />
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
