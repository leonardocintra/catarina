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
import { ArrowUpRightIcon, FolderSearch } from "lucide-react";
import { Comunidade } from "neocatecumenal";
import Link from "next/link";
import { useState } from "react";

type ListComunidadeProps = {
  comunidades: Comunidade[];
};

export default function ListComunidade({ comunidades }: ListComunidadeProps) {
  const [search, setSearch] = useState("");

  const comunidadesFiltradasPorParoquia =
    search.length > 0
      ? comunidades.filter((c) => {
          const nome = removerAcento(c.paroquia.descricao).toLowerCase();
          const nomePesquisa = removerAcento(search).toLowerCase();
          return nome.includes(nomePesquisa);
        })
      : comunidades;

  return (
    <div>
      <div className="flex items-center gap-2 max-w-lg mb-3">
        <Label className="flex items-center gap-2">
          <FolderSearch /> Pesquisa
        </Label>
        <Input
          placeholder="Digite a descrição da paróquia ..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Table>
        <TableCaption>
          Ultimos cadastros - Comunidades: {comunidades.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Numero</TableHead>
            <TableHead>Irmãos</TableHead>
            <TableHead>Paroquia</TableHead>
            <TableHead>Detalhes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {comunidadesFiltradasPorParoquia.slice(0, 10).map((comunidade) => (
            <TableRow key={comunidade.id}>
              <TableCell className="text-muted-foreground font-light">
                {comunidade.numeroDaComunidade}
              </TableCell>
              <TableCell>{comunidade.quantidadeMembros} irmãos</TableCell>
              <TableCell>
                <Link href={`/dashboard/paroquias/${comunidade.paroquia.id}`}>
                  <Button variant={"ghost"} size={"sm"}>
                    {comunidade.paroquia.descricao}
                    <ArrowUpRightIcon />
                  </Button>
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/dashboard/comunidades/${comunidade.id}`}>
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
