"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  Music2,
  FileSignature,
  Wallet,
  Settings,
  Zap,
  Music,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/dashboard", label: "Visão geral", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/leads", label: "Leads (CRM)", icon: Users },
  { href: "/dashboard/proposals", label: "Propostas", icon: FileText },
  { href: "/dashboard/calendar", label: "Agenda", icon: Calendar },
  { href: "/dashboard/musicians", label: "Músicos", icon: Music2 },
  { href: "/dashboard/automations", label: "Automações", icon: Zap },
  { href: "/dashboard/contracts", label: "Contratos", icon: FileSignature },
  { href: "/dashboard/payments", label: "Pagamentos", icon: Wallet },
  { href: "/dashboard/settings", label: "Configurações", icon: Settings },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-[var(--border)] bg-[var(--card)]/40 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between border-b border-[var(--border)] px-4">
        <Link href="/dashboard" className="flex items-center gap-2" onClick={onNavigate}>
          <div className="bandflow-gradient flex h-8 w-8 items-center justify-center rounded-lg">
            <Music className="h-4 w-4 text-white" />
          </div>
          <span className="text-base font-bold tracking-tight">BandFlow</span>
        </Link>
        {onNavigate && (
          <Button variant="ghost" size="icon" onClick={onNavigate} className="lg:hidden">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {NAV.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-[var(--primary)]/15 text-[var(--foreground)] border border-[var(--primary)]/30"
                      : "text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)]",
                  )}
                >
                  <Icon className={cn("h-4 w-4", active && "text-[var(--accent)]")} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="border-t border-[var(--border)] p-3">
        <div className="rounded-lg bg-gradient-to-br from-purple-900/40 to-orange-900/30 p-3">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <Zap className="h-3 w-3 text-[var(--accent)]" />
            Trial PRO
          </div>
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">
            Aproveite recursos ilimitados por 14 dias.
          </p>
        </div>
      </div>
    </aside>
  );
}
