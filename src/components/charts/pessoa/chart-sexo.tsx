"use client";

import { TrendingUp, Users } from "lucide-react";
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

export const description = "Distribuição de pessoas por sexo";

interface ChartPessoaPorSexoProps {
  masculino: number;
  feminino: number;
}

export function ChartPessoaPorSexo({
  masculino = 0,
  feminino = 0,
}: ChartPessoaPorSexoProps) {
  const chartData = [
    {
      sexo: "masculino",
      quantidade: masculino,
      fill: "var(--color-masculino)",
    },
    {
      sexo: "feminino",
      quantidade: feminino,
      fill: "var(--color-feminino)",
    },
  ];

  const chartConfig = {
    quantidade: {
      label: "Pessoas",
    },
    masculino: {
      label: "Masculino",
      color: "hsl(210, 100%, 50%)", // Azul
    },
    feminino: {
      label: "Feminino",
      color: "hsl(330, 100%, 70%)", // Rosa
    },
  } satisfies ChartConfig;

  const total = masculino + feminino;
  const masculinoPercent =
    total > 0 ? ((masculino / total) * 100).toFixed(1) : 0;
  const femininoPercent =
    total > 0 ? ((feminino / total) * 100).toFixed(1) : 0;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Distribuição por Sexo
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
                dataKey="sexo"
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
        <div className="flex items-center justify-between w-full gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[hsl(210,100%,50%)]" />
            <span className="text-muted-foreground">
              Masculino:{" "}
              <span className="font-medium text-foreground">
                {masculino} ({masculinoPercent}%)
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[hsl(330,100%,70%)]" />
            <span className="text-muted-foreground">
              Feminino:{" "}
              <span className="font-medium text-foreground">
                {feminino} ({femininoPercent}%)
              </span>
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
