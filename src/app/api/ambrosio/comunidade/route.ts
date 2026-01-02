import { AmbrosioBaseUrl } from "@/lib/utils";
import { Comunidade } from "neocatecumenal";
import { cookies } from "next/headers";

const url = `${AmbrosioBaseUrl}/comunidade`;

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // Extrai o parâmetro paroquiaId da query string
  const { searchParams } = new URL(request.url);
  const paroquiaId = searchParams.get("paroquiaId");

  // Monta a URL com o parâmetro se existir
  const finalUrl = paroquiaId ? `${url}?paroquiaId=${paroquiaId}` : url;

  const res = await fetch(finalUrl, {
    cache: "no-cache",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return Response.json(data);
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const payload = await req.json();

  const comunidade = {
    descricao: payload.descricao,
    numeroDaComunidade: payload.numeroDaComunidade,
    quantidadeMembros: payload.quantidadeMembros,
    paroquiaId: payload.paroquiaId,
    observacao: payload.observacao,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(comunidade),
  });

  const data = await response.json();

  if (response.status === 201) {
    return Response.json(data.data, {
      status: 201,
    });
  } else {
    return Response.json(
      {
        message: data.message,
      },
      {
        status: response.status,
      }
    );
  }
}
