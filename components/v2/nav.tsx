"use client";

import Link from "next/link";
import { useState } from "react";
import { Music, Menu, X } from "lucide-react";

const ITEMS = [
  { href: "#home", label: "Início" },
  { href: "#why", label: "Por quê" },
  { href: "#features", label: "Recursos" },
  { href: "#process", label: "Processo" },
];

export function V2Nav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-4 z-30 flex justify-center px-4">
      <div className="pointer-events-auto v2-rainbow-nav flex w-full max-w-5xl items-center justify-between gap-4 rounded-full px-3 py-2 sm:px-4 sm:py-2.5">
        <Link
          href="/v2"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#5630f0] px-3 py-1.5 text-white"
        >
          <Music className="h-4 w-4" />
          <span className="v2-display-tight text-base sm:text-lg">BandFlow!</span>
        </Link>
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-white/85">
          {ITEMS.map((i) => (
            <a key={i.href} href={i.href} className="hover:text-white transition">
              {i.label}
            </a>
          ))}
        </nav>
        <Link
          href="/login"
          className="hidden rounded-full bg-[#5630f0] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:opacity-90 sm:inline-block"
        >
          Entrar
        </Link>
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white md:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>
      {open && (
        <div className="pointer-events-auto absolute left-4 right-4 top-20 rounded-2xl border border-white/10 bg-[#0e201d]/95 p-4 backdrop-blur-md md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium text-white/90">
            {ITEMS.map((i) => (
              <a
                key={i.href}
                href={i.href}
                onClick={() => setOpen(false)}
                className="hover:text-white"
              >
                {i.label}
              </a>
            ))}
            <Link
              href="/login"
              className="mt-2 inline-flex w-fit items-center rounded-full bg-[#5630f0] px-4 py-2 font-semibold text-white"
            >
              Entrar
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
