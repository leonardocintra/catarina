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
import { IPais } from "@/interfaces/IPais";
import { removerAcento } from "@/lib/utils";
import { FolderSearch } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type ListPaisesProps = {
  paises: IPais[];
};

export default function ListPaises({ paises }: ListPaisesProps) {
  const [search, setSearch] = useState("");

  const diocesesFiltradas =
    search.length > 0
      ? paises.filter((p) => {
          const nome = removerAcento(p.nome).toLowerCase();
          const nomePesquisa = removerAcento(search).toLowerCase();
          return nome.includes(nomePesquisa);
        })
      : paises;

  return (
    <div>
      <div className="flex items-center gap-2 max-w-lg mb-3">
        <Label className="flex items-center gap-2">
          <FolderSearch /> Pesquisa
        </Label>
        <Input
          placeholder="Digite o nome do pais ..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Table>
        <TableCaption>Ultimos cadastros - Paises: {paises.length}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Região</TableHead>
            <TableHead>Subregião</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {diocesesFiltradas.slice(0, 10).map((pais) => (
            <TableRow key={pais.id}>
              <TableCell>#{pais.id}</TableCell>
              <TableCell className="text-slate-500 uppercase font-semibold">
                {pais.nome}
              </TableCell>
              <TableCell>
                <div className="font-light">{pais.regiao}</div>
              </TableCell>
              <TableCell>{pais.subRegiao}</TableCell>
              <TableCell>
                <Link href={`/dashboard/pais/${pais.id}`}>
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
