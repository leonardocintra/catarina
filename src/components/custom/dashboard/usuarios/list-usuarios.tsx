"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  Phone,
  Mail,
  Shield,
  CheckCircle,
  XCircle,
  Calendar,
  Loader2,
} from "lucide-react";
import { User } from "neocatecumenal";

export default function ListUsuarios() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/ambrosio/user");

      if (!response.ok) {
        throw new Error("Erro ao carregar usuários");
      }

      const data = await response.json();
      setUsers(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getRoleBadge = (role: string) => {
    const roleMap = {
      ADMIN: { label: "Admin", variant: "default" as const },
      NAO_IDENTIFICADO: {
        label: "Não identificado",
        variant: "destructive" as const,
      },
    };

    return (
      roleMap[role as keyof typeof roleMap] || {
        label: role,
        variant: "outline" as const,
      }
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatPhone = (whatsapp: string) => {
    // Formata o número: 16999999999 -> (16) 99999-9999
    if (whatsapp.length === 11) {
      return `(${whatsapp.substring(0, 2)}) ${whatsapp.substring(
        2,
        7
      )}-${whatsapp.substring(7)}`;
    } else if (whatsapp.length === 10) {
      return `(${whatsapp.substring(0, 2)}) ${whatsapp.substring(
        2,
        6
      )}-${whatsapp.substring(6)}`;
    }
    return whatsapp;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Carregando usuários...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={fetchUsers} variant="outline">
              Tentar novamente
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Lista de Usuários
            <Badge variant="secondary" className="ml-auto">
              {users.length} usuário{users.length !== 1 ? "s" : ""}
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {users.map((user) => {
          const roleBadge = getRoleBadge(user.role);

          return (
            <Card key={user.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/user.png" alt={user.email} />
                    </Avatar>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{user.email}</h3>
                        <Badge variant={roleBadge.variant}>
                          <Shield className="h-3 w-3 mr-1" />
                          {roleBadge.label}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>{user.email}</span>
                        </div>

                        {user.whatsapp && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            <span>{formatPhone(user.whatsapp)}</span>
                            {user.verifiedWhatsapp ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {/* <span>Criado em {formatDate(user.createdAt)}</span> */}
                          <span>Criado em 11/08/2025 </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={user.active ? "default" : "secondary"}>
                      {user.active ? "Ativo" : "Inativo"}
                    </Badge>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" disabled>
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        disabled
                        variant={user.active ? "destructive" : "default"}
                      >
                        {user.active ? "Desativar" : "Ativar"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {users.length === 0 && (
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <div className="text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum usuário encontrado</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
