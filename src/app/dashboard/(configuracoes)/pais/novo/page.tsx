import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import PaisForm from "@/components/custom/dashboard/pais/form-pais";
import { BASE_URL } from "@/lib/utils";

export default function NovoPaisPage() {
  return (
    <div>
      <PageSubtitle
        title="Cadastro de novo país"
        buttons={[
          {
            buttonText: "Voltar",
            buttonUrl: "/dashboard/pais",
            buttonShow: true,
            buttonVariant: "outline",
          },
        ]}
      />

      <PaisForm urlBase={BASE_URL} />
    </div>
  );
}
