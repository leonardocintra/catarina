import { AmbrosioBaseUrl } from "@/lib/utils";
import { cookies } from "next/headers";

const baseUrl = `${AmbrosioBaseUrl}/paroquia`;

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // Captura os parâmetros da URL (ex: ?dioceseId=123)
  const { searchParams } = new URL(request.url);
  const dioceseId = searchParams.get("dioceseId");

  // Monta a URL com ou sem filtro
  const url = dioceseId ? `${baseUrl}?dioceseId=${dioceseId}` : baseUrl;

  const res = await fetch(url, {
    cache: "no-cache",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return Response.json(data);
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const data = await req.json();

  const paroquia = {
    descricao: data.descricao,
    diocese: {
      id: parseInt(data.dioceseId),
    },
    setor: {
      id: parseInt(data.setorId),
    },
    observacao: data.observacao,
    endereco: {
      logradouro: data.logradouro,
      numero: data.numero,
      bairro: data.bairro,
      cidade: data.cidade,
      cep: data.cep,
      UF: data.uf,
    },
  };

  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paroquia),
  });

  const resData = await res.json();

  if (res.status === 201) {
    return Response.json(resData, {
      status: 201,
    });
  } else {
    return Response.json(
      {
        message: resData.message,
      },
      {
        status: res.status,
      }
    );
  }
}
