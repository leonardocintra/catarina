import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Terminal } from "lucide-react";
import { ROLE_NAO_IDENTIFICADO } from "@/constants";
import { cookies } from "next/headers";
import { AmbrosioBaseUrl } from "@/lib/utils";

type DashboardUser = {
  email?: string;
  role?: string;
};

async function getAuthenticatedUser(): Promise<DashboardUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  const response = await fetch(`${AmbrosioBaseUrl}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const payload = await response.json();
  return payload?.data ?? null;
}

export default async function DashboardPage() {
  const user = await getAuthenticatedUser();

  return (
    <div className="pt-8">
      <div className="flex justify-center items-center min-h-50">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Bem-vindo!</h2>
            <h3>{user?.email}</h3>
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
