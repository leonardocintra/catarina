"use client";

import { useEffect, useState } from "react";
import ListLocalidades from "@/components/custom/dashboard/localidade/list-localidades";
import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import { ILocalidade } from "@/interfaces/ILocalidade";
import { BASE_URL } from "@/lib/utils";

export default function LocalidadePage() {
  const [localidades, setLocalidades] = useState<ILocalidade[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${BASE_URL}/api/ambrosio/configuracoes/localidade`
      );
      const data = await res.json();
      setLocalidades(data.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <PageSubtitle
        title={`Localidades - ${localidades.length}`}
        subTitle="do Brasil"
        buttonShow={false}
        buttonText="Cadastrar"
        buttonUrl="/dashboard/localidade/novo"
      />
      
      <ListLocalidades localidades={localidades} />
    </div>
  );
}
