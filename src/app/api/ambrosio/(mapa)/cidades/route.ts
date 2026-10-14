import { AmbrosioBaseUrl } from "@/lib/utils";

const url = `${AmbrosioBaseUrl}/cidade`;

export async function GET() {
  const res = await fetch(`${url}`, {
    headers: {
      "Content-Type": "application/json"
    },
  });

  const data = await res.json();
  return Response.json(data);
}
