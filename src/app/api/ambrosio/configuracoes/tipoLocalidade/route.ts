import { AmbrosioBaseUrl } from "@/lib/utils";

export async function GET() {
  const url = `${AmbrosioBaseUrl}/tipo-localidade`;
  const res = await fetch(url, { cache: "force-cache" });

  const data = await res.json();
  return Response.json(data);
}
