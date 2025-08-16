import { AmbrosioBaseUrl } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const url = `${AmbrosioBaseUrl}/pessoa`;

export async function GET(req: NextRequest) {
  const sexo = req.nextUrl.searchParams.get("sexo");

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${url}/conjugue?sexo=${sexo}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  });

  const data = await res.json();
  return Response.json(data.data);
}

export async function POST(req: Request) {
  const data = await req.json();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${url}/casal`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const resData = await res.json();

  if (res.status === 201) {
    return Response.json(resData.data, {
      status: 201,
    });
  } else {
    return Response.json(
      {
        message: resData.message,
      },
      {
        status: res.status,
      }
    );
  }
}
