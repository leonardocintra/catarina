import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import Link from "next/link";

export default function NovaParoquiaPage() {
  return (
    <div>
      <PageSubtitle
        title="Cadastro de nova paroquia"
        buttonShow={true}
        buttonText="Voltar"
        buttonUrl="/dashboard/paroquias"
        buttonVariant="outline"
      />

      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Atenção!</AlertTitle>
        <AlertDescription>
          Para cadastrar uma paróquia você precisa ir na pagina de{" "}
          <Link
            className="font-semibold underline"
            href={"/dashboard/dioceses"}
          >
            diocese
          </Link>
        </AlertDescription>
      </Alert>
    </div>
  );
}
