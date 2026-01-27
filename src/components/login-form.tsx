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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [autenticando, setAutenticando] = useState(false);

  const schema = z.object({
    email: z.string().min(1, "Informe o e-mail ou CPF"),
    password: z.string().min(1, "Informe a senha"),
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAutenticando(true);
    setErrorMsg("");

    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      setErrorMsg(parsed.error.issues[0].message);
      setAutenticando(false);
      return;
    }

    try {
      const res = await fetch("/api/ambrosio/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setErrorMsg("Credenciais inválidas");
        setAutenticando(false);
        return;
      }
      router.push("/dashboard");
    } catch (error) {
      setErrorMsg("Erro ao tentar logar");
      console.error(error);
      setAutenticando(false);
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center py-8 pb-20">
                <h1 className="text-2xl font-bold">Bem vindo de volta!</h1>
                <p className="text-muted-foreground text-balance">
                  Faça login na sua conta CNC
                </p>
              </div>
              {errorMsg && (
                <div className="text-sm text-red-500 text-center">
                  {errorMsg}
                </div>
              )}
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seuemail@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/esqueci-senha"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Esqueceu sua senha ?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={autenticando}>
                {autenticando ? "Autenticando..." : "Entrar"}
              </Button>
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
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 space-y-2">
        <div className="uppercase text-sm font-semibold text-shadow-2xs">
          &copy; {new Date().getFullYear()} - Caminho Neocatecumenal do Brasil
        </div>
        <div>
          Associacao Virgem do Terceiro Milenio para a Evangelizacao Itinerante
        </div>
        <div>
          CNPJ:<strong> 06.108.869/0001-30</strong>
        </div>
      </div>
    </div>
  );
}
