"use client";

import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import {
  CarismaPrimitivo,
  CarismaServico,
  CarismaVinculado,
  Pessoa,
} from "neocatecumenal";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { BASE_URL } from "@/lib/utils";
import { SkeletonLoading } from "@/components/custom/ui/SkeletonLoading";

interface CarismaData {
  primitivo: CarismaPrimitivo[];
  vinculado: CarismaVinculado[];
  servico: CarismaServico[];
}

export default function PessoaCarismaPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const pessoaId = params.id as string;

  const [carismaData, setCarismaData] = useState<CarismaData>({
    primitivo: [],
    vinculado: [],
    servico: [],
  });
  const [pessoa, setPessoa] = useState<Pessoa | null>(null);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedPrimitivos, setSelectedPrimitivos] = useState<number[]>([]);
  const [selectedVinculados, setSelectedVinculados] = useState<number[]>([]);
  const [selectedServicos, setSelectedServicos] = useState<number[]>([]);

  // Carregar dados
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        // Buscar carismas
        const urlBase = BASE_URL + "/api/ambrosio/configuracoes/carismas";
        const [resPrimitivo, resVinculado, resServico] = await Promise.all([
          fetch(`${urlBase}/primitivo`),
          fetch(`${urlBase}/vinculado`),
          fetch(`${urlBase}/servico`),
        ]);

        const [dataPrimitivo, dataVinculado, dataServico] = await Promise.all([
          resPrimitivo.json(),
          resVinculado.json(),
          resServico.json(),
        ]);

        setCarismaData({
          primitivo: dataPrimitivo.data || dataPrimitivo || [],
          vinculado: dataVinculado.data || dataVinculado.dataVinculado || [],
          servico: dataServico.data || dataServico.dataServico || [],
        });

        // Buscar pessoa
        const resPessoa = await fetch(
          `${BASE_URL}/api/ambrosio/pessoa/${pessoaId}`
        );
        if (!resPessoa.ok) throw new Error("Erro ao buscar pessoa");
        const pessoaData = await resPessoa.json();

        setPessoa(pessoaData);
        setSelectedPrimitivos(
          pessoaData.carismas?.primitivos?.map((c: any) => c.id) || []
        );
        setSelectedVinculados(
          pessoaData.carismas?.vinculados?.map((c: any) => c.id) || []
        );
        setSelectedServicos(
          pessoaData.carismas?.servicos?.map((c: any) => c.id) || []
        );
      } catch (error) {
        toast({
          title: "Erro",
          variant: "destructive",
          description: "Erro ao carregar dados",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [pessoaId, toast]);

  const toggle = (id: number, type: "primitivo" | "vinculado" | "servico") => {
    const setters = {
      primitivo: setSelectedPrimitivos,
      vinculado: setSelectedVinculados,
      servico: setSelectedServicos,
    };
    setters[type]((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const isSelected = (
    id: number,
    type: "primitivo" | "vinculado" | "servico"
  ) => {
    const states = {
      primitivo: selectedPrimitivos,
      vinculado: selectedVinculados,
      servico: selectedServicos,
    };
    return states[type].includes(id);
  };

  const salvar = async () => {
    if (
      !selectedPrimitivos.length &&
      !selectedVinculados.length &&
      !selectedServicos.length
    ) {
      toast({
        title: "Atenção",
        variant: "destructive",
        description: "Selecione pelo menos um carisma",
      });
      return;
    }

    setLoading(true);

    const payload: any = { carismas: {} };

    if (selectedPrimitivos.length > 0) {
      payload.carismas.primitivos = carismaData.primitivo
        .filter((c) => selectedPrimitivos.includes(c.id))
        .map((c) => ({ id: c.id, descricao: c.descricao }));
    }

    if (selectedVinculados.length > 0) {
      payload.carismas.vinculados = carismaData.vinculado
        .filter((c) => selectedVinculados.includes(c.id))
        .map((c) => ({ id: c.id, descricao: c.descricao }));
    }

    if (selectedServicos.length > 0) {
      payload.carismas.servicos = carismaData.servico
        .filter((c) => selectedServicos.includes(c.id))
        .map((c) => ({ id: c.id, descricao: c.descricao }));
    }

    try {
      const res = await fetch(
        `${BASE_URL}/api/ambrosio/pessoa/${pessoa?.id}/carismas`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        toast({
          title: "Sucesso",
          description: "Carismas atualizados com sucesso",
        });
        router.push(`/dashboard/pessoas/${pessoa?.id}`);
      } else {
        toast({
          title: "Erro",
          variant: "destructive",
          description: "Erro ao atualizar carismas",
        });
      }
    } catch {
      toast({
        title: "Erro",
        variant: "destructive",
        description: "Erro ao conectar",
      });
    } finally {
      setLoading(false);
    }
  };

  const Grid = ({
    title,
    carismas,
    type,
  }: {
    title: string;
    carismas: any[];
    type: "primitivo" | "vinculado" | "servico";
  }) => (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">
        {title} ({carismas.length})
      </h2>
      {carismas.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          Nenhum carisma disponível
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {carismas.map((c) => (
            <div
              key={c.id}
              onClick={() => toggle(c.id, type)}
              className={`border rounded-lg p-4 cursor-pointer flex items-center justify-between transition-colors ${
                isSelected(c.id, type)
                  ? "bg-blue-100 border-blue-500 dark:bg-blue-950"
                  : "bg-white hover:bg-gray-50 dark:bg-slate-950"
              }`}
            >
              <span className="font-medium text-sm">{c.descricao}</span>
              {isSelected(c.id, type) && (
                <CheckIcon className="text-blue-500" size={18} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (isLoading) {
    return <SkeletonLoading mensagem="Carregando carismas ..." />;
  }

  if (!pessoa) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Pessoa não encontrada</p>
      </div>
    );
  }

  return (
    <div>
      <PageSubtitle
        title={`Adicionar carismas de ${pessoa.nome}`}
        buttonShow={true}
        buttonUrl={`/dashboard/pessoas/${pessoa.id}`}
        buttonText="Voltar"
      />

      <div className="p-4 max-w-4xl mx-auto">
        <Grid
          title="Carismas Primitivos"
          carismas={carismaData.primitivo}
          type="primitivo"
        />
        <Separator className="my-6" />
        <Grid
          title="Carismas Vinculados"
          carismas={carismaData.vinculado}
          type="vinculado"
        />
        <Separator className="my-6" />
        <Grid
          title="Carismas de Serviço"
          carismas={carismaData.servico}
          type="servico"
        />
        <Separator className="my-6" />

        <div className="flex gap-2">
          <Button onClick={salvar} disabled={loading} size="lg">
            {loading ? "Salvando..." : "Confirmar carismas"}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push(`/dashboard/pessoas/${pessoa.id}`)}
            disabled={loading}
          >
            Cancelar
          </Button>
        </div>

        {(selectedPrimitivos.length > 0 ||
          selectedVinculados.length > 0 ||
          selectedServicos.length > 0) && (
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <h3 className="font-semibold mb-2">Resumo:</h3>
            <ul className="text-sm space-y-1">
              {selectedPrimitivos.length > 0 && (
                <li>
                  • <strong>Primitivos:</strong> {selectedPrimitivos.length}
                </li>
              )}
              {selectedVinculados.length > 0 && (
                <li>
                  • <strong>Vinculados:</strong> {selectedVinculados.length}
                </li>
              )}
              {selectedServicos.length > 0 && (
                <li>
                  • <strong>Serviços:</strong> {selectedServicos.length}
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
