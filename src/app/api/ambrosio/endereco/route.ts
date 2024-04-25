import { IEndereco } from "@/interfaces/IEndereco";
import { IPessoa } from "@/interfaces/IPessoa";
import { AmbrosioBaseUrl } from "@/lib/utils";

const url = `${AmbrosioBaseUrl}/endereco`;

export async function GET() {
  const res = await fetch(url);

  const data = await res.json();
  return Response.json({ data });
}

export async function POST(req: Request) {
  const data = await req.json();

  const endereco: Partial<IEndereco> = {
    cep: data.cep,
    logradouro: data.logradouro,
    cidade: data.cidade,
    uf: data.uf,
    bairro: data.bairro,
    numero: data.numero,
    pessoaId: parseInt(data.pessoaId),
  };

  const res = await fetch(url, {
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
