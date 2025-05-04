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
import { Paroquia } from "neocatecumenal";
import Link from "next/link";
import { useState } from "react";

type ListParoquiasProps = {
  paroquias: Paroquia[];
};

export default function ListParoquias({ paroquias }: ListParoquiasProps) {
  const [search, setSearch] = useState("");

  const diocesesFiltradas =
    search.length > 0
      ? paroquias.filter((d) => {
          const nome = removerAcento(d.descricao).toLowerCase();
          const nomePesquisa = removerAcento(search).toLowerCase();
          return nome.includes(nomePesquisa);
        })
      : paroquias;

  return (
    <div>
      <div className="flex items-center gap-2 max-w-lg mb-3">
        <Label className="flex items-center gap-2">
          <FolderSearch /> Pesquisa
        </Label>
        <Input
          placeholder="Digite o nome da paroquia ..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Table>
        <TableCaption>
          Ultimos cadastros - Paroquias: {paroquias.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Paroquia</TableHead>
            <TableHead>Diocese</TableHead>
            <TableHead>Cidade / UF </TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {diocesesFiltradas.slice(0, 40).map((paroquia) => (
            <TableRow key={paroquia.id}>
              <TableCell>#{paroquia.id}</TableCell>
              <TableCell className="">{paroquia.descricao}</TableCell>
              <TableCell className="">{paroquia.diocese.descricao}</TableCell>
              <TableCell className="flex space-x-2">
                {paroquia.endereco.cidade.nome} {" / "}
                {paroquia.endereco.cidade.estado.sigla}
              </TableCell>
              <TableCell>
                <Link href={`/dashboard/paroquias/${paroquia.id}`}>
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
