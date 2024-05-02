import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

export default function ParoquiaCard() {
  return (
    <Card className="" x-chunk="dashboard-05-chunk-0">
      <CardHeader className="pb-3">
        <CardTitle>Paroquia</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Configuração e edição de paroquias do Caminho Neocatecumenal
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Link href={"/dashboard/paroquias/novo/paroquia"}>
          <Button>Nova paroquia</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
