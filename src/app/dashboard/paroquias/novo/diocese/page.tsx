import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import DioceseForm from "@/components/custom/dashboard/paroquias/diocese/form-diocese";
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
import { BASE_URL } from "@/lib/utils";

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

      <DioceseForm urlBase={BASE_URL} />
    </div>
  );
}
