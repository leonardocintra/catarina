"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { FolderSearch } from "lucide-react";
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
      <div className="flex items-center gap-2 max-w-lg mb-3">
        <Label className="flex items-center gap-2">
          <FolderSearch /> Pesquisa
        </Label>
        <Input
          placeholder="Digite o nome da pessoa ..."
          onChange={(e) => setSearch(e.target.value)}
        />
        {showDialogVisaoGeralCarisma()}
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

  function showDialogVisaoGeralCarisma() {
    return (
      <div className="flex items-center justify-center p-2 rounded-lg border border-slate-700 min-w-32">
        <Dialog>
          <DialogTrigger>Visão Geral</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Visão geral dos carismas</DialogTitle>
              <DialogDescription>
                <Table>
                  <TableCaption>Carismas</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="">Carisma</TableHead>
                      <TableHead>Descrição</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tipoCarisma.map((tipo) => (
                      <TableRow key={tipo.id}>
                        <TableCell className="font-medium">
                          {tipo.descricao}
                        </TableCell>
                        <TableCell>
                          {
                            pessoas.filter((p) => p.tipoCarisma.id === tipo.id)
                              .length
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
