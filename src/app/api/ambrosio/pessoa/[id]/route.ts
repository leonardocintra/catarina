import { IPessoa } from "@/interfaces/IPessoa";
import { AmbrosioBaseUrl } from "@/lib/utils";
import { NextRequest } from "next/server";

const url = `${AmbrosioBaseUrl}/pessoa`;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const res = await fetch(`${url}/${params.id}`);

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
  return Response.json(data);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const data = await req.json();

  const pessoa: Partial<IPessoa> = {
    nome: data.nome,
    estadoCivil: {
      id: parseInt(data.estadoCivil),
      descricao: "EstadoCivil",
    },
    escolaridade: {
      id: parseInt(data.escolaridade),
      descricao: "Escolaridade",
    },
    tipoCarisma: {
      id: parseInt(data.tipoCarisma),
      descricao: "TipoCarisam",
    },
    tipoPessoa: {
      id: parseInt(data.tipoPessoa),
      descricao: "TipoPessoa",
    },
    sexo: data.sexo,
    nacionalidade: data.nacionalidade,
  };

  const res = await fetch(`${url}/${params.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
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
