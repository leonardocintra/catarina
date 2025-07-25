import DioceseForm from "@/components/custom/dashboard/diocese/form-diocese";
import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import { BASE_URL } from "@/lib/utils";

export default function NovaDiocesePage() {
  return (
    <div>
      <PageSubtitle
        title="Cadastro de nova diocese"
        buttonShow={true}
        buttonText="Voltar"
        buttonUrl="/dashboard/dioceses"
        buttonVariant="outline"
      />

      <DioceseForm urlBase={BASE_URL} />
    </div>
  );
}
