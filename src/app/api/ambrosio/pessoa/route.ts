import { IPessoa } from "@/interfaces/IPessoa";
import { AmbrosioBaseUrl } from "@/lib/utils";

const url = `${AmbrosioBaseUrl}/pessoa`;

export async function GET() {
  const res = await fetch(url);

  const data = await res.json();
  return Response.json({ data });
}

export async function POST(req: Request) {
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
      descricao: "TipoCarisama",
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
    return Response.json(resData, {
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
