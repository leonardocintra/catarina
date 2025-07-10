import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import PaisForm from "@/components/custom/dashboard/pais/form-pais";
import { BASE_URL } from "@/lib/utils";

export default function NovoPaisPage() {
  return (
    <div>
      <PageSubtitle
        title="Cadastro de novo país"
        buttonShow={true}
        buttonText="Voltar"
        buttonUrl="/dashboard/pais"
        buttonVariant="outline"
      />

      <PaisForm urlBase={BASE_URL} />
    </div>
  );
}
