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
import { CheckIcon, FolderSearch } from "lucide-react";
import { Pessoa } from "neocatecumenal";
import Link from "next/link";
import { useState, useMemo } from "react";


type ListPessoaProps = {
  pessoas: Pessoa[];
};

export default function ListPessoa({ pessoas }: ListPessoaProps) {
  const [search, setSearch] = useState("");

  const normalizedSearch = useMemo(
    () => removerAcento(search).toLowerCase().trim(),
    [search]
  );

  const pessoasFiltradas = useMemo(() => {
    if (!normalizedSearch) {
      return pessoas;
    }

    return pessoas.filter((p) => {
      const nome = removerAcento(p.nome).toLowerCase();
      return nome.includes(normalizedSearch);
    });
  }, [pessoas, normalizedSearch]);

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
      {search.length > 0 && (
        <div className="mb-2 text-sm text-muted-foreground">
          Resultados para: <strong>{search}</strong> ({pessoasFiltradas.length}{" "}
          {pessoasFiltradas.length === 1 ? "registro" : "registros"})
        </div>
      )}

      <Table>
        <TableCaption>
          Ultimos cadastros - Pessoas: {pessoas.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Situação Religiosa</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Detalhes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pessoasFiltradas.slice(0, 10).map((pessoa) => (
            <TableRow key={pessoa.id}>
              <TableCell>
                <div className="font-semibold">{pessoa.nome}</div>
                <div className="font-extralight italic">
                  {pessoa.conhecidoPor}
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground uppercase font-light">
                {pessoa.situacaoReligiosa.descricao}
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
