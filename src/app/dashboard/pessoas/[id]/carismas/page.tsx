"use client";

import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import { Button } from "@/components/ui/button";
import { IPessoa } from "@/interfaces/IPessoa";
import { ITipoCarisma } from "@/interfaces/ITIpoCarisma";
import { BASE_URL } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PessoaCarismaPage() {
  const params = useParams();
  const router = useRouter();
  const pessoaId = params.id;

  const [pessoa, setPessoa] = useState<IPessoa>();
  const [tiposCarisma, setTiposCarisma] = useState<ITipoCarisma[]>([]);
  const [selectedCarismas, setSelectedCarismas] = useState<number[]>([]);
  const [redirectNotFound, setRedirectNotFound] = useState<boolean>(false);

  const toggleCarisma = (id: number) => {
    setSelectedCarismas((prev: any) =>
      prev.includes(id)
        ? prev.filter((item: any) => item !== id)
        : [...prev, id]
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      async function getCarismas() {
        const res = await fetch(
          `${BASE_URL}/api/ambrosio/configuracoes/tipoCarisma`
        );
        return res.json();
      }

      async function getPessoa() {
        const res = await fetch(`${BASE_URL}/api/ambrosio/pessoa/${pessoaId}`);

        if (res.status === 404) {
          setRedirectNotFound(true);
        }

        return res.json();
      }

      try {
        const [resCarismas, resPessoa] = await Promise.all([
          getCarismas(),
          getPessoa(),
        ]);
        setTiposCarisma(resCarismas);
        setPessoa(resPessoa);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchData();
  }, [pessoaId]);

  if (redirectNotFound) {
    router.push("/dashboard/pessoas");
  }

  if (!tiposCarisma || !pessoa) {
    return (
      <div>
        <h2>Carregando ...</h2>
      </div>
    );
  }

  const salvar = async () => {
    if (selectedCarismas.length === 0) {
      alert("Selecione pelo menos um carisma");
      return;
    }

    selectedCarismas.map(async (carismaId) => {
      console.log(carismaId);
      await fetch(`${BASE_URL}/api/ambrosio/pessoa/carismas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pessoaId: pessoa.id,
          tipoCarismaId: carismaId,
        }),
      });
    });

    console.log("finalizado");
  };

  return (
    <div>
      <PageSubtitle
        title={`Adicionar carisma de ${pessoa.nome}`}
        buttonShow={true}
        buttonUrl={`/dashboard/pessoas/${pessoa.id}`}
        buttonText="Voltar"
      />

      <div className="p-4 flex flex-col max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Selecione os Carismas</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tiposCarisma.map((tipo) => (
            <div
              key={tipo.id}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedCarismas.includes(tipo.id)
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => toggleCarisma(tipo.id)}
            >
              <div className="mr-2">
                <CheckIcon />
              </div>
              <span>{tipo.descricao}</span>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button onClick={() => salvar()} variant="default">
            Confirmar carismas
          </Button>
        </div>
      </div>
    </div>
  );
}
