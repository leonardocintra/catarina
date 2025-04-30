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
import { Cidade } from "neocatecumenal";
import { useState } from "react";

type ListCidadesProps = {
  cidades: Cidade[];
};

export default function ListCidades({ cidades }: ListCidadesProps) {
  const [search, setSearch] = useState("");

  const cidadesFiltradas =
    search.length > 0
      ? cidades.filter((c) => {
          const nome = removerAcento(c.nome).toLowerCase();
          const nomePesquisa = removerAcento(search).toLowerCase();
          return nome.includes(nomePesquisa);
        })
      : cidades;

  return (
    <div>
      <div className="flex items-center gap-2 max-w-lg mb-3">
        <Label className="flex items-center gap-2">
          <FolderSearch /> Pesquisa
        </Label>
        <Input
          placeholder="Digite o nome da cidade ..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Table>
        <TableCaption>
          Ultimos cadastros - Cidades: {cidades.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Pais</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cidadesFiltradas.slice(0, 50).map((cidade) => (
            <TableRow key={cidade.id}>
              <TableCell>#{cidade.id}</TableCell>
              <TableCell className="text-slate-500 uppercase font-semibold">
                {cidade.nome}
              </TableCell>
              <TableCell>
                <div className="font-light">
                  {cidade.estado.sigla} - {cidade.estado.nome}
                </div>
              </TableCell>
              <TableCell>{cidade.estado.pais.nome}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
