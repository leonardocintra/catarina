import { AmbrosioBaseUrl } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = typeof body.email === "string" ? body.email.trim() : "";

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { message: "Informe um email válido" },
        { status: 400 },
      );
    }

    const upstreamResponse = await fetch(
      `${AmbrosioBaseUrl}/auth/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      },
    );

    if (!upstreamResponse.ok) {
      const errorPayload = await upstreamResponse.json().catch(() => null);
      const message =
        errorPayload?.message || "Não foi possível iniciar a recuperação";

      return NextResponse.json(
        { message },
        { status: upstreamResponse.status },
      );
    }

    const successPayload = await upstreamResponse.json().catch(() => null);

    return NextResponse.json(
      successPayload ?? { message: "Solicitação enviada" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erro ao solicitar recuperação de senha:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
