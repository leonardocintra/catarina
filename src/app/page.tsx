import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeModeToggle } from "@/components/custom/theme-toggle";

export default function Home() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
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
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
                <Link
                  href="/dashboard"
                  className="ml-auto inline-block text-sm underline"
                >
                  Esqueceu sua senha ?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Link href={"/dashboard"}>
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </Link>
          </div>
          <div className="flex justify-center items-center space-x-2 my-4">
            <div>
              <span>Escolha o tema </span>
            </div>
            <ThemeModeToggle />
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image src="/logo.webp" alt="Image" width="1920" height="1080" />
      </div>
    </div>
  );
}
