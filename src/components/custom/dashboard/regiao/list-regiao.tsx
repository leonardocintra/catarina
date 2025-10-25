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
import { Regiao } from "neocatecumenal";
import { useState } from "react";

type ListRegiaoProps = {
  regioes: Regiao[];
};

export default function ListRegiao({ regioes }: ListRegiaoProps) {
  const [search, setSearch] = useState("");

  const regioesFiltradas =
    search.length > 0
      ? regioes.filter((regiao) => {
          const nome = removerAcento(regiao.descricao as string).toLowerCase();
          const nomePesquisa = removerAcento(search).toLowerCase();
          return nome.includes(nomePesquisa);
        })
      : regioes;

  return (
    <div>
      <div className="flex items-center gap-2 max-w-lg mb-3">
        <Label className="flex items-center gap-2">
          <FolderSearch /> Pesquisa
        </Label>
        <Input
          placeholder="Digite o nome do setor ..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Table>
        <TableCaption>
          Ultimos cadastros - Regiões: {regioes.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Macro Região</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {regioesFiltradas.slice(0, 10).map((regiao) => (
            <TableRow key={regiao.id}>
              <TableCell>#{regiao.id}</TableCell>
              <TableCell>
                <div className="font-semibold">{regiao.descricao}</div>
              </TableCell>
              <TableCell className="text-slate-600 uppercase font-light">
                {regiao.macroRegiao.descricao}
              </TableCell>
              <TableCell>Nenhuma ação</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
