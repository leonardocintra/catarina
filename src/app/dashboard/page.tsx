"use client";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { useUser } from "../context/user-provider";
import { ROLE_NAO_IDENTIFICADO } from "@/constants";

export default function DashboardPage() {
  const { user } = useUser();

  return (
    <div className="pt-8">
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="bg-white shadow-lg rounded-xl p-8 text-center w-full max-w-md">
          <h2 className="text-2xl font-bold mb-2">Bem-vindo, {user?.name}!</h2>
          <p className="text-gray-600 mb-4">
            Estamos felizes em ter você aqui.
          </p>
          <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
            Perfil: {user?.role}
          </div>
        </div>
      </div>
      {user?.role === ROLE_NAO_IDENTIFICADO && (
        <div className="mx-auto max-w-lg mt-8">
          <Alert variant="destructive">
            <Terminal />
            <AlertTitle>Atenção!</AlertTitle>
            <AlertDescription>
              Você ainda não tem autorização para administrar. Aguarde ou entre
              em contato com o responsável por autorizar sua entrada no sistema
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}
