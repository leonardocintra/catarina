import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="">
      <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-3">
          <CardTitle>CNC - Gestão</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            Bem vindo [NOME_LOGIN]!
            <br />
            Aqui você consegue administrar dados dos catecúmenos
            <br />
            Data: {new Date().getDate()}/{new Date().getMonth()}/
            {new Date().getFullYear()}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href={"/dashboard/pessoas"}>
            <Button>Ir para pessoas</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
