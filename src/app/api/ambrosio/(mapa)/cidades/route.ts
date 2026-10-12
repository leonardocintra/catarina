import { AmbrosioBaseUrl } from "@/lib/utils";

const url = `${AmbrosioBaseUrl}/users/roles`;

export async function GET() {
  const res = await fetch(`${url}`, {
    headers: {
      "Content-Type": "application/json"
    },
  });

  const data = await res.json();
  return Response.json(data);
}
