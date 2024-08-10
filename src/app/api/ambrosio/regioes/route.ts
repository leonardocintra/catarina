import { AmbrosioBaseUrl } from "@/lib/utils";

const url = `${AmbrosioBaseUrl}/regioes`;

export async function GET() {
  const res = await fetch(url);

  const data = await res.json();
  return Response.json(data);
}
