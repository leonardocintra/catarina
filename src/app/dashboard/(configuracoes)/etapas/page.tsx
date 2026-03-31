"use client";

import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SkeletonLoading } from "@/components/custom/ui/SkeletonLoading";

type Etapa = {
  id: number;
  descricao: string;
};

export default function EtapasPage() {
  const [etapas, setEtapas] = useState<Etapa[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const carregarEtapas = async () => {
      try {
        const res = await fetch("/api/ambrosio/configuracoes/etapas", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Nao foi possivel carregar as etapas.");
        }

        const payload = await res.json();
        const lista = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data)
            ? payload.data
            : [];

        const etapasNormalizadas = lista
          .map((item: Partial<Etapa>) => ({
            id: Number(item.id),
            descricao: String(item.descricao ?? ""),
          }))
          .filter((item: Etapa) => Number.isFinite(item.id) && item.descricao)
          .sort((a: Etapa, b: Etapa) => a.id - b.id);

        setEtapas(etapasNormalizadas);
      } catch (error) {
        console.error(error);
        setErro("Nao foi possivel carregar as etapas.");
      } finally {
        setLoading(false);
      }
    };

    carregarEtapas();
  }, []);

  const totalEtapas = useMemo(() => etapas.length, [etapas]);

  return (
    <div className="space-y-6">
      <PageSubtitle
        title="Etapas do Catecumenato"
        subTitle="Lista completa das etapas do Catecumenato"
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Etapas de Formação
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading && (
            <SkeletonLoading mensagem="Carregando etapas do Caminho ..." />
          )}

          {!loading && erro && (
            <div className="text-sm text-destructive">{erro}</div>
          )}

          {!loading && !erro && (
            <div className="space-y-3">
              {etapas.map((etapa) => (
                <div
                  key={etapa.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="min-w-8 justify-center">
                      {etapa.id}
                    </Badge>
                    <p className="text-base font-semibold leading-tight md:text-lg">
                      {etapa.descricao}
                    </p>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}

              {etapas.length === 0 && (
                <div className="text-sm text-muted-foreground">
                  Nenhuma etapa encontrada.
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        Total de {totalEtapas} etapas de formação
      </div>
    </div>
  );
}
