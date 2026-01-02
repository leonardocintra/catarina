import { AmbrosioBaseUrl } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const url = `${AmbrosioBaseUrl}/paroquia`;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const { id } = await params;

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
        message: "Paroquia não encontrada",
      },
      {
        status: 404,
      }
    );
  }

  if (res.status === 401) {
    return Response.json(
      {
        message: "Você não tem permissão para acessar essa paroquia",
      },
      {
        status: 401,
      }
    );
  }

  const data = await res.json();
  return Response.json(data.data);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const data = await req.json();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const paroquia = {
    descricao: data.descricao,
    diocese: {
      id: data.dioceseId,
    },
    observacao: data.observacao,
    endereco: {
      id: parseInt(data.enderecoId),
      logradouro: data.logradouro,
      numero: data.numero,
      bairro: data.bairro,
      cidade: data.cidade,
      UF: data.uf,
      cep: data.cep,
    },
  };

  const { id } = await params;
  const res = await fetch(`${url}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paroquia),
  });

  const resData = await res.json();

  if (res.status === 200) {
    return Response.json(resData, {
      status: 200,
    });
  } else {
    return Response.json(
      {
        message: resData.message[0],
      },
      {
        status: res.status,
      }
    );
  }
}
