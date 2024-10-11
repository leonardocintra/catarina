import ListDioceses from "@/components/custom/dashboard/diocese/list-dioceses";
import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import { IDiocese } from "@/interfaces/IDiocese";
import { BASE_URL } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DiocesesPage() {
  const getDioceses = async () => {
    const res = await fetch(`${BASE_URL}/api/ambrosio/configuracoes/diocese`, {
      next: {
        revalidate: 5,
      },
    });
    return res.json();
  };
  const data = await getDioceses();
  const dioceses: IDiocese[] = data.data;

  return (
    <div className="">
      <PageSubtitle
        title={`Dioceses - ${dioceses?.length}`}
        subTitle="do Brasil"
        buttonShow={true}
        buttonText="Cadastrar"
        buttonUrl="/dashboard/dioceses/novo"
      />

      <ListDioceses dioceses={dioceses} />
    </div>
  );
}
