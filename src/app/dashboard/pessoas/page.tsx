import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import ListPessoa from "@/components/custom/dashboard/pessoa/list-pessoa";
import { IPessoa } from "@/interfaces/IPessoa";
import { BASE_URL } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ComunidadePage() {
  const getPessoas = async () => {
    const res = await fetch(`${BASE_URL}/api/ambrosio/pessoa`, {
      next: {
        revalidate: 5,
      },
    });
    return res.json();
  };
  const data = await getPessoas();

  const pessoas: IPessoa[] = data.data;

  return (
    <div className="">
      <PageSubtitle
        title={`Pessoas - ${pessoas?.length}`}
        buttonShow={true}
        buttonText="Cadastrar"
        buttonUrl="/dashboard/pessoas/novo"
      />

      <ListPessoa pessoas={pessoas} />
    </div>
  );
}
