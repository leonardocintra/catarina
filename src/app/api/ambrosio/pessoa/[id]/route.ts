import { AmbrosioBaseUrl } from "@/lib/utils";
import { Pessoa } from "neocatecumenal";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const url = `${AmbrosioBaseUrl}/pessoa`;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const token = cookies().get("token")?.value;
  const res = await fetch(`${url}/${params.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 404) {
    return Response.json(
      {
        message: "Pessoa não encontrada",
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

  const pessoa: Partial<Pessoa> = {
    nome: data.nome,
    conhecidoPor: data.conhecidoPor,
    cpf: data.cpf,
    estadoCivil: {
      id: parseInt(data.estadoCivil),
      descricao: "EstadoCivil",
    },
    escolaridade: {
      id: parseInt(data.escolaridade),
      descricao: "Escolaridade",
    },
    situacaoReligiosa: {
      id: parseInt(data.situacaoReligiosa),
      descricao: "situacaoReligiosa",
    },
    sexo: data.sexo,
    nacionalidade: data.nacionalidade,
  };

  const token = cookies().get("token")?.value;
  const res = await fetch(`${url}/${params.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(pessoa),
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
