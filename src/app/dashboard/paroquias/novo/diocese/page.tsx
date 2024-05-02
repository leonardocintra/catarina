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

export default function DiocesePage() {
  return (
    <div>
      <PageSubtitle
        buttonShow={true}
        buttonText="Voltar"
        buttonUrl="/dashboard/paroquias"
        subTitle="Nova diocese"
        title="Cadastro de diocese"
      />
      <Card>
        <CardHeader>
          <CardTitle>Nova diocese</CardTitle>
          <CardDescription>
            De preferencia informe o nome e a cidade. Ex: Catedral Sé (Franca)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Input placeholder="Diocese / Cidade" />
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Salvar</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
