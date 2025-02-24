import { AmbrosioBaseUrl } from "@/lib/utils";
import { NextRequest } from "next/server";

const url = `${AmbrosioBaseUrl}/diocese`;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const res = await fetch(`${url}/${params.id}`);

  if (res.status === 404) {
    return Response.json(
      {
        message: "Diocese não encontrada",
      },
      {
        status: 404,
      }
    );
  }

  const data = await res.json();
  return Response.json(data.data);
}