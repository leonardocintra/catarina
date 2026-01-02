"use client";

import { Carisma, TipoCarismaEnum } from "neocatecumenal";

interface CarismaSectionProps {
  carismas: Carisma[];
  descricao: string;
}

export default function ListagemDeCarismas({
  carismas,
  descricao,
}: CarismaSectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">{descricao}</h2>
      <ul className="list-disc pl-5">
        {carismas.map((c) => (
          <li key={c.id} className="mb-2">
            <span className="font-normal">{c.descricao}</span>
            {c.casalAndaJunto && (
              <span className="ml-2 text-sm text-muted-foreground">
                (Casal anda junto)
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
