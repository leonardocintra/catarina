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
      descricao: "TipoCarisam",
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

  if (res.status === 201) {
    return Response.json(await res.json(), {
      status: 201,
    });
  } else {
    return Response.json(res.json());
  }
}
