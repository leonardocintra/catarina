"use client";

import { use, useState } from "react";

export default function EditarEquipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [editar, setEditar] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const { id } = use(params);

  return <div>Editar Equipe {id}</div>;
}
