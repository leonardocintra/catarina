import { IDiocese } from "@/interfaces/IDiocese";
import { AmbrosioBaseUrl } from "@/lib/utils";

const url = `${AmbrosioBaseUrl}/diocese`;

export async function GET() {
  const res = await fetch(url);

  const data = await res.json();
  return Response.json(data);
}

export async function POST(req: Request) {
  const data = await req.json();

  const diocese: Partial<IDiocese> = {
    descricao: data.descricao,
    tipoDiocese: {
      id: parseInt(data.tipoDiocese),
      descricao: "TipoDiocese",
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
        message: resData.message[0],
      },
      {
        status: res.status,
      }
    );
  }
}
