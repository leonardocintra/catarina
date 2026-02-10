import { AmbrosioBaseUrl } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const url = `${AmbrosioBaseUrl}/comunidade`;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;
  const res = await fetch(`${url}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 404) {
    return Response.json(
      {
        message: "Comunidade não encontrada",
      },
      {
        status: 404,
      },
    );
  }

  if (res.status === 401) {
    return Response.json(
      {
        message: "Você não tem permissão para acessar essa comunidade",
      },
      {
        status: 401,
      },
    );
  }

  const data = await res.json();
  return Response.json(data.data);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const payload = await req.json();

  const comunidade = {
    numeroDaComunidade: payload.numeroDaComunidade,
    quantidadeMembros: payload.quantidadeMembros,
    observacao: payload.observacao,
  };

  console.log("Payload recebido:", payload);

  const response = await fetch(`${url}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(comunidade),
  });

  const data = await response.json();

  if (response.ok) {
    return Response.json(data.data, {
      status: response.status,
    });
  }

  return Response.json(
    {
      message: data.message,
    },
    {
      status: response.status,
    },
  );
}
