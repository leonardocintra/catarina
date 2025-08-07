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
        buttonUrl="/dashboard/localidade"
        subTitle="Nova localidade"
        title="Cadastro de localidade"
      />
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Nova localidade</CardTitle>
          <CardDescription>Informe todos os dados necessários</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Input placeholder="Localidade" />
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Salvar</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
