import { AmbrosioBaseUrl } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const url = `${AmbrosioBaseUrl}/users`;

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "ID do usuário é obrigatório" },
        { status: 400 },
      );
    }

    const body = await request.json();
    const { paroquiaIds } = body;

    if (
      !Array.isArray(paroquiaIds) ||
      !paroquiaIds.every((idParoquia) => Number.isInteger(idParoquia))
    ) {
      return NextResponse.json(
        { message: "paroquiaIds deve ser um array de números inteiros" },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const response = await fetch(`${url}/${id}/paroquias`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ paroquiaIds }),
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { message: "Usuário não encontrado" },
          { status: 404 },
        );
      }

      const errorData = await response.json().catch(() => ({}));

      if (response.status === 400) {
        return NextResponse.json(
          { message: errorData.message || "Dados inválidos" },
          { status: 400 },
        );
      }

      return NextResponse.json(
        { message: "Erro interno do servidor" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Paróquias atualizadas com sucesso" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erro ao atualizar paróquias do usuário:", error);

    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}