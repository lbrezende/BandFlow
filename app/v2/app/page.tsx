"use client";

import Link from "next/link";
import {
  Users,
  FileText,
  Calendar,
  Wallet,
  Flame,
  ArrowUpRight,
  TrendingUp,
  Mic2,
  Star,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { Seal } from "@/components/v2/seal";
import { PillButton } from "@/components/v2/pill-button";
import { formatBRL, formatDate } from "@/lib/utils";
import { LEAD_STATUS_LABEL } from "@/lib/labels";

export default function V2AppHome() {
  const leads = useStore((s) => s.leads);
  const proposals = useStore((s) => s.proposals);
  const bookings = useStore((s) => s.bookings);
  const payments = useStore((s) => s.payments);
  const band = useStore((s) => s.band);

  const activeProposals = proposals.filter((p) => ["DRAFT", "SENT", "VIEWED"].includes(p.status));
  const wonLeads = leads.filter((l) => l.status === "WON").length;
  const conversionRate = leads.length ? Math.round((wonLeads / leads.length) * 100) : 0;
  const upcoming = bookings
    .filter((b) => new Date(b.eventDate) > new Date() && b.status !== "CANCELED")
    .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
  const monthRevenue = payments
    .filter(
      (p) =>
        p.status === "PAID" &&
        new Date(p.dueDate).getMonth() === new Date().getMonth() &&
        new Date(p.dueDate).getFullYear() === new Date().getFullYear(),
    )
    .reduce((a, p) => a + p.amount, 0);

  const hot = leads
    .filter((l) => l.status !== "WON" && l.status !== "LOST")
    .sort((a, b) => b.heatScore - a.heatScore)
    .slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Hero block */}
      <div className="grid gap-5 lg:grid-cols-[1fr_minmax(0,320px)]">
        <div className="v2-card-outline relative overflow-hidden rounded-3xl bg-[#c8f36d] p-7 text-[#0c1a18]">
          <div className="absolute right-6 top-6">
            <Seal color="#5630f0" outline="#0c1a18" size={56}>
              <Mic2 className="h-5 w-5 text-white" />
            </Seal>
          </div>
          <div className="text-xs font-semibold uppercase tracking-wider opacity-70">
            Olá, {band.name}
          </div>
          <h1 className="v2-display mt-2 text-4xl sm:text-5xl lg:text-6xl">
            {upcoming.length > 0
              ? `${upcoming.length} shows na sua agenda.`
              : "Sua agenda está limpa."}
          </h1>
          <p className="mt-3 max-w-md text-sm sm:text-base opacity-80">
            Pipeline com {leads.length} leads, {activeProposals.length} propostas ativas e{" "}
            {formatBRL(monthRevenue)} recebidos no mês.
          </p>
          <div className="mt-6">
            <PillButton href="/v2/app/leads" variant="purple" size="md">
              Abrir CRM
            </PillButton>
          </div>
        </div>

        <div className="v2-card-outline rounded-3xl bg-[#e26ebf] p-6 text-[#0c1a18]">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider opacity-70">
                Recebido no mês
              </div>
              <div className="v2-display mt-2 text-4xl">{formatBRL(monthRevenue)}</div>
            </div>
            <Seal color="#f5c846" outline="#0c1a18" size={48}>
              <Wallet className="h-4 w-4" />
            </Seal>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs">
            <TrendingUp className="h-3 w-3" />
            <span className="font-semibold">+{conversionRate}%</span>
            <span className="opacity-70">conversão histórica</span>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2 text-center">
            <Mini label="Leads" value={leads.length} />
            <Mini label="Propostas" value={activeProposals.length} />
            <Mini label="Shows" value={bookings.length} />
          </div>
        </div>
      </div>

      {/* Color stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Users className="h-4 w-4" />}
          label="Leads ativos"
          value={leads.filter((l) => l.status !== "WON" && l.status !== "LOST").length}
          bg="#f5c846"
          sealColor="#5630f0"
        />
        <StatCard
          icon={<FileText className="h-4 w-4" />}
          label="Propostas ativas"
          value={activeProposals.length}
          bg="#a89af2"
          sealColor="#c8f36d"
        />
        <StatCard
          icon={<Calendar className="h-4 w-4" />}
          label="Shows futuros"
          value={upcoming.length}
          bg="#e26ebf"
          sealColor="#f5c846"
        />
        <StatCard
          icon={<Wallet className="h-4 w-4" />}
          label="Conversão"
          value={`${conversionRate}%`}
          bg="#c8f36d"
          sealColor="#e26ebf"
        />
      </div>

      {/* Two-column lists */}
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="v2-card-outline rounded-3xl bg-[#102725] p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="v2-display-tight text-2xl text-white">Leads quentes</div>
              <p className="text-xs text-white/55">Os 4 com maior heat score</p>
            </div>
            <Link
              href="/v2/app/leads"
              className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 hover:bg-white/5"
            >
              Ver tudo <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="mt-4 space-y-2">
            {hot.length === 0 ? (
              <div className="rounded-2xl border border-white/10 p-6 text-center text-sm text-white/50">
                Nenhum lead quente no momento.
              </div>
            ) : (
              hot.map((l) => (
                <div
                  key={l.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-[#0e201d] px-4 py-3"
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-white">{l.name}</div>
                    <div className="truncate text-xs text-white/50">
                      {l.eventType} · {l.guests} convidados · {formatDate(l.date)}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 text-xs text-[#f5c846]">
                      <Flame className="h-3 w-3" />
                      {l.heatScore}
                    </span>
                    <span className="rounded-full bg-white/8 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/80">
                      {LEAD_STATUS_LABEL[l.status]}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="v2-card-outline rounded-3xl bg-[#ede5d3] p-6 text-[#0c1a18]">
          <div className="flex items-center justify-between">
            <div>
              <div className="v2-display-tight text-2xl">Próximos shows</div>
              <p className="text-xs opacity-65">Confirmados e agendados</p>
            </div>
            <Link
              href="/v2/app/calendar"
              className="inline-flex items-center gap-1 rounded-full border border-[#0c1a18]/15 bg-white/40 px-3 py-1.5 text-xs hover:bg-white/70"
            >
              Agenda <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="mt-4 space-y-2.5">
            {upcoming.length === 0 ? (
              <div className="rounded-2xl border border-[#0c1a18]/15 bg-white/40 p-6 text-center text-sm opacity-65">
                Sem shows agendados.
              </div>
            ) : (
              upcoming.slice(0, 4).map((b) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-[#0c1a18]/10 bg-white/55 px-4 py-3"
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{b.title}</div>
                    <div className="truncate text-xs opacity-60">
                      {b.venue} · {formatDate(b.eventDate)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="v2-display-tight text-base">{formatBRL(b.profit)}</div>
                    <div className="text-[10px] uppercase tracking-wider opacity-60">
                      {b.status === "CONFIRMED" ? "Confirmado" : "Agendado"}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* CTA strip */}
      <div className="v2-card-outline relative overflow-hidden rounded-3xl bg-[#5630f0] p-7 text-white">
        <div className="absolute right-6 top-6 hidden sm:block">
          <Seal color="#c8f36d" outline="#0c1a18" size={48}>
            <Star className="h-4 w-4 text-[#0c1a18]" />
          </Seal>
        </div>
        <div className="v2-display text-3xl sm:text-4xl">Continue de onde parou.</div>
        <p className="mt-2 max-w-lg text-sm text-white/70">
          As outras seções do app estão na sidebar. Tudo o que você fizer aqui também
          é refletido na versão original em /dashboard.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <PillButton href="/v2/app/proposals" variant="cream" size="md">
            Criar proposta
          </PillButton>
          <PillButton href="/v2/app/leads" variant="ghost" size="md">
            Novo lead
          </PillButton>
        </div>
      </div>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl border border-[#0c1a18]/10 bg-white/40 p-2">
      <div className="v2-display-tight text-xl">{value}</div>
      <div className="text-[10px] uppercase tracking-wider opacity-60">{label}</div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  bg,
  sealColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  bg: string;
  sealColor: string;
}) {
  return (
    <div
      className="v2-card-outline relative rounded-3xl p-5 text-[#0c1a18]"
      style={{ backgroundColor: bg }}
    >
      <div className="absolute right-4 top-4">
        <Seal color={sealColor} outline="#0c1a18" size={36}>
          <div className="text-[#0c1a18]">{icon}</div>
        </Seal>
      </div>
      <div className="text-xs font-semibold uppercase tracking-wider opacity-65">{label}</div>
      <div className="v2-display mt-2 text-4xl">{value}</div>
    </div>
  );
}
