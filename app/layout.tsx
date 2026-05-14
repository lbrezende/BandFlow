import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BandFlow — Sua banda como uma máquina de fechar eventos",
  description:
    "Pare de perder eventos por demora e bagunça. Propostas automáticas, follow-ups inteligentes e contratos online para bandas.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "BandFlow",
    description:
      "O sistema que transforma sua banda em uma máquina profissional de fechar eventos.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <Providers>{children}</Providers>
        <Toaster
          position="top-right"
          theme="dark"
          toastOptions={{
            style: {
              background: "#18181b",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fafafa",
            },
          }}
        />
      </body>
    </html>
  );
}
