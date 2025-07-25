import { AmbrosioBaseUrl } from "@/lib/utils";

const url = `${AmbrosioBaseUrl}/cidade`;

export async function GET() {
  const res = await fetch(url, {
    next: {
      revalidate: 30,
    },
  });

  const data = await res.json();
  return Response.json(data);
}
