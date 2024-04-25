import PessoaForm from "@/components/custom/dashboard/pessoa/form-pessoa";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BASE_URL } from "@/lib/utils";
import Link from "next/link";

export default function NovaPessoaPage() {
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-3xl pl-3">Cadastrar pessoas</h2>
        <Link href={"/dashboard/pessoas"}>
          <Button variant={"outline"}>Voltar</Button>
        </Link>
      </div>
      <Separator className="mb-3 mt-2" />

      <PessoaForm urlBase={BASE_URL} />
    </div>
  );
}
