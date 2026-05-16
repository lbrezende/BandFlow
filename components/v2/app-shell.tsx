"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  Music2,
  Zap,
  FileSignature,
  Wallet,
  Settings,
  Menu,
  X,
  LogOut,
  Music,
  ArrowLeftRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/v2/app", label: "Visão geral", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/leads", label: "Leads", icon: Users },
  { href: "/dashboard/proposals", label: "Propostas", icon: FileText },
  { href: "/dashboard/calendar", label: "Agenda", icon: Calendar },
  { href: "/dashboard/musicians", label: "Músicos", icon: Music2 },
  { href: "/dashboard/automations", label: "Automações", icon: Zap },
  { href: "/dashboard/contracts", label: "Contratos", icon: FileSignature },
  { href: "/dashboard/payments", label: "Pagamentos", icon: Wallet },
  { href: "/dashboard/settings", label: "Configurações", icon: Settings },
];

export function V2AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const initials = (session?.user?.name ?? "Banda Teste")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const SidebarBody = () => (
    <div className="flex h-full flex-col">
      <Link
        href="/v2"
        className="m-3 inline-flex items-center gap-2 self-start rounded-full bg-[#5630f0] px-3 py-1.5 text-white"
      >
        <Music className="h-4 w-4" />
        <span className="v2-display-tight text-base">BandFlow!</span>
      </Link>
      <nav className="flex-1 overflow-y-auto px-3 pb-3">
        <ul className="space-y-1">
          {NAV.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-[#c8f36d] text-[#0c1a18]"
                      : "text-white/70 hover:bg-white/5 hover:text-white",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="m-3 rounded-2xl bg-[#e26ebf] p-4 text-[#0c1a18]">
        <div className="v2-display-tight text-lg">Trial PRO</div>
        <p className="mt-1 text-xs">Aproveite recursos ilimitados por 14 dias.</p>
      </div>
      <div className="m-3 mt-0 flex items-center gap-2 rounded-2xl border border-white/10 p-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5630f0] text-xs font-bold text-white">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-xs font-semibold text-white">
            {session?.user?.name}
          </div>
          <div className="truncate text-[10px] text-white/50">
            {session?.user?.email}
          </div>
        </div>
        <button
          aria-label="Sair"
          onClick={() => signOut({ callbackUrl: "/v2" })}
          className="rounded-full p-1.5 text-white/60 hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 border-r border-white/8 bg-[#102725] lg:block">
        <SidebarBody />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-white/8 bg-[#0e201d]/85 px-4 backdrop-blur-md sm:px-6">
          <button
            aria-label="Abrir menu"
            onClick={() => setOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/8 text-white lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div className="hidden lg:block">
            <div className="v2-display-tight text-xl text-white">
              {NAV.find((n) =>
                n.exact ? pathname === n.href : pathname === n.href || pathname.startsWith(`${n.href}/`),
              )?.label ?? "Visão geral"}
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 hover:bg-white/5"
            >
              <ArrowLeftRight className="h-3 w-3" />
              Versão original
            </Link>
          </div>
        </header>
        <main className="flex-1 bg-[#0e201d] p-4 sm:p-6 lg:p-8">{children}</main>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 bg-[#102725] shadow-2xl">
            <button
              aria-label="Fechar menu"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white"
            >
              <X className="h-4 w-4" />
            </button>
            <SidebarBody />
          </aside>
        </div>
      )}
    </div>
  );
}
