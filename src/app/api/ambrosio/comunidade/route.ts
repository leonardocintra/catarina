import { AmbrosioBaseUrl } from "@/lib/utils";
import { cookies } from "next/headers";

const url = `${AmbrosioBaseUrl}/comunidade`;

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // Extrai o parâmetro paroquiaId da query string
  const { searchParams } = new URL(request.url);
  const paroquiaId = searchParams.get("paroquiaId");

  // Monta a URL com o parâmetro se existir
  const finalUrl = paroquiaId ? `${url}?paroquiaId=${paroquiaId}` : url;

  const res = await fetch(finalUrl, {
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
