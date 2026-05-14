import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  FileText,
  MessageSquare,
  Sparkles,
  Wallet,
  Zap,
  ArrowRight,
  Music,
  Crown,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FEATURES = [
  {
    icon: FileText,
    title: "Orçamentos automáticos premium",
    description:
      "Propostas que parecem uma experiência profissional — não um PDF improvisado. Link público, aceite online, expiração e branding da sua banda.",
  },
  {
    icon: MessageSquare,
    title: "Follow-ups inteligentes",
    description:
      "O sistema persegue o cliente automaticamente até o fechamento. WhatsApp, e-mail e SMS no momento certo. Você só assina o contrato.",
  },
  {
    icon: Calendar,
    title: "Agenda profissional sem conflitos",
    description:
      "Datas, músicos disponíveis, tempo de montagem e setup. Conflitos detectados em tempo real antes de virar problema.",
  },
  {
    icon: Sparkles,
    title: "CRM visual de leads e eventos",
    description:
      "Nunca mais esqueça um lead. Pipeline kanban com heat score, histórico de contato e próximos passos sempre à vista.",
  },
  {
    icon: Wallet,
    title: "Contratos, pagamentos e confirmação",
    description:
      "Assinatura digital, parcelamento via PIX/cartão e confirmação do evento em um único fluxo. Sem voltar pro WhatsApp.",
  },
];

const PIPELINE_PREVIEW = [
  {
    name: "Camila Souza",
    event: "Casamento • 180 conv.",
    status: "Qualificado",
    heat: 92,
    variant: "info" as const,
  },
  {
    name: "Marcos Oliveira",
    event: "Corporativo • 300 conv.",
    status: "Proposta enviada",
    heat: 78,
    variant: "warning" as const,
  },
  {
    name: "Juliana Pires",
    event: "30 anos • 80 conv.",
    status: "Negociação",
    heat: 85,
    variant: "accent" as const,
  },
];

