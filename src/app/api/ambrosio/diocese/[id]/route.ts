import { IDiocese } from "@/interfaces/IDiocese";
import { AmbrosioBaseUrl } from "@/lib/utils";
import { NextRequest } from "next/server";

const url = `${AmbrosioBaseUrl}/diocese`;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const res = await fetch(`${url}/${params.id}`);

  if (res.status === 404) {
    return Response.json(
      {
        message: "Diocese não encontrada",
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

  const diocese: Partial<IDiocese> = {
    descricao: data.descricao,
    tipoDiocese: {
      id: parseInt(data.tipoDiocese),
      descricao: "TipoDiocese",
    },
    observacao: data.observacao,
    localidade: [
      {
        endereco: {
          logradouro: data.logradouro,
          numero: data.numero,
          bairro: data.bairro,
          cidade: data.cidade,
          UF: data.uf,
          cep: data.cep,
        }
      }
    ]
  };

  const res = await fetch(`${url}/${params.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(diocese),
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
