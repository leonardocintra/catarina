import PageSubtitle from "@/components/custom/dashboard/page-subtitle";

export default function ParoquiasPage() {
  return (
    <div>
      <PageSubtitle
        title={`Paroquias - 0`}
        subTitle="do Brasil"
        buttonShow={true}
        buttonText="Cadastrar"
        buttonUrl="/dashboard/paroquias/novo"
      />
    </div>
  );
}
