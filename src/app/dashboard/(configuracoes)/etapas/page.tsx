"use client";

import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

const etapas = [
  { id: 1, nome: "Pre-catecumenato", descricao: "Etapa inicial de preparação" },
  { id: 2, nome: "1º Escrutínio", descricao: "Primeiro exame de consciência" },
  {
    id: 3,
    nome: "Shemá Israel",
    descricao: "Oração fundamental do povo de Deus",
  },
  { id: 4, nome: "2º Escrutínio", descricao: "Segundo exame de consciência" },
  {
    id: 5,
    nome: "Iniciação à Oração",
    descricao: "Fundamentos da vida de oração",
  },
  { id: 6, nome: "Traditio Symboli", descricao: "Entrega do Símbolo da Fé" },
  { id: 7, nome: "Redditio Symboli", descricao: "Devolução do Símbolo da Fé" },
  {
    id: 8,
    nome: "Pai Nosso I",
    descricao: "Primeira etapa da oração dominical",
  },
  {
    id: 9,
    nome: "Pai Nosso II",
    descricao: "Segunda etapa da oração dominical",
  },
  {
    id: 10,
    nome: "Pai Nosso III",
    descricao: "Terceira etapa da oração dominical",
  },
  {
    id: 11,
    nome: "3º Escrutínio",
    descricao: "Terceiro e último exame de consciência",
  },
];

export default function EtapasPage() {
  return (
    <div className="space-y-6">
      <PageSubtitle
        title="Etapas do Catecumenato"
        subTitle="Lista completa das etapas do Catecumenato"
        buttonShow={false}
        buttonText=""
        buttonUrl=""
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Etapas de Formação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {etapas.map((etapa, index) => (
              <div
                key={etapa.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Badge
                    variant="outline"
                    className="min-w-8 justify-center"
                  >
                    {index + 1}
                  </Badge>
                  <div>
                    <h3 className="font-medium">{etapa.nome}</h3>
                    <p className="text-sm text-muted-foreground">
                      {etapa.descricao}
                    </p>
                  </div>
                </div>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        Total de {etapas.length} etapas de formação
      </div>
    </div>
  );
}
