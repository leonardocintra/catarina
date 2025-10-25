import { AmbrosioBaseUrl } from "@/lib/utils";
import { cookies } from "next/headers";

const url = `${AmbrosioBaseUrl}/regiao`;

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401 || res.status === 403) {
    return Response.json(
      {
        message: "Você não tem permissão para acessar regiões",
      },
      {
        status: 401,
      }
    );
  }

  const data = await res.json();
  return Response.json(data);
}
