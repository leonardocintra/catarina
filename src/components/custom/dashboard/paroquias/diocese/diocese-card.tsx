import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IDiocese } from "@/interfaces/IDiocese";
import { BASE_URL } from "@/lib/utils";
import Link from "next/link";

export default async function DioceseCard() {
  const getDioceses = async () => {
    const res = await fetch(`${BASE_URL}/api/ambrosio/configuracoes/diocese`, {
      next: {
        revalidate: 5,
      },
    });
    return res.json();
  };
  const data = await getDioceses();
  const dioceses: IDiocese[] = data.data;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Diocese</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Configuração e edição de dioceses do Caminho Neocatecumenal
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={"/dashboard/paroquias/novo/diocese"}>
          <Button>Nova diocese</Button>
        </Link>
      </CardContent>
      <CardFooter>
        <Table>
          <TableCaption>Lista de dioceses. {dioceses.length}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dioceses.map((diocese) => (
              <TableRow key={diocese.id}>
                <TableCell className="font-medium">
                  {diocese.descricao}
                </TableCell>
                <TableCell>{diocese.tipoDiocese.descricao}</TableCell>
                <TableCell>
                  <Link
                    href={`/dashboard/paroquias/editar/diocese/${diocese.id}`}
                  >
                    <Button variant={"link"}>Editar</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardFooter>
    </Card>
  );
}
