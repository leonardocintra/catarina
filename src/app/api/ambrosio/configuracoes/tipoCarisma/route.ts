import { AmbrosioBaseUrl } from "@/lib/utils";

export async function GET() {
  const url = `${AmbrosioBaseUrl}/tipo-carisma`;
  const res = await fetch(url);
  return Response.json(await res.json());
}
