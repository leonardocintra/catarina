import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
import { BASE_URL } from "@/lib/utils";
import Link from "next/link";

export default async function ComunidadePage() {
  const getPessoas = async () => {
    const res = await fetch(`${BASE_URL}/api/ambrosio/pessoa`, {
      next: {
        revalidate: 5,
      },
    });
    return res.json();
  };
  const data = await getPessoas();

  const pessoas: IPessoa[] = data.data;

  return (
    <div className="">
      <div>
        <div className="flex justify-between">
          <h2 className="text-3xl pl-3">Pessoas - {pessoas.length}</h2>
          <Link href={"/dashboard/pessoas/novo"}>
            <Button>Cadastrar</Button>
          </Link>
        </div>
        <Separator className="mb-3 mt-2" />
      </div>

      <Table>
        <TableCaption>
          Ultimos cadatros - Pessoas: {pessoas.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Carisma</TableHead>
            <TableHead>Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pessoas.map((pessoa) => (
            <TableRow key={pessoa.id}>
              <TableCell>#{pessoa.id}</TableCell>
              <TableCell className="font-bold">{pessoa.nome}</TableCell>
              <TableCell>{pessoa.tipoCarisma.descricao}</TableCell>
              <TableCell>
                <Button variant={"link"} size={"sm"}>
                  Editar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
