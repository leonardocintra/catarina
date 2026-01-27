"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Mail, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

const SUPPORT_EMAIL = "leonardo.ncintra@outlook.com";
const SUPPORT_WHATSAPP_DISPLAY = "+55 (16) 9 99973-5008";
const SUPPORT_WHATSAPP_LINK = "https://wa.me/55169999735008";

export default function ForgotPasswordRootPage() {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      toast({
        title: "Informe um email válido",
        description: "Precisamos do email cadastrado para prosseguir com a solicitação.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch("/api/ambrosio/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          typeof payload.message === "string"
            ? payload.message
            : "Não foi possível enviar a solicitação. Tente novamente."
        );
      }

      toast({
        title: "Solicitação enviada",
        description:
          "Verifique o seu email. Você receberá uma senha temporária e deverá trocá-la assim que acessar o painel.",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Falha ao enviar",
        description:
          error instanceof Error
            ? error.message
            : "Erro inesperado. Tente novamente em instantes.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl space-y-6">
        <Card className="shadow-lg">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl">Esqueci a senha</CardTitle>
            <CardDescription>
              Informe o email cadastrado para receber uma senha temporária. Ela será enviada para sua caixa de entrada
              e precisa ser alterada logo após o primeiro acesso.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email cadastrado</Label>
                <Input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="usuario@cnc.org.br"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <Alert>
                <ShieldCheck className="h-4 w-4" />
                <AlertTitle>Senha temporária e validação</AlertTitle>
                <AlertDescription>
                  O sistema enviará uma senha temporária para o seu email e o time CNC confirmará seus dados. Assim que
                  conseguir acessar, acesse o menu de perfil e atualize a senha definitiva.
                </AlertDescription>
              </Alert>

              <Button type="submit" className="w-full" disabled={isSending}>
                {isSending ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Enviando solicitação...
                  </span>
                ) : (
                  "Enviar solicitação"
                )}
              </Button>

              <Button asChild variant="ghost" className="w-full">
                <Link href="/login" className="flex items-center justify-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Voltar ao login
                </Link>
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Outros canais</CardTitle>
            <CardDescription>
              Se preferir falar diretamente com um administrador do sistema, utilize os contatos abaixo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3 rounded-lg border border-blue-100 dark:border-blue-900/40 bg-blue-50/60 dark:bg-blue-900/10 p-3">
                <div className="mt-0.5 rounded-md bg-blue-100 dark:bg-blue-900/50 p-2">
                  <Mail className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Email</p>
                  <a
                    className="text-sm text-blue-600 dark:text-blue-300 hover:underline"
                    href={`mailto:${SUPPORT_EMAIL}`}
                  >
                    {SUPPORT_EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/60 dark:bg-emerald-900/10 p-3">
                <div className="mt-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/50 p-2">
                  <Phone className="h-5 w-5 text-emerald-700 dark:text-emerald-300" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">WhatsApp</p>
                  <a
                    className="text-sm text-emerald-600 dark:text-emerald-300 hover:underline"
                    href={SUPPORT_WHATSAPP_LINK}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {SUPPORT_WHATSAPP_DISPLAY}
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
