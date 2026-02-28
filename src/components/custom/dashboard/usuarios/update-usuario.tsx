"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { User } from "neocatecumenal";

type DashboardUser = User & {
  nome?: string;
  pessoa?: {
    nome?: string;
  };
};

interface UpdateUsuarioProps {
  user: DashboardUser;
  onSuccess?: () => void;
}

export function UpdateUsuario({ user, onSuccess }: UpdateUsuarioProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: user.email || "",
    whatsapp: user.whatsapp || "",
    active: user.active ?? true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Enviando apenas os campos que foram alterados
      const updateData: Record<string, any> = {};
      if (formData.email) updateData.email = formData.email;
      if (formData.whatsapp) updateData.whatsapp = formData.whatsapp;
      updateData.active = formData.active;

      const response = await fetch(`/api/ambrosio/user/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Erro ao atualizar usuário"
        );
      }

      setIsOpen(false);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button size="sm" variant="default">
          Editar
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Editar Usuário</DrawerTitle>
          <DrawerDescription>
            Atualize os dados do usuário {user.email}
          </DrawerDescription>
        </DrawerHeader>

        <form onSubmit={handleSubmit} className="px-4 space-y-4 flex flex-col items-center">
          {error && (
            <Card className="p-3 bg-red-50 border-red-200 max-w-md w-full">
              <p className="text-sm text-red-600">{error}</p>
            </Card>
          )}

          <div className="max-w-md space-y-4 w-full">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Digite o email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                id="whatsapp"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="Digite o WhatsApp (10 ou 11 dígitos)"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                id="active"
                name="active"
                type="checkbox"
                checked={formData.active}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="active" className="mb-0 cursor-pointer">
                Ativo
              </Label>
            </div>
          </div>

          <DrawerFooter className="flex flex-row gap-2 justify-center px-0 pt-0 w-full max-w-md">
            <DrawerClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DrawerClose>
            <Button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Atualizando..." : "Atualizar"}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
