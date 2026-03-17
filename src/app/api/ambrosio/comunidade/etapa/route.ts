import { AmbrosioBaseUrl } from "@/lib/utils";
import { cookies } from "next/headers";

const url = `${AmbrosioBaseUrl}/etapa`;

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const { searchParams } = new URL(req.url);
  const etapaId = searchParams.get("id");

  if (!etapaId) {
    return Response.json(
      {
        message: "ID da etapa é obrigatório",
      },
      {
        status: 400,
      },
    );
  }

  const response = await fetch(`${url}/${etapaId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (response.status === 200) {
    return Response.json(data.data, {
      status: 200,
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

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const payload = await req.json();

  const etapa = {
    comunidadeId: Number.parseInt(payload.comunidadeId),
    etapa: payload.etapa,
    observacao: payload.observacao,
    localConvivencia: payload.local,
    dataInicio: payload.dataInicio,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(etapa),
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
