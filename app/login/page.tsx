"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft, Loader2, Music } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/dashboard";

  const [username, setUsername] = useState("teste");
  const [password, setPassword] = useState("teste");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      if (result?.error || !result?.ok) {
        toast.error("Usuário ou senha inválidos", {
          description: "Use teste / teste para acessar a demo.",
        });
        setLoading(false);
        return;
      }
      toast.success("Bem-vindo de volta!");
      router.replace(callbackUrl);
      router.refresh();
    } catch {
      toast.error("Algo deu errado, tente novamente.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Usuário</Label>
        <Input
          id="username"
          type="text"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="teste"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="teste"
          required
        />
      </div>
      <Button type="submit" disabled={loading} size="lg" variant="accent" className="w-full">
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Entrando...
          </>
        ) : (
          "Entrar no BandFlow"
        )}
      </Button>
      <div className="rounded-lg border border-[var(--border)] bg-[var(--background)]/40 p-3 text-xs text-[var(--muted-foreground)]">
        <div className="font-medium text-[var(--foreground)]">Credenciais de teste</div>
        <div className="mt-1">
          Usuário <span className="font-mono text-[var(--accent)]">teste</span> · Senha{" "}
          <span className="font-mono text-[var(--accent)]">teste</span>
        </div>
      </div>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12 sm:px-6">
      <div className="dot-grid absolute inset-0 -z-10 opacity-50" />
      <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Button>
        </Link>
      </div>
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="bandflow-gradient bandflow-glow mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
            <Music className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Entrar no BandFlow</h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Acesse seu painel e continue fechando eventos.
          </p>
        </div>
        <Card>
          <CardContent className="p-6">
            <Suspense fallback={<div className="text-sm">Carregando...</div>}>
              <LoginForm />
            </Suspense>
          </CardContent>
        </Card>
        <p className="mt-6 text-center text-xs text-[var(--muted-foreground)]">
          Ao continuar, você concorda com os termos de uso e política de privacidade.
        </p>
      </div>
    </div>
  );
}
