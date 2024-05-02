import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import DioceseCard from "@/components/custom/dashboard/paroquias/diocese/diocese-card";
import LocalidadeCard from "@/components/custom/dashboard/paroquias/localidade/localidade-card";
import ParoquiaCard from "@/components/custom/dashboard/paroquias/paroquia/paroquia-card";

export default function ParoquiasPage() {
  return (
    <div className="">
      <PageSubtitle
        title="Paroquias"
        subTitle="Paroquias"
        buttonShow={false}
        buttonText=""
        buttonUrl=""
      />

      <div className="grid sm:grid-cols-3 gap-2">
        <DioceseCard />

        <LocalidadeCard />

        <ParoquiaCard />
      </div>
    </div>
  );
}
