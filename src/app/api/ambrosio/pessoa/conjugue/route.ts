import { AmbrosioBaseUrl } from "@/lib/utils";
import { NextRequest } from "next/server";

const url = `${AmbrosioBaseUrl}/pessoa/conjugue`;

export async function GET(req: NextRequest) {
  const sexo = req.nextUrl.searchParams.get("sexo");

  const res = await fetch(`${url}?sexo=${sexo}`, {
    cache: "no-cache",
  });

  const data = await res.json();
  return Response.json(data);
}
