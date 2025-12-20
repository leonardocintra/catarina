import { AmbrosioBaseUrl } from "@/lib/utils";
import { cookies } from "next/headers";

export async function GET(
  req: Request,
  ctx: { params: Promise<{ cpf: string }> }
) {
  const { cpf } = await ctx.params;
  if (!cpf) {
    return Response.json({ message: "CPF é obrigatório" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const res = await fetch(`${AmbrosioBaseUrl}/pessoa?cpf=${cpf}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      if (res.status === 404) {
        return Response.json(
          { message: "Pessoa não encontrada" },
          { status: 404 }
        );
      }
      throw new Error("Erro na API externa");
    }

    const data = await res.json();
    return Response.json(data.data);
  } catch (error) {
    return Response.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
