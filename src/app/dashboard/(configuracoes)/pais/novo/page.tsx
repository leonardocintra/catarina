import PageSubtitle from "@/components/custom/dashboard/page-subtitle";

export default function NovoPaisPage() {
  return (
    <div>
      <PageSubtitle
        title="Cadatro de novo pais"
        buttonShow={true}
        buttonText="Voltar"
        buttonUrl="/dashboard/pais"
        buttonVariant="outline"
      />
    </div>
  );
}
