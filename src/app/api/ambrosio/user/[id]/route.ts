import { AmbrosioBaseUrl } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const url = `${AmbrosioBaseUrl}/users`;

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const { email, password, cpf, whatsapp, active, role } = body;

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const response = await fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        email,
        password,
        cpf,
        whatsapp,
        active,
        role,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      if (response.status === 404) {
        return NextResponse.json(
          { message: "Usuário não encontrado" },
          { status: 404 },
        );
      }

      if (response.status === 409) {
        return NextResponse.json(
          {
            message: "Ja existe um usuário com esse E-mail ou CPF cadastrado.",
          },
          { status: 409 },
        );
      }

      if (response.status === 400) {
        return NextResponse.json(
          { message: errorData.message || "Dados inválidos" },
          { status: 400 },
        );
      }

      if (response.status === 401) {
        return NextResponse.json(
          { message: "Não autorizado" },
          { status: 401 },
        );
      }

      return NextResponse.json(
        { message: "Erro interno do servidor" },
        { status: 500 },
      );
    }

    const userData = await response.json();

    return NextResponse.json(
      {
        message: "Usuário atualizado com sucesso",
        user: {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          cpf: userData.cpf,
          whatsapp: userData.whatsapp,
          role: userData.role,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);

    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
