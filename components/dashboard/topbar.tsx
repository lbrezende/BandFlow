"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Menu, LogOut, Crown } from "lucide-react";
import { Sidebar } from "./sidebar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useStore } from "@/lib/store";
import Link from "next/link";

export function Topbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const band = useStore((s) => s.band);
  const plan = useStore((s) => s.plan);
  const trialEndsAt = useStore((s) => s.trialEndsAt);

  const daysLeft = trialEndsAt
    ? Math.max(0, Math.ceil((new Date(trialEndsAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  const initials = (session?.user?.name ?? band.name)
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[var(--border)] bg-[var(--background)]/80 px-4 backdrop-blur-xl sm:px-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
        <div className="hidden lg:block">
          <div className="text-sm font-semibold">{band.name}</div>
          <div className="text-xs text-[var(--muted-foreground)]">{band.city}</div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {plan === "TRIAL" && (
          <Link
            href="/dashboard/settings"
            className="hidden items-center gap-1.5 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium text-[var(--accent)] sm:inline-flex"
          >
            <Crown className="h-3 w-3" />
            Trial · {daysLeft} dias restantes
          </Link>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full transition-opacity hover:opacity-80">
              <Avatar className="h-9 w-9 border border-[var(--border)]">
                <AvatarFallback className="bandflow-gradient text-white text-xs font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="text-sm font-medium text-[var(--foreground)]">
                {session?.user?.name}
              </div>
              <div className="text-xs text-[var(--muted-foreground)]">{session?.user?.email}</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">Configurações</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-red-400 focus:text-red-300"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[280px] p-0 sm:max-w-[280px]">
          <DialogTitle className="sr-only">Menu de navegação</DialogTitle>
          <div className="h-[80vh]">
            <Sidebar onNavigate={() => setOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
