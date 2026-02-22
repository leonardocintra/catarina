"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ShieldCheck, Loader2 } from "lucide-react";

import { useUser } from "@/app/context/user-provider";
import PageSubtitle from "@/components/custom/dashboard/page-subtitle";
import UnauthorizedAccessAlert from "@/components/custom/ui/AlertSemCadastroOuPermissao";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ROLE_ADMIN } from "@/constants";
import { Pessoa, User, UserRoleEnum } from "neocatecumenal";

type DashboardUser = User & {
  pessoa?: Pessoa;
};

const SELECTED_USER_CACHE_PREFIX = "dashboard:usuarios";

export default function UserEditPage() {
  const params = useParams<{ id: string }>();
  const userId = params?.id;

  const { user: loggedUser } = useUser();
  const { toast } = useToast();

  const [userData, setUserData] = useState<DashboardUser | null>(null);
  const [fetchingUser, setFetchingUser] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);

  const cacheKey = useMemo(() => {
    return userId ? `${SELECTED_USER_CACHE_PREFIX}:${userId}` : null;
  }, [userId]);

  const displayName = useMemo(() => {
    if (!userData) {
      return "Usuário";
    }

    return userData.pessoa?.nome || userData.email || "Usuário";
  }, [userData]);

  const formatRoleLabel = useCallback((role: string) => {
    return role
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }, []);

  const roleOptions = useMemo(() => {
    return Object.values(UserRoleEnum)
      .filter((value): value is UserRoleEnum => typeof value === "string")
      .map((value) => ({
        value,
        label: formatRoleLabel(value),
      }));
  }, [formatRoleLabel]);

  const formatPhone = useCallback((whatsapp?: string | null) => {
    if (!whatsapp) {
      return "—";
    }

    if (whatsapp.length === 11) {
      return `(${whatsapp.substring(0, 2)}) ${whatsapp.substring(2, 7)}-${whatsapp.substring(7)}`;
    }

    if (whatsapp.length === 10) {
      return `(${whatsapp.substring(0, 2)}) ${whatsapp.substring(2, 6)}-${whatsapp.substring(6)}`;
    }

    return whatsapp;
  }, []);

  const loadUser = useCallback(async () => {
    if (!userId) {
      setFetchError("Identificador do usuário não foi informado.");
      setFetchingUser(false);
      return;
    }

    setFetchingUser(true);
    setFetchError(null);

    try {
      const response = await fetch("/api/ambrosio/user", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Não foi possível carregar o usuário.");
      }

      const payload = await response.json();
      const list: DashboardUser[] = Array.isArray(payload?.data)
        ? payload.data
        : [];
      const foundUser = list.find(
        (currentUser) => String(currentUser.id) === String(userId),
      );

      if (!foundUser) {
        setFetchError("Usuário não encontrado.");
        setUserData(null);
        return;
      }

      setUserData(foundUser);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Erro inesperado ao carregar o usuário.";
      setFetchError(message);
      setUserData(null);
    } finally {
      setFetchingUser(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      setFetchingUser(false);
      setFetchError("Identificador do usuário não foi informado.");
      return;
    }

    if (typeof window !== "undefined" && cacheKey) {
      const cachedValue = window.sessionStorage.getItem(cacheKey);
      if (cachedValue) {
        try {
          const parsed = JSON.parse(cachedValue) as DashboardUser;
          setUserData(parsed);
          setFetchingUser(false);
          return;
        } catch (error) {
          window.sessionStorage.removeItem(cacheKey);
        }
      }
    }

    loadUser();
  }, [cacheKey, loadUser, userId]);

  useEffect(() => {
    if (typeof window === "undefined" || !cacheKey || !userData) {
      return;
    }

    window.sessionStorage.setItem(cacheKey, JSON.stringify(userData));
  }, [cacheKey, userData]);

  const handleUpdateUserStatus = async (nextStatus: boolean) => {
    if (!userId) {
      toast({
        title: "ID não encontrado",
        description: "Não foi possível identificar o usuário.",
        variant: "destructive",
      });
      return;
    }

    setIsUpdatingStatus(true);

    try {
      const response = await fetch(`/api/ambrosio/user/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          active: nextStatus,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result?.message ||
            (nextStatus
              ? "Não foi possível ativar o usuário."
              : "Não foi possível desativar o usuário."),
        );
      }

      setUserData((previous) => {
        if (!previous) {
          return previous;
        }

        return {
          ...previous,
          active: nextStatus,
        };
      });

      toast({
        title: nextStatus ? "Usuário ativado" : "Usuário desativado",
        description: nextStatus
          ? `${displayName} agora está com acesso ativo ao sistema.`
          : `${displayName} não possui mais acesso ativo ao sistema.`,
      });
    } catch (error) {
      const description =
        error instanceof Error
          ? error.message
          : nextStatus
            ? "Erro inesperado ao tentar ativar o usuário."
            : "Erro inesperado ao tentar desativar o usuário.";

      toast({
        title: nextStatus ? "Erro ao ativar" : "Erro ao desativar",
        description,
        variant: "destructive",
      });
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleUpdateUserRole = async (nextRole: UserRoleEnum) => {
    if (!userId || !userData) {
      toast({
        title: "Dados incompletos",
        description: "Não foi possível identificar o usuário.",
        variant: "destructive",
      });
      return;
    }

    if (!nextRole || nextRole === userData.role) {
      return;
    }

    setIsUpdatingRole(true);

    try {
      const response = await fetch(`/api/ambrosio/user/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: nextRole,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result?.message || "Não foi possível atualizar o perfil do usuário.",
        );
      }

      setUserData((previous) => {
        if (!previous) {
          return previous;
        }

        return {
          ...previous,
          role: nextRole,
        };
      });

      toast({
        title: "Perfil atualizado",
        description: `${displayName} agora possui o perfil ${formatRoleLabel(nextRole)}.`,
      });
    } catch (error) {
      const description =
        error instanceof Error
          ? error.message
          : "Erro inesperado ao atualizar o perfil do usuário.";

      toast({
        title: "Erro ao atualizar perfil",
        description,
        variant: "destructive",
      });
    } finally {
      setIsUpdatingRole(false);
    }
  };

  if (loggedUser?.role !== ROLE_ADMIN) {
    return <UnauthorizedAccessAlert title="Usuários" />;
  }

  const userIsActive = Boolean(userData?.active);

  return (
    <div className="space-y-6">
      <PageSubtitle
        title="Status de acesso"
        subTitle="Ative ou desative o acesso deste usuário"
        buttons={[
          {
            buttonText: "Voltar",
            buttonUrl: "/dashboard/usuarios",
            buttonVariant: "outline",
          },
        ]}
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <ShieldCheck className="h-5 w-5" />
                Status do usuário
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Você pode ativar ou desativar o usuário para controlar o acesso
                ao sistema.
              </p>
            </div>

            <Badge variant={userData?.active ? "default" : "destructive"}>
              {userData?.active ? "Ativo" : "Inativo"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase text-muted-foreground">
                ID do usuário
              </p>
              <p className="font-mono text-sm text-foreground">
                {userId || "—"}
              </p>
            </div>

            <Separator />

            {fetchingUser ? (
              <div className="flex items-center gap-3 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Carregando informações do usuário...
              </div>
            ) : fetchError ? (
              <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
                {fetchError}
              </div>
            ) : userData ? (
              <div className="space-y-4">
                <div>
                  <p className="text-lg font-semibold text-foreground">
                    {displayName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {userData.email}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <InfoField label="CPF" value={userData.pessoa?.cpf || "—"} />
                  <InfoField
                    label="WhatsApp"
                    value={formatPhone(userData.whatsapp)}
                  />
                  <InfoField
                    label="Comunidade"
                    value={
                      userData.pessoa?.nome || userData.pessoa?.nome || "—"
                    }
                  />
                </div>

                <div className="space-y-2 rounded-lg border bg-muted/30 p-3">
                  <Label className="text-xs uppercase text-muted-foreground">
                    Perfil do usuário
                  </Label>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Select
                      value={userData.role || undefined}
                      onValueChange={(value) =>
                        handleUpdateUserRole(value as UserRoleEnum)
                      }
                      disabled={
                        isUpdatingRole || fetchingUser || !userData
                      }
                    >
                      <SelectTrigger className="w-full sm:w-64">
                        <SelectValue placeholder="Selecione um perfil" />
                      </SelectTrigger>
                      <SelectContent>
                        {roleOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {isUpdatingRole && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Atualizando perfil...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                Nenhuma informação do usuário disponível.
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild variant="outline">
                <Link href="/dashboard/usuarios">Voltar para a lista</Link>
              </Button>

              <Button
                onClick={() => handleUpdateUserStatus(!userIsActive)}
                variant={userIsActive ? "destructive" : "default"}
                disabled={
                  isUpdatingStatus ||
                  fetchingUser ||
                  !userData ||
                  Boolean(fetchError)
                }
              >
                {isUpdatingStatus && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {userIsActive ? "Desativar usuário" : "Ativar usuário"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

type InfoFieldProps = {
  label: string;
  value: string;
};

function InfoField({ label, value }: InfoFieldProps) {
  return (
    <div className="rounded-lg border bg-muted/30 p-3">
      <p className="text-xs uppercase text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground">{value || "—"}</p>
    </div>
  );
}
