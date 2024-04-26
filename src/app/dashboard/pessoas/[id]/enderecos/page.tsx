"use client";

import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import EnderecoForm from "@/components/custom/dashboard/pessoa/form-endereco";
import { useParams } from "next/navigation";

export default function PessoaEnderecoPage() {
  const params = useParams();
  const pessoaId = params.id;

  return (
    <div>
      <PageSubtitle
        title="Adicionar endereço"
        buttonShow={false}
        buttonUrl=""
        buttonText=""
      />

      <EnderecoForm />
    </div>
  );
}
