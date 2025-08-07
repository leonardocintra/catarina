import { cookies } from "next/headers";
import { AmbrosioBaseUrl } from "@/lib/utils";

const url = `${AmbrosioBaseUrl}/users/me`;

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const res = await fetch(`${url}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return Response.json(data);
}
