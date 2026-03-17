import { AmbrosioBaseUrl } from "@/lib/utils";
import { cookies } from "next/headers";

const url = `${AmbrosioBaseUrl}/etapa`;

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const { id } = await ctx.params;

  const payload = await req.json();

  const etapa = {
    etapa: payload.etapa,
    observacao: payload.observacao,
    localConvivencia: payload.local,
    dataInicio: payload.dataInicio,
    dataFim: payload.dataFim,
  };

  const response = await fetch(`${url}/${id}`, {
    method: "PATCH",
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
