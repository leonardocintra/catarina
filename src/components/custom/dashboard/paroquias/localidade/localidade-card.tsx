import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

export default function LocalidadeCard() {
  return (
    <Card className="" x-chunk="dashboard-05-chunk-0">
      <CardHeader className="pb-3">
        <CardTitle>Localidade</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Configuração e edição de paroquias do Caminho Neocatecumenal
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Link href={"/dashboard/paroquias/novo/localidade"}>
          <Button>Nova Localidade</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
