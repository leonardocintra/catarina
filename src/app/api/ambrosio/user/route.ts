import { AmbrosioBaseUrl } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const url = `${AmbrosioBaseUrl}/users`;

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const res = await fetch(`${url}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return Response.json(data);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validação básica dos campos obrigatórios
    const { email, password, cpf, name, whatsapp } = body;

    if (!email || !password || !cpf || !name || !whatsapp) {
      console.log(email, password, cpf, name, whatsapp);
      return NextResponse.json(
        { message: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    // Validação do formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Formato de e-mail inválido" },
        { status: 400 }
      );
    }

    // Validação do CPF (11 dígitos)
    if (!/^\d{11}$/.test(cpf)) {
      return NextResponse.json(
        { message: "CPF deve conter 11 dígitos numéricos" },
        { status: 400 }
      );
    }

    // Validação do WhatsApp (10 ou 11 dígitos)
    if (!/^\d{10,11}$/.test(whatsapp)) {
      return NextResponse.json(
        { message: "WhatsApp deve conter 10 ou 11 dígitos numéricos" },
        { status: 400 }
      );
    }

    // Chamada para a API externa
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        cpf,
        name,
        whatsapp,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      // Tratamento de erros específicos
      if (response.status === 409) {
        return NextResponse.json(
          { message: "E-mail ou CPF já cadastrado" },
          { status: 409 }
        );
      }

      if (response.status === 400) {
        return NextResponse.json(
          { message: errorData.message || "Dados inválidos" },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { message: "Erro interno do servidor" },
        { status: 500 }
      );
    }

    const userData = await response.json();

    return NextResponse.json(
      {
        message: "Usuário criado com sucesso",
        user: {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          cpf: userData.cpf,
          whatsapp: userData.whatsapp,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar usuário:", error);

    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
