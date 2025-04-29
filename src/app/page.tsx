"use client";

import Image from "next/image";
import Link from "next/link";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeModeToggle } from "@/components/custom/theme-toggle";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ButtonLoading } from "@/components/custom/ui/ButtonLoading";

export default function HomeLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [autenticando, setAutenticando] = useState(false);

  const schema = z.object({
    email: z.string().min(1, "Informe o e-mail ou CPF"),
    password: z.string().min(1, "Informe a senha"),
  });

  const handleLogin = async () => {
    setAutenticando(true);
    setErrorMsg("");

    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      setErrorMsg(parsed.error.errors[0].message);
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
    }
  };

  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid max-w-md">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-400">
              CNC - Gestão de Catecúmenos
            </h1>
            <p className="text-balance text-muted-foreground my-4">
              Entre com seu email ou CPF para fazer login no sistema
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email ou CPF</Label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
                <Link
                  href="/esqueci-senha"
                  className="ml-auto inline-block text-sm underline"
                >
                  Esqueceu sua senha?
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
            {errorMsg && (
              <p className="text-red-500 text-sm text-center">{errorMsg}</p>
            )}

            {autenticando ? (
              <ButtonLoading text="Autenticando ..." />
            ) : (
              <Button type="button" className="w-full" onClick={handleLogin}>
                Entrar
              </Button>
            )}
          </div>
          <div className="flex justify-center items-center space-x-2 my-4">
            <div>
              <span>Escolha o tema </span>
            </div>
            <ThemeModeToggle />
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative">
        <Image
          src="/logo.webp"
          alt="Image"
          fill
          className="object-cover w-full h-full"
          priority
        />
      </div>
    </div>
  );
}
