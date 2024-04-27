import { AmbrosioBaseUrl } from "@/lib/utils";
import { NextRequest } from "next/server";

const url = `${AmbrosioBaseUrl}/regioes`;

export async function GET(req: NextRequest) {
  const res = await fetch(url);

  const data = await res.json();
  return Response.json(data);
}
