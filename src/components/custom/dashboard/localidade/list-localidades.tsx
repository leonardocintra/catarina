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
import { ILocalidade } from "@/interfaces/ILocalidade";
import { removerAcento } from "@/lib/utils";
import { FolderSearch } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type ListLocalidadeProps = {
  localidades: ILocalidade[];
};

export default function ListLocalidades({ localidades }: ListLocalidadeProps) {
  const [search, setSearch] = useState("");

  const localidadesFiltradas =
    search.length > 0
      ? localidades.filter((loc) => {
          const nome = removerAcento(loc.descricao as string).toLowerCase();
          const nomePesquisa = removerAcento(search).toLowerCase();
          return nome.includes(nomePesquisa);
        })
      : localidades;

  return (
    <div>
      <div className="flex items-center gap-2 max-w-lg mb-3">
        <Label className="flex items-center gap-2">
          <FolderSearch /> Pesquisa
        </Label>
        <Input
          placeholder="Digite o nome da localidade ..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Table>
        <TableCaption>
          Ultimos cadastros - Localidades: {localidades.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {localidadesFiltradas.slice(0, 10).map((localidade) => (
            <TableRow key={localidade.id}>
              <TableCell>#{localidade.id}</TableCell>
              <TableCell className="text-slate-600 uppercase font-light">
                {localidade.tipoLocalidade?.descricao}
              </TableCell>
              <TableCell>
                <div className="font-semibold">{localidade.descricao}</div>
              </TableCell>
              <TableCell>
                <Link href={`/dashboard/localidade/${localidade.id}`}>
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
