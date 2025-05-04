import { AmbrosioBaseUrl } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const url = `${AmbrosioBaseUrl}/paroquia`;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const token = cookies().get("token")?.value;
  const res = await fetch(`${url}/${params.id}`, {
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
  { params }: { params: { id: number } }
) {
  const data = await req.json();
  const token = cookies().get("token")?.value;

  const paroquia = {
    descricao: data.descricao,
    diocese: {
      id: parseInt(data.tipoDiocese),
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

  const res = await fetch(`${url}/${params.id}`, {
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
