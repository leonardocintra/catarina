"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IMaskInput } from "react-imask";
import { CheckCircle, Search, User } from "lucide-react";
import { Pessoa } from "neocatecumenal";

export function CadastroForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [step, setStep] = useState<"cpf" | "dados">("cpf");
  const [cpf, setCpf] = useState("");
  const [userPessoaData, setUserPessoaData] = useState<Pessoa | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    whatsapp: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [cadastrando, setCadastrando] = useState(false);

  const cpfSchema = z.object({
    cpf: z.string().regex(/^\d{11}$/, "CPF deve conter 11 dígitos"),
  });

  const dadosSchema = z
    .object({
      email: z.email("E-mail inválido"),
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

  const handleBuscarCpf = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const parsed = cpfSchema.safeParse({ cpf });
    if (!parsed.success) {
      setErrorMsg(parsed.error.issues[0].message);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/ambrosio/pessoa/cpf/${cpf}`);

      if (!res.ok) {
        if (res.status === 404) {
          setErrorMsg("CPF não encontrado no sistema");
        } else {
          setErrorMsg("Erro ao buscar CPF");
        }
        setLoading(false);
        return;
      }

      const data = await res.json();
      setUserPessoaData(data);
      setStep("dados");
    } catch (error) {
      setErrorMsg("Erro ao tentar buscar CPF");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setCadastrando(true);
    setErrorMsg("");

    const parsed = dadosSchema.safeParse(formData);
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
          name: userPessoaData?.nome,
          email: formData.email,
          cpf: cpf,
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

      router.push("/dashboard/usuarios");
    } catch (error) {
      setErrorMsg("Erro ao tentar criar conta");
      setCadastrando(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleVoltarCpf = () => {
    setStep("cpf");
    setUserPessoaData(null);
    setErrorMsg("");
    setFormData({
      email: "",
      whatsapp: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 max-w-xl mx-auto">
        <CardContent className="">
          {step === "cpf" ? (
            <form className="p-6 md:p-8" onSubmit={handleBuscarCpf}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-primary/10 rounded-full">
                    <Search className="h-8 w-8 text-primary" />
                  </div>
                  <h1 className="text-2xl font-bold">Buscar por CPF</h1>
                  <p className="text-muted-foreground text-balance">
                    Digite seu CPF da pessoa cadastrada no sistema. Caso não
                    encontre, entre em contato com o administrador. Ou verifique
                    se foi cadastrado corretamente.
                  </p>
                </div>

                {errorMsg && (
                  <div className="text-sm text-red-500 text-center bg-red-50 p-3 rounded-md">
                    {errorMsg}
                  </div>
                )}

                <div className="grid gap-3">
                  <Label htmlFor="cpf">CPF</Label>
                  <IMaskInput
                    mask="000.000.000-00"
                    placeholder="000.000.000-00"
                    value={cpf}
                    onAccept={(value) => {
                      const numericCpf = value.replace(/\D/g, "");
                      setCpf(numericCpf);
                    }}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Buscando..." : "Buscar CPF"}
                </Button>
              </div>
            </form>
          ) : (
            <form className="p-6 md:p-8" onSubmit={handleCadastro}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-green-100 rounded-full">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h1 className="text-2xl font-bold">CPF Encontrado!</h1>
                  <p className="text-muted-foreground text-balance">
                    Complete os dados para criar conta de um usuário
                  </p>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {userPessoaData?.nome} ({userPessoaData?.conhecidoPor})
                      </p>
                      <p className="text-sm text-muted-foreground">
                        CPF:{" "}
                        {cpf.replace(
                          /(\d{3})(\d{3})(\d{3})(\d{2})/,
                          "$1.$2.$3-$4",
                        )}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleVoltarCpf}
                    className="mt-2 w-full"
                  >
                    Alterar CPF
                  </Button>
                </div>

                {errorMsg && (
                  <div className="text-sm text-red-500 text-center bg-red-50 p-3 rounded-md">
                    {errorMsg}
                  </div>
                )}

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

                <div className="grid gap-3">
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <IMaskInput
                    mask="(00) 00000-0000"
                    placeholder="(00) 00000-0000"
                    value={formData.whatsapp}
                    onAccept={(value) => {
                      const numericWhatsapp = value.replace(/\D/g, "");
                      handleInputChange("whatsapp", numericWhatsapp);
                    }}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
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

                <Button type="submit" className="w-full">
                  {cadastrando ? "Cadastrando..." : "Cadatrar usuario"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
