import { IPais } from "@/interfaces/IPais";
import { AmbrosioBaseUrl } from "@/lib/utils";
import { NextRequest } from "next/server";

const url = `${AmbrosioBaseUrl}/pais`;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const res = await fetch(`${url}/${params.id}`);

  if (res.status === 404) {
    return Response.json(
      {
        message: "País não encontrado",
      },
      {
        status: 404,
      }
    );
  }

  const data = await res.json();
  return Response.json(data.data);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const data = await req.json();

  const pais: Partial<IPais> = {
    nome: data.nome,
  };

  const res = await fetch(`${url}/${params.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pais),
  });

  const resData = await res.json();

  if (res.status === 200) {
    return Response.json(resData, {
      status: 200,
    });
  } else {
    return Response.json(
      {
        message: resData.message,
      },
      {
        status: res.status,
      }
    );
  }
}
