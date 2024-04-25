import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { ITipoCarisma } from "@/interfaces/ITipoCarisma";
import { BASE_URL } from "@/lib/utils";
import { Users } from "lucide-react";
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

  const getTipoCarisma = async () => {
    const res = await fetch(
      `${BASE_URL}/api/ambrosio/configuracoes/tipoCarisma`,
      {
        next: {
          revalidate: 600,
        },
      }
    );
    return res.json();
  };
  const dataTipoCarisma = await getTipoCarisma();

  const pessoas: IPessoa[] = data.data;
  const tipoCarisma: ITipoCarisma[] = dataTipoCarisma.data;

  return (
    <div className="">
      <div>
        <div className="flex justify-between">
          <h2 className="text-3xl pl-3">Pessoas - {pessoas?.length}</h2>
          <Link href={"/dashboard/pessoas/novo"}>
            <Button>Cadastrar</Button>
          </Link>
        </div>
        <Separator className="mb-3 mt-2" />
      </div>

      <div className="hidden sm:grid grid-cols-7 gap-3 mb-4">
        {tipoCarisma.map((tipo) => (
          <Card key={tipo.id} x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {tipo.descricao}
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {pessoas.filter((p) => p.tipoCarisma.id === tipo.id).length}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Table>
        <TableCaption>
          Ultimos cadatros - Pessoas: {pessoas?.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pessoas?.map((pessoa) => (
            <TableRow key={pessoa.id}>
              <TableCell>#{pessoa.id}</TableCell>
              <TableCell>
                <div className="font-semibold">
                  {pessoa.nome}
                  <p className="text-xs font-light lowercase text-slate-700 italic">{pessoa.tipoCarisma.descricao}</p>
                </div>
              </TableCell>
              <TableCell>
                <Link href={`/dashboard/pessoas/${pessoa.id}`}>
                  <Button variant={"link"} size={"sm"}>
                    Editar
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
