import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    message: "Logout realizado com sucesso!",
  });

  response.cookies.set({
    name: "token",
    value: "", // valor vazio
    httpOnly: true,
    path: "/", // importante: deve ser igual ao path do cookie original
    maxAge: 0, // faz o cookie expirar imediatamente
  });

  return response;
}
