import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LocalidadePage() {
  return (
    <div>
      <PageSubtitle
        buttonShow={true}
        buttonText="Voltar"
        buttonUrl="/dashboard/paroquias"
        subTitle="Nova localidade"
        title="Cadastro de localidade"
      />
      <Card>
        <CardHeader>
          <CardTitle>Nova paroquia</CardTitle>
          <CardDescription>Informe todos os dados necessários</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Input placeholder="Paroquia" />
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Salvar</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
