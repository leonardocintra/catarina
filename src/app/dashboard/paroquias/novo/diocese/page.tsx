import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import DioceseForm from "@/components/custom/dashboard/diocese/form-diocese";
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
