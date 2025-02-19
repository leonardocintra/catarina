import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import ListPaises from "@/components/custom/dashboard/pais/list-pais";
import { IPais } from "@/interfaces/IPais";
import { BASE_URL } from "@/lib/utils";

export default async function PaisPage() {
  const getPaises = async () => {
    const res = await fetch(`${BASE_URL}/api/ambrosio/configuracoes/pais`, {
      next: {
        revalidate: 1,
      },
    });
    return res.json();
  };
  const data = await getPaises();
  const paises: IPais[] = data.data;

  return (
    <div>
      <PageSubtitle
        title={`Paises - ${paises?.length}`}
        subTitle="do Caminho"
        buttonShow={true}
        buttonText="Cadastrar"
        buttonUrl="/dashboard/pais/novo"
      />

      <ListPaises paises={paises} />
    </div>
  );
}
