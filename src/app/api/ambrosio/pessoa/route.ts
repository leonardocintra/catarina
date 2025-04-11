import { IPessoa } from "@/interfaces/IPessoa";
import { AmbrosioBaseUrl } from "@/lib/utils";
import { cookies } from "next/headers";

const url = `${AmbrosioBaseUrl}/pessoa`;

export async function GET() {
  const token = cookies().get("token")?.value;
  const res = await fetch(`${url}?page=1&limit=3000`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return Response.json(data);
}

export async function POST(req: Request) {
  const data = await req.json();

  const pessoa: Partial<IPessoa> = {
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
    tipoPessoa: {
      id: parseInt(data.tipoPessoa),
      descricao: "TipoPessoa",
    },
    sexo: data.sexo,
    nacionalidade: data.nacionalidade,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pessoa),
  });

  const resData = await res.json();

  if (res.status === 201) {
    return Response.json(resData.data, {
      status: 201,
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
