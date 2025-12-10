"use client";

import { Heart, Users } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "Distribuição de pessoas por estado civil";

interface ChartPessoaPorEstadoCivilProps {
  solteiro: number;
  casado: number;
  divorciado: number;
  viuvo: number;
}

export function ChartPessoaPorEstadoCivil({
  solteiro = 0,
  casado = 0,
  divorciado = 0,
  viuvo = 0,
}: ChartPessoaPorEstadoCivilProps) {
  const chartData = [
    {
      estadoCivil: "solteiro",
      quantidade: solteiro,
      fill: "var(--color-solteiro)",
    },
    {
      estadoCivil: "casado",
      quantidade: casado,
      fill: "var(--color-casado)",
    },
    {
      estadoCivil: "divorciado",
      quantidade: divorciado,
      fill: "var(--color-divorciado)",
    },
    {
      estadoCivil: "viuvo",
      quantidade: viuvo,
      fill: "var(--color-viuvo)",
    },
  ];

  const chartConfig = {
    quantidade: {
      label: "Pessoas",
    },
    solteiro: {
      label: "Solteiro",
      color: "hsl(210, 100%, 50%)", // Azul
    },
    casado: {
      label: "Casado",
      color: "hsl(340, 75%, 55%)", // Vermelho/Rosa
    },
    divorciado: {
      label: "Divorciado",
      color: "hsl(30, 100%, 50%)", // Laranja
    },
    viuvo: {
      label: "Viúvo",
      color: "hsl(270, 50%, 40%)", // Roxo escuro
    },
  } satisfies ChartConfig;

  const total = solteiro + casado + divorciado + viuvo;

  const calcularPorcentagem = (valor: number) =>
    total > 0 ? ((valor / total) * 100).toFixed(1) : 0;

  const solteiroPercent = calcularPorcentagem(solteiro);
  const casadoPercent = calcularPorcentagem(casado);
  const divorciadoPercent = calcularPorcentagem(divorciado);
  const viuvoPercent = calcularPorcentagem(viuvo);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5" />
          Distribuição por Estado Civil
        </CardTitle>
        <CardDescription>Total de {total} pessoas cadastradas</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="quantidade" hideLabel />}
            />
            <Pie data={chartData} dataKey="quantidade">
              <LabelList
                dataKey="estadoCivil"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="grid grid-cols-2 gap-3 w-full">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[hsl(210,100%,50%)]" />
            <span className="text-muted-foreground text-xs">
              Solteiro:{" "}
              <span className="font-medium text-foreground">
                {solteiro} ({solteiroPercent}%)
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[hsl(340,75%,55%)]" />
            <span className="text-muted-foreground text-xs">
              Casado:{" "}
              <span className="font-medium text-foreground">
                {casado} ({casadoPercent}%)
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[hsl(30,100%,50%)]" />
            <span className="text-muted-foreground text-xs">
              Divorciado:{" "}
              <span className="font-medium text-foreground">
                {divorciado} ({divorciadoPercent}%)
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[hsl(270,50%,40%)]" />
            <span className="text-muted-foreground text-xs">
              Viúvo:{" "}
              <span className="font-medium text-foreground">
                {viuvo} ({viuvoPercent}%)
              </span>
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
