import { IDiocese } from "@/interfaces/IDiocese";
import { AmbrosioBaseUrl } from "@/lib/utils";
import { cookies } from "next/headers";

const url = `${AmbrosioBaseUrl}/diocese`;

export async function GET() {
  const token = cookies().get("token")?.value;
  
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
  const token = cookies().get("token")?.value;
  const data = await req.json();
  
  const diocese: Partial<IDiocese> = {
    descricao: data.descricao,
    tipoDiocese: {
      id: parseInt(data.tipoDiocese),
      descricao: "TipoDiocese",
    },
    observacao: data.observacao,
    endereco: {
      logradouro: data.logradouro,
      numero: data.numero,
      bairro: data.bairro,
      cidade: data.cidade,
      UF: data.uf,
      cep: data.cep,
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(diocese),
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
