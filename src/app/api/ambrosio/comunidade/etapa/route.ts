import { AmbrosioBaseUrl } from "@/lib/utils";
import { cookies } from "next/headers";

const url = `${AmbrosioBaseUrl}/etapa`;

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const payload = await req.json();

  const etapa = {
    comunidadeId: Number.parseInt(payload.comunidadeId),
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
      }
    );
  }
}
