import { AmbrosioBaseUrl } from "@/lib/utils";
import { cookies } from "next/headers";

const url = `${AmbrosioBaseUrl}/comunidade`;

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // Extrai os parâmetros da query string
  const { searchParams } = new URL(request.url);
  const paroquiaId = searchParams.get("paroquiaId");
  const numeroDaComunidade = searchParams.get("numeroDaComunidade");

  // Monta a URL com os parâmetros se existirem
  const apiParams = new URLSearchParams();

  if (paroquiaId) {
    apiParams.set("paroquiaId", paroquiaId);
  }

  if (numeroDaComunidade) {
    apiParams.set("numeroDaComunidade", numeroDaComunidade);
  }

  const finalUrl = apiParams.toString()
    ? `${url}?${apiParams.toString()}`
    : url;

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
      },
    );
  }
}
