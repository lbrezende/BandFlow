import type { Metadata } from "next";
import { Anton } from "next/font/google";
import "./v2.css";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BandFlow — Sua banda como uma máquina de fechar eventos",
  description:
    "Pare de perder shows no WhatsApp. Propostas premium, follow-ups e contratos automáticos para bandas.",
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${anton.variable} v2-theme min-h-screen`}>{children}</div>
  );
}
