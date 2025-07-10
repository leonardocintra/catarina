import { IEndereco } from "@/interfaces/IEndereco";
import { AmbrosioBaseUrl } from "@/lib/utils";
import { NextRequest } from "next/server";

const url = `${AmbrosioBaseUrl}/endereco`;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const res = await fetch(`${url}/pessoa/${id}`);

  const data = await res.json();
  return Response.json(data);
}

export async function POST(req: Request) {
  const data = await req.json();

  const endereco: Partial<IEndereco> = {
    cep: data.cep,
    logradouro: data.logradouro,
    cidade: data.cidade,
    UF: data.UF,
    bairro: data.bairro,
    numero: data.numero,
  };

  const res = await fetch(`${url}/pessoa/${parseInt(data.pessoaId)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(endereco),
  });

  if (res.status === 201) {
    return Response.json(
      {
        message: "Cadastrado com sucesso",
      },
      {
        status: 201,
      }
    );
  } else {
    return Response.json(res.json());
  }
}
