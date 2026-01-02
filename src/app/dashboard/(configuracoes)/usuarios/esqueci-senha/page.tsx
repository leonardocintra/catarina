"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Mail, Phone, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EsqueciSenhaPage() {
  return (
    <div className="bg-linear-to-br flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Esqueci a Senha</CardTitle>
            <CardDescription>Recupere acesso à sua conta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Acesso Restrito</AlertTitle>
              <AlertDescription>
                Para alterar sua senha, você precisa entrar em contato com os
                administradores do sistema.
              </AlertDescription>
            </Alert>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-4">
              <div>
                <h3 className="font-semibold text-sm mb-3 text-blue-900 dark:text-blue-100">
                  Entre em contato com:
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email
                      </p>
                      <a
                        href="mailto:admin@cncbrasil.cn.org.br"
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        leonardo.ncintra@outlook.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Whastapp
                      </p>
                      <a
                        href="tel:+5516991234567"
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        +55 (16) 9 99973-5008
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-sm text-gray-600 dark:text-gray-400">
              <p>
                Ao entrar em contato, informe seu nome de usuário e email
                cadastrado no sistema para que possamos verificar sua
                identidade.
              </p>
            </div>

            <Button asChild className="w-full" variant="outline">
              <Link
                href="/login"
                className="flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar ao Login
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
