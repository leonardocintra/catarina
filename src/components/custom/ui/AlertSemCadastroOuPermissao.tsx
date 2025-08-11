import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, FileWarningIcon, Terminal } from "lucide-react";

type AlertSemPermissaoProps = {
  title: string;
};

export default function UnauthorizedAccessAlert({
  title,
}: AlertSemPermissaoProps) {
  return (
    <div className="mx-auto max-w-lg mt-8">
      <Alert variant={"destructive"}>
        <FileWarningIcon />
        <AlertTitle>Pagina de {title}</AlertTitle>
        <AlertDescription>
          Você não possui permissão para acessar/visualizar esta página
        </AlertDescription>
      </Alert>
    </div>
  );
}
