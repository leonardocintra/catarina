"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export function CadastroForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    whatsapp: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [cadastrando, setCadastrando] = useState(false);

  const schema = z
    .object({
      name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
      email: z.email("E-mail inválido"),
      cpf: z.string().regex(/^\d{11}$/, "CPF deve conter 11 dígitos"),
      whatsapp: z
        .string()
        .min(10, "WhatsApp deve ter no mínimo 10 dígitos")
        .max(11, "WhatsApp deve ter no máximo 11 dígitos"),
      password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Senhas não coincidem",
      path: ["confirmPassword"],
    });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setCadastrando(true);
    setErrorMsg("");

    const parsed = schema.safeParse(formData);
    if (!parsed.success) {
      setErrorMsg(parsed.error.issues[0].message);
      setCadastrando(false);
      return;
    }

    try {
      const res = await fetch("/api/ambrosio/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          cpf: formData.cpf,
          whatsapp: formData.whatsapp,
          password: formData.password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setErrorMsg(errorData.message || "Erro ao criar conta");
        setCadastrando(false);
        return;
      }

      // Redireciona para página de sucesso ou login
      router.push("/cadastro/sucesso");
    } catch (error) {
      setErrorMsg("Erro ao tentar criar conta");
      console.error(error);
      setCadastrando(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleCadastro}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Criar nova conta</h1>
                <p className="text-muted-foreground text-balance">
                  Preencha os dados para se cadastrar
                </p>
              </div>

              {errorMsg && (
                <div className="text-sm text-red-500 text-center">
                  {errorMsg}
                </div>
              )}

              <div className="grid gap-3">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seuemail@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    type="text"
                    placeholder="12345678901"
                    maxLength={11}
                    value={formData.cpf}
                    onChange={(e) =>
                      handleInputChange(
                        "cpf",
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    type="text"
                    placeholder="com DDD Ex: 11999999999"
                    maxLength={11}
                    value={formData.whatsapp}
                    onChange={(e) =>
                      handleInputChange(
                        "whatsapp",
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirme sua senha"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={true}>
                {cadastrando ? "Cadastrando..." : "Criar conta"}
              </Button>

              <div className="text-center text-sm">
                Já tem uma conta?{" "}
                <Link
                  href="/"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Fazer login
                </Link>
              </div>

              <div className="text-red-700 text-center font-semibold text-xs">
                Atenção! Cadastros manuais foram desativados temporariamente.
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <Image
              src="/logo.webp"
              width={500}
              height={500}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 uppercase">
        &copy; {new Date().getFullYear()} - Caminho Neocatecumenal do Brasil
      </div>
    </div>
  );
}
