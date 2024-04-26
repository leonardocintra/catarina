import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import PessoaForm from "@/components/custom/dashboard/pessoa/form-pessoa";
import { BASE_URL } from "@/lib/utils";

export default function NovaPessoaPage() {
  return (
    <div>
      <PageSubtitle
        title="Cadatro de nova pessoa"
        buttonShow={true}
        buttonText="Voltar"
        buttonUrl="/dashboard/pessoas"
        buttonVariant="outline"
      />

      <PessoaForm urlBase={BASE_URL} />
    </div>
  );
}
