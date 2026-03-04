import { AmbrosioBaseUrl } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const url = `${AmbrosioBaseUrl}/auth/change-password`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { currentPassword, newPassword, confirmPassword } = body;

    // Validação dos campos obrigatórios
    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { message: "Todos os campos são obrigatórios" },
        { status: 400 },
      );
    }

    // Validação de confirmação de senha
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { message: "A nova senha e a confirmação não coincidem" },
        { status: 400 },
      );
    }

    // Validação de tamanho mínimo da senha
    if (newPassword.length < 6) {
      return NextResponse.json(
        { message: "A nova senha deve ter no mínimo 6 caracteres" },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Não autenticado" },
        { status: 401 },
      );
    }

    // Chamada para a API externa
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      // Tratamento de erros específicos
      if (response.status === 401) {
        return NextResponse.json(
          { message: "Senha atual incorreta" },
          { status: 401 },
        );
      }

      if (response.status === 400) {
        return NextResponse.json(
          { message: errorData.message || "Dados inválidos" },
          { status: 400 },
        );
      }

      return NextResponse.json(
        { message: "Erro ao alterar senha" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Senha alterada com sucesso" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erro ao alterar senha:", error);

    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
