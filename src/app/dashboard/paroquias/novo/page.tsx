"use client";

import { useRouter, useSearchParams } from "next/navigation";
import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Diocese } from "neocatecumenal";
import ParoquiaForm from "@/components/custom/dashboard/paroquias/form-paroquia";

export default function NovaParoquiaPage() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dioceseId = searchParams.get("dioceseId");
  const [redirectNotFound, setRedirectNotFound] = useState<boolean>(false);
  const [diocese, setDiocese] = useState<Diocese>();

  useEffect(() => {
    const fetchData = async () => {
      if (!dioceseId) {
        return;
      }

      async function getDiocese() {
        const res = await fetch(
          `${BASE_URL}/api/ambrosio/diocese/${dioceseId}`
        );

        if (res.status === 404) {
          // TODO: esta dando erro no console log quando usa esse toast
          toast({
            title: `Diocese não encontrada`,
            variant: "destructive",
            description: `Diocese não encontrada. Tente novamente`,
          });
          setRedirectNotFound(true);
        }

        if (res.status === 401) {
          // TODO: esta dando erro no console log quando usa esse toast
          toast({
            title: `Sem permissão`,
            variant: "destructive",
            description: `Você não tem permissão para ver essa diocese`,
          });
          setRedirectNotFound(true);
        }

        return res.json();
      }

      try {
        const [resDiocese] = await Promise.all([getDiocese()]);
        setDiocese(resDiocese);
      } catch (error: any) {
        toast({
          title: `Erro ao buscar diocese`,
          variant: "destructive",
          description: `Erro: ${error}`,
        });
      }
    };

    fetchData();
  }, [dioceseId, toast]);

  if (redirectNotFound) {
    router.push("/dashboard/paroquias");
  }

  return (
    <div>
      <PageSubtitle
        title="Nova paróquia"
        subTitle={
          diocese &&
          `da ${diocese.tipoDiocese.descricao} de ${diocese.descricao}`
        }
        buttonShow={true}
        buttonText="Voltar"
        buttonUrl={`/dashboard/dioceses/${dioceseId}`}
        buttonVariant="outline"
      />

      {dioceseId && diocese ? (
        <div>
          <ParoquiaForm
            dioceseId={parseInt(dioceseId)}
            dioceseNome={diocese.descricao}
            urlBase={BASE_URL}
          />
        </div>
      ) : (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Atenção!</AlertTitle>
          <AlertDescription>
            Para cadastrar uma paróquia você precisa ir na pagina de{" "}
            <Link
              className="font-semibold underline"
              href={"/dashboard/dioceses"}
            >
              diocese
            </Link>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
