import { AmbrosioBaseUrl } from "@/lib/utils";
import { cookies } from "next/headers";

const url = `${AmbrosioBaseUrl}/comunidade`;

export async function POST(
  req: Request,
  { params }: { params: Promise<{ comunidadeId: string; pessoaId: string }> },
) {
  const { comunidadeId, pessoaId } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return Response.json(
      {
        message: "Não autenticado",
      },
      {
        status: 401,
      },
    );
  }

  let observacao: string | undefined;

  try {
    const body = await req.json();
    observacao = body?.observacao;
  } catch {
    observacao = undefined;
  }

  try {
    const payload = observacao !== undefined ? { observacao } : {};

    const response = await fetch(`${url}/${comunidadeId}/pessoa/${pessoaId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      return Response.json(data?.data ?? data, {
        status: response.status,
      });
    }

    return Response.json(
      {
        message: data?.message || "Erro ao vincular pessoa na comunidade",
      },
      {
        status: response.status,
      },
    );
  } catch {
    return Response.json(
      {
        message: "Erro ao processar solicitação",
      },
      {
        status: 500,
      },
    );
  }
}
