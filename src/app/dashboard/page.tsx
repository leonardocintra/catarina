"use client";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Terminal } from "lucide-react";
import { useUser } from "../context/user-provider";
import { ROLE_NAO_IDENTIFICADO } from "@/constants";

export default function DashboardPage() {
  const { user } = useUser();

  return (
    <div className="pt-8">
      <div className="flex justify-center items-center min-h-[200px]">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">
              Bem-vindo, {user?.name}!
            </h2>
            <p className="text-muted-foreground mb-4">
              Estamos felizes em ter você aqui.
            </p>
            <Badge variant="secondary" className="text-sm font-semibold">
              Perfil: {user?.role}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {user?.role === ROLE_NAO_IDENTIFICADO && (
        <div className="mx-auto max-w-lg mt-8">
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Atenção!</AlertTitle>
            <AlertDescription>
              Você ainda não tem autorização para administrar. Aguarde ou entre
              em contato com o responsável por autorizar sua entrada no sistema.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}
