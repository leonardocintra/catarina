import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

type AlertSemCadastroOuPermissaoProps = {
  title: string;
};

export default function AlertSemCadastroOuPermissao({
  title,
}: AlertSemCadastroOuPermissaoProps) {
  return (
    <Alert variant={"destructive"}>
      <Terminal />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        Não possui cadastro ou você não tem permissão para visualizar esses
        dados
      </AlertDescription>
    </Alert>
  );
}
