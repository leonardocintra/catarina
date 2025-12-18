import { AmbrosioBaseUrl } from "@/lib/utils";
import { cookies } from "next/headers";

const url = `${AmbrosioBaseUrl}/carismas`;

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: pessoaId } = await params;
  const data = await req.json();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  console.log(data);

  try {
    const res = await fetch(`${url}/pessoa/${pessoaId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const resData = await res.json();
    console.log("Resposta da API ao salvar carismas:", resData.message);

    if (res.status === 201) {
      return Response.json(resData, {
        status: res.status,
      });
    } else {
      return Response.json(
        {
          message: resData.message || "Erro ao atualizar carismas",
        },
        {
          status: res.status,
        }
      );
    }
  } catch (error) {
    console.error("Erro ao salvar carismas:", error);
    return Response.json(
      {
        message: "Erro ao processar solicitação",
      },
      {
        status: 500,
      }
    );
  }
}
