"use client";

import Link from "next/link";
import {
  Users,
  FileText,
  Calendar,
  Wallet,
  TrendingUp,
  ArrowRight,
  Flame,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/page-header";
import { formatBRL, formatDate } from "@/lib/utils";
import { LEAD_STATUS_LABEL, leadStatusVariant } from "@/lib/labels";

export default function DashboardHome() {
  const leads = useStore((s) => s.leads);
  const proposals = useStore((s) => s.proposals);
  const bookings = useStore((s) => s.bookings);
  const payments = useStore((s) => s.payments);

  const activeProposals = proposals.filter(
    (p) => p.status === "SENT" || p.status === "VIEWED",
  );

  const wonLeads = leads.filter((l) => l.status === "WON").length;
  const conversionRate = leads.length ? Math.round((wonLeads / leads.length) * 100) : 0;

  const upcomingEvents = bookings
    .filter((b) => new Date(b.eventDate) > new Date() && b.status !== "CANCELED")
    .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime())
    .slice(0, 5);

  const expectedRevenue = bookings
    .filter((b) => new Date(b.eventDate) > new Date() && b.status !== "CANCELED")
    .reduce((acc, b) => acc + b.totalCost + b.profit, 0);

  const paidThisMonth = payments
    .filter(
      (p) =>
        p.status === "PAID" &&
        new Date(p.dueDate).getMonth() === new Date().getMonth() &&
        new Date(p.dueDate).getFullYear() === new Date().getFullYear(),
    )
    .reduce((acc, p) => acc + p.amount, 0);

  const hotLeads = leads
    .filter((l) => l.status !== "WON" && l.status !== "LOST")
    .sort((a, b) => b.heatScore - a.heatScore)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Visão geral"
        description="Acompanhe sua operação em tempo real."
        action={
          <Link href="/dashboard/leads">
            <Button variant="accent">
              Novo lead
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Users}
          label="Leads ativos"
          value={leads.filter((l) => l.status !== "WON" && l.status !== "LOST").length}
          hint={`${conversionRate}% conversão histórica`}
          color="from-purple-900/40 to-purple-700/10 text-[var(--primary)]"
        />
        <StatCard
          icon={FileText}
          label="Propostas ativas"
          value={activeProposals.length}
          hint={`${proposals.filter((p) => p.status === "ACCEPTED").length} aceitas no total`}
          color="from-orange-900/40 to-orange-700/10 text-[var(--accent)]"
        />
        <StatCard
          icon={Calendar}
          label="Próximos eventos"
          value={upcomingEvents.length}
          hint={
            upcomingEvents[0]
              ? `Próximo: ${formatDate(upcomingEvents[0].eventDate)}`
              : "Sem eventos agendados"
          }
          color="from-sky-900/40 to-sky-700/10 text-sky-400"
        />
        <StatCard
          icon={Wallet}
          label="Recebido no mês"
          value={formatBRL(paidThisMonth)}
          hint={`${formatBRL(expectedRevenue)} previstos`}
          color="from-emerald-900/40 to-emerald-700/10 text-emerald-400"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">Leads quentes</div>
                <div className="text-xs text-[var(--muted-foreground)]">
                  Maior heat score primeiro
                </div>
              </div>
              <Link href="/dashboard/leads">
                <Button variant="ghost" size="sm">
                  Ver CRM <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
            <div className="-mx-2 space-y-1">
              {hotLeads.length === 0 ? (
                <div className="py-6 text-center text-sm text-[var(--muted-foreground)]">
                  Nenhum lead ativo no momento.
                </div>
              ) : (
                hotLeads.map((lead) => (
                  <Link
                    key={lead.id}
                    href={`/dashboard/leads`}
                    className="flex items-center justify-between rounded-lg px-2 py-2.5 transition-colors hover:bg-[var(--secondary)]"
                  >
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate text-sm font-medium">{lead.name}</span>
                      <span className="truncate text-xs text-[var(--muted-foreground)]">
                        {lead.eventType} · {lead.guests} convidados · {formatDate(lead.date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="hidden items-center gap-1 text-xs text-orange-400 sm:flex">
                        <Flame className="h-3 w-3" />
                        {lead.heatScore}
                      </span>
                      <Badge variant={leadStatusVariant(lead.status)}>
                        {LEAD_STATUS_LABEL[lead.status]}
                      </Badge>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">Próximos eventos</div>
                <div className="text-xs text-[var(--muted-foreground)]">
                  Confirmados e agendados
                </div>
              </div>
              <Link href="/dashboard/calendar">
                <Button variant="ghost" size="sm">
                  Agenda <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {upcomingEvents.length === 0 ? (
                <div className="py-6 text-center text-sm text-[var(--muted-foreground)]">
                  Sem eventos próximos.
                </div>
              ) : (
                upcomingEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="rounded-lg border border-[var(--border)] bg-[var(--background)]/40 p-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium">{evt.title}</div>
                        <div className="truncate text-xs text-[var(--muted-foreground)]">
                          {evt.venue}
                        </div>
                      </div>
                      <Badge variant={evt.status === "CONFIRMED" ? "success" : "info"}>
                        {evt.status === "CONFIRMED" ? "Confirmado" : "Agendado"}
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
                      <Calendar className="h-3 w-3" />
                      {formatDate(evt.eventDate)}
                      <TrendingUp className="ml-1.5 h-3 w-3" />
                      <span className="text-emerald-400">{formatBRL(evt.profit)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  color,
}: {
  icon: typeof Users;
  label: string;
  value: number | string;
  hint: string;
  color: string;
}) {
  return (
    <Card className={`bg-gradient-to-br ${color.split(" ").slice(0, 2).join(" ")}`}>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
            {label}
          </div>
          <Icon className={`h-4 w-4 ${color.split(" ")[2]}`} />
        </div>
        <div className="mt-2 text-2xl font-bold sm:text-3xl">{value}</div>
        <div className="mt-1 text-xs text-[var(--muted-foreground)]">{hint}</div>
      </CardContent>
    </Card>
  );
}
