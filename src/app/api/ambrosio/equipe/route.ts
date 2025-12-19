import { AmbrosioBaseUrl } from "@/lib/utils";
import { cookies } from "next/headers";

const url = `${AmbrosioBaseUrl}/equipe`;

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

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

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const reqBody = await request.json();

  const equipe = {
    descricao: reqBody.descricao,
    tipoEquipeId: parseInt(reqBody.tipoEquipe),
  };

  const res = await fetch(url, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(equipe),
  });

  if (!res.ok) {
    return Response.json(
      { message: `Erro ao criar equipe. Erro ${await res.text()}` },
      { status: res.status }
    );
  }

  const data = await res.json();
  return Response.json(data);
}