export default function LandingPage() {
  return (
    <div className="relative">
      <div className="dot-grid absolute inset-0 -z-10 opacity-60" />

      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="bandflow-gradient flex h-8 w-8 items-center justify-center rounded-lg">
              <Music className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">BandFlow</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-[var(--muted-foreground)] md:flex">
            <a href="#features" className="hover:text-[var(--foreground)] transition">
              Recursos
            </a>
            <a href="#preview" className="hover:text-[var(--foreground)] transition">
              Preview
            </a>
            <a href="#pricing" className="hover:text-[var(--foreground)] transition">
              Preço
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login" className="hidden sm:block">
              <Button variant="ghost" size="sm">
                Entrar
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="accent" size="sm">
                Começar grátis
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-24 sm:px-6 sm:pt-24 lg:pt-32">
          <div className="flex flex-col items-center text-center">
            <Badge variant="outline" className="border-[var(--primary)]/40 text-[var(--primary)] mb-6">
              <Sparkles className="mr-1.5 h-3 w-3" />
              14 dias de Trial — sem cartão
            </Badge>
            <h1 className="bandflow-gradient-text max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Pare de perder eventos por demora, bagunça e orçamento no WhatsApp.
            </h1>
            <p className="mt-6 max-w-2xl text-base text-[var(--muted-foreground)] sm:text-lg">
              O sistema que transforma sua banda em uma máquina profissional de fechar eventos com{" "}
              <span className="text-[var(--foreground)]">propostas automáticas</span>,{" "}
              <span className="text-[var(--foreground)]">follow-ups</span> e{" "}
              <span className="text-[var(--foreground)]">contratos online</span>.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/login">
                <Button size="xl" variant="accent" className="w-full sm:w-auto">
                  Começar trial de 14 dias
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="xl" variant="outline" className="w-full sm:w-auto">
                  Ver recursos
                </Button>
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[var(--muted-foreground)]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                Sem cartão de crédito
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                Cancele quando quiser
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                Setup em 5 minutos
              </span>
            </div>
          </div>

          <div id="preview" className="relative mt-16 sm:mt-24">
            <div className="bandflow-glow rounded-3xl border bg-[var(--card)] p-2 sm:p-3 shadow-2xl shadow-black/50">
              <div className="rounded-2xl bg-[var(--background)] p-4 sm:p-6">
                <div className="grid gap-4 lg:grid-cols-3">
                  <Card className="bg-gradient-to-br from-purple-900/30 to-purple-700/10">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between">
                        <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
                          Leads do mês
                        </div>
                        <Users className="h-4 w-4 text-[var(--primary)]" />
                      </div>
                      <div className="mt-2 text-3xl font-bold">28</div>
                      <div className="mt-1 text-xs text-emerald-400">+44% vs mês anterior</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-orange-900/30 to-orange-700/10">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between">
                        <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
                          Propostas ativas
                        </div>
                        <FileText className="h-4 w-4 text-[var(--accent)]" />
                      </div>
                      <div className="mt-2 text-3xl font-bold">12</div>
                      <div className="mt-1 text-xs text-emerald-400">5 aguardando aceite</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-emerald-900/30 to-emerald-700/10">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between">
                        <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
                          Faturamento previsto
                        </div>
                        <Wallet className="h-4 w-4 text-emerald-400" />
                      </div>
                      <div className="mt-2 text-3xl font-bold">R$ 48k</div>
                      <div className="mt-1 text-xs text-emerald-400">7 eventos fechados</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-5 rounded-2xl border bg-[var(--card)]/60 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="text-sm font-semibold">Pipeline de leads</div>
                    <Badge variant="accent">
                      <Zap className="mr-1 h-3 w-3" />
                      Follow-ups automáticos
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {PIPELINE_PREVIEW.map((row) => (
                      <div
                        key={row.name}
                        className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--background)]/40 px-3 py-2.5 text-sm"
                      >
                        <div className="flex min-w-0 flex-col">
                          <span className="truncate font-medium">{row.name}</span>
                          <span className="truncate text-xs text-[var(--muted-foreground)]">
                            {row.event}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[var(--muted-foreground)]">
                            🔥 {row.heat}
                          </span>
                          <Badge variant={row.variant}>{row.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-t border-[var(--border)] bg-[var(--background)]/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Tudo que sua banda precisa para parar de perder eventos
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--muted-foreground)]">
              O WhatsApp não foi feito para gerenciar uma banda. O BandFlow foi.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="hover:border-[var(--primary)]/40 transition-colors">
                <CardContent className="p-6">
                  <div className="bandflow-gradient inline-flex h-10 w-10 items-center justify-center rounded-lg">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-[var(--muted-foreground)]">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Comece grátis. Cresça quando fizer sentido.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[var(--muted-foreground)]">
              14 dias de Trial PRO para testar tudo sem precisar de cartão.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="p-7">
                <div className="text-sm uppercase tracking-wider text-[var(--muted-foreground)]">
                  Free
                </div>
                <div className="mt-1 text-3xl font-bold">R$ 0</div>
                <div className="mt-1 text-xs text-[var(--muted-foreground)]">para sempre</div>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {[
                    "Até 10 leads/mês",
                    "Até 3 propostas ativas",
                    "Sem follow-ups automáticos",
                    "Sem assinatura digital",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="relative border-[var(--primary)] bg-gradient-to-br from-purple-900/20 to-orange-900/10 bandflow-glow">
              <Badge variant="accent" className="absolute -top-3 left-7">
                <Crown className="mr-1 h-3 w-3" /> Recomendado
              </Badge>
              <CardContent className="p-7">
                <div className="text-sm uppercase tracking-wider text-[var(--accent)]">
                  Pro
                </div>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold">R$ 147</span>
                  <span className="text-sm text-[var(--muted-foreground)]">/mês</span>
                </div>
                <div className="mt-1 text-xs text-[var(--muted-foreground)]">
                  Cancele quando quiser
                </div>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {[
                    "Leads ilimitados",
                    "Propostas ilimitadas com link público",
                    "Follow-ups automáticos (WhatsApp/email)",
                    "Contratos com assinatura digital",
                    "Pagamento online (PIX, cartão, boleto)",
                    "Agenda profissional sem conflitos",
                    "CRM visual completo",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--accent)] shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/login" className="mt-6 block">
                  <Button variant="accent" size="lg" className="w-full">
                    Iniciar trial de 14 dias
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] bg-[var(--background)]/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <div className="bandflow-gradient flex h-7 w-7 items-center justify-center rounded-lg">
              <Music className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold">BandFlow</span>
            <span className="text-xs text-[var(--muted-foreground)]">
              © {new Date().getFullYear()}
            </span>
          </div>
          <div className="text-xs text-[var(--muted-foreground)]">
            Feito para bandas que querem profissionalizar a operação.
          </div>
        </div>
      </footer>
    </div>
  );
}
