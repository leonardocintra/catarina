import { AmbrosioBaseUrl } from "@/lib/utils";

export async function GET() {
  const url = `${AmbrosioBaseUrl}/tipo-pessoa`;
  const res = await fetch(url);

  const data = await res.json();
  return Response.json({ data });
}
