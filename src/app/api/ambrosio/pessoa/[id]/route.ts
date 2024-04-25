import { AmbrosioBaseUrl } from "@/lib/utils";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";

const url = `${AmbrosioBaseUrl}/pessoa`;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  console.log(params.id);

  // const res = await fetch(url);

  // const data = await res.json();
  return Response.json(true);
}
