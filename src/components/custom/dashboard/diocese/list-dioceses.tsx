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
import { Diocese } from "neocatecumenal";
import Link from "next/link";
import { useState } from "react";

type ListDiocesesProps = {
  dioceses: Diocese[];
};

export default function ListDioceses({ dioceses }: ListDiocesesProps) {
  const [search, setSearch] = useState("");

  const diocesesFiltradas =
    search.length > 0
      ? dioceses.filter((d) => {
          const nome = removerAcento(d.descricao).toLowerCase();
          const nomePesquisa = removerAcento(search).toLowerCase();
          return nome.includes(nomePesquisa);
        })
      : dioceses;

  return (
    <div>
      <div className="flex items-center gap-2 max-w-lg mb-3">
        <Label className="flex items-center gap-2">
          <FolderSearch /> Pesquisa
        </Label>
        <Input
          placeholder="Digite o nome da diocese ..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Table>
        <TableCaption>
          Ultimos cadastros - Dioceses: {dioceses.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Nome | Cidade</TableHead>
            <TableHead>Macro Região</TableHead>
            <TableHead>Setor</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {diocesesFiltradas.slice(0, 10).map((diocese) => (
            <TableRow key={diocese.id}>
              <TableCell>#{diocese.id}</TableCell>
              <TableCell className="text-slate-600 uppercase font-light">
                {diocese.tipoDiocese.descricao}
              </TableCell>
              <TableCell className="flex space-x-2">
                <div className="font-semibold">{diocese.descricao}</div>
                <div className="font-light text-slate-800 italic">
                  {diocese.endereco.cidade.nome} -{" "}
                  {diocese.endereco.cidade.estado.sigla}
                </div>
              </TableCell>
              <TableCell>{diocese.setor.macroRegiao.descricao}</TableCell>
              <TableCell>{diocese.setor.descricao}</TableCell>
              <TableCell>
                <Link href={`/dashboard/dioceses/${diocese.id}`}>
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
