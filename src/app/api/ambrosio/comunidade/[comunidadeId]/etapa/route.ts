import { AmbrosioBaseUrl } from "@/lib/utils";
import { cookies } from "next/headers";

const url = `${AmbrosioBaseUrl}/comunidade`;

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

export async function POST(
  req: Request,
  { params }: { params: Promise<{ comunidadeId: string }> },
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const comunidadeId = Number.parseInt((await params).comunidadeId);

  const payload = await req.json();

  
  const etapa = {
    etapaId: payload.etapa,
    observacao: payload.observacao,
    localConvivencia: payload.local,
    dataInicio: payload.dataInicio,
  };
  console.log(payload);
  console.log(etapa);

  const response = await fetch(`${url}/${comunidadeId}/etapa`, {
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
