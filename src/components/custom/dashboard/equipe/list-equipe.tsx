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
import { removerAcento } from "@/lib/utils";
import { FolderSearch } from "lucide-react";
import { Equipe } from "neocatecumenal";
import Link from "next/link";
import { useState } from "react";

type ListEquipeProps = {
  equipes: Equipe[];
};

export default function ListEquipe({ equipes }: ListEquipeProps) {
  const [search, setSearch] = useState("");

  const equipesFiltradas =
    search.length > 0
      ? equipes.filter((e) => {
          const nome = removerAcento(e.descricao).toLowerCase();
          const nomePesquisa = removerAcento(search).toLowerCase();
          return nome.includes(nomePesquisa);
        })
      : equipes;
  return (
    <div>
      <div className="flex items-center gap-2 max-w-lg mb-3">
        <Label className="flex items-center gap-2">
          <FolderSearch /> Pesquisa
        </Label>
        <Input
          placeholder="Digite a descrição da equipe ..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Table>
        <TableCaption>
          Ultimos cadastros - Equipes: {equipes.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Descrição da equipe</TableHead>
            <TableHead>Tipo de equipe</TableHead>
            <TableHead>Detalhes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipesFiltradas.slice(0, 10).map((equipe) => (
            <TableRow key={equipe.id}>
              <TableCell>
                <div className="font-semibold">{equipe.descricao}</div>
              </TableCell>
              <TableCell>{equipe.tipoEquipe.descricao}</TableCell>
              <TableCell>
                <Link href={`/dashboard/equipes/${equipe.id}`}>
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
