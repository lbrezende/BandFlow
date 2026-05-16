import Link from "next/link";
import {
  Music,
  CalendarCheck,
  Mic2,
  FileSignature,
  Wallet,
  Zap,
  Star,
  Search,
  ChevronLeft,
  ChevronRight,
  Briefcase,
} from "lucide-react";

import { V2Nav } from "@/components/v2/nav";
import { PillButton } from "@/components/v2/pill-button";
import { Seal } from "@/components/v2/seal";
import { PhotoColumn } from "@/components/v2/photo-column";
import { FeatureCard } from "@/components/v2/feature-card";

export default function V2Landing() {
  return (
    <div id="home" className="overflow-hidden">
      <V2Nav />

      {/* HERO */}
      <section className="relative pt-24 sm:pt-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-12 sm:px-6 lg:grid-cols-2 lg:gap-6 lg:pb-20 lg:pt-12">
          {/* LEFT */}
          <div className="relative flex flex-col justify-center pt-8">
            <h1 className="v2-display text-5xl sm:text-6xl lg:text-[88px] xl:text-[104px] text-white">
              Feche shows
              <br />
              mais rápido.
              <span className="relative ml-2 inline-block align-baseline">
                <Seal color="#5630f0" outline="#0c1a18" size={64} className="absolute -right-12 top-2 sm:-right-16 sm:top-3">
                  <Search className="h-5 w-5 text-white" strokeWidth={2.5} />
                </Seal>
              </span>
            </h1>
            <p className="mt-6 max-w-md text-base text-white/65 sm:text-lg">
              BandFlow é o sistema que transforma sua banda em máquina profissional
              de fechar eventos — sem WhatsApp, sem bagunça, sem perder lead.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <PillButton href="/login" size="lg" variant="purple">
                Começar agora
              </PillButton>
            </div>

            {/* Stats */}
            <div className="mt-16 flex gap-12 sm:mt-24 lg:mt-32">
              <div>
                <div className="v2-display text-5xl sm:text-6xl text-white">300+</div>
                <div className="mt-1 text-xs sm:text-sm text-white/60">Bandas ativas</div>
              </div>
              <div>
                <div className="v2-display text-5xl sm:text-6xl text-white">95%</div>
                <div className="mt-1 text-xs sm:text-sm text-white/60">Taxa de fechamento</div>
              </div>
            </div>
          </div>

          {/* RIGHT — Photo mosaic */}
          <div className="relative -mx-4 grid grid-cols-2 gap-0 sm:-mx-6 lg:-mr-12 lg:ml-6">
            <div className="flex flex-col">
              <PhotoColumn
                bg="#f5c846"
                inner="#f5c846"
                src="https://picsum.photos/seed/musician-mic/600/900?grayscale"
                alt="Vocalista"
                className="h-72 sm:h-96 lg:h-[420px]"
              />
              <PhotoColumn
                bg="#a89af2"
                inner="#a89af2"
                src="https://picsum.photos/seed/band-guitar/600/900?grayscale"
                alt="Guitarrista"
                className="h-72 sm:h-96 lg:h-[420px]"
              />
            </div>
            <div className="flex flex-col">
              <PhotoColumn
                bg="#c8f36d"
                inner="#85d9b8"
                src="https://picsum.photos/seed/band-drums/600/900?grayscale"
                alt="Banda"
                className="h-72 sm:h-96 lg:h-[420px]"
              />
              <PhotoColumn
                bg="#f0c8a8"
                inner="#f0c8a8"
                src="https://picsum.photos/seed/event-stage/600/900?grayscale"
                alt="Show"
                className="h-72 sm:h-96 lg:h-[420px]"
              />
            </div>
          </div>
        </div>

        {/* Logos strip */}
        <div className="bg-[#5630f0]">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-6 sm:flex-row sm:justify-between sm:px-6 sm:py-7">
            <div className="text-sm font-medium text-white/90">
              Bandas que tocam com BandFlow
            </div>
            <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-white/85 sm:flex sm:flex-wrap sm:items-center sm:gap-x-10">
              {["Velvet Skies", "Tom & Jam", "Marshall Trio", "Aurora Live"].map((n) => (
                <div key={n} className="flex items-center gap-2 text-sm font-semibold">
                  <Star className="h-3.5 w-3.5 fill-white/85" />
                  {n}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* POWERHOUSE GRID */}
      <section id="features" className="bg-[#0c1a18]">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-20 sm:px-6 lg:grid-cols-3 lg:py-28">
          <div className="lg:pt-4">
            <h2 className="v2-display text-5xl sm:text-6xl text-white">
              Sua banda
              <br />
              como uma
              <br />
              máquina
            </h2>
            <p className="mt-6 max-w-sm text-sm text-white/55 sm:text-base">
              Tudo o que o WhatsApp não te dá: pipeline visual, propostas premium,
              contratos online e dinheiro entrando sem dor.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
            <FeatureCard
              bg="#e26ebf"
              sealColor="#c8f36d"
              sealIcon={<CalendarCheck className="h-5 w-5" />}
              title="Agenda sem conflitos"
              description="Datas, músicos disponíveis, tempo de setup. O sistema avisa o conflito antes dele virar problema."
            />
            <FeatureCard
              bg="#c8f36d"
              sealColor="#f5c846"
              sealIcon={<Mic2 className="h-5 w-5" />}
              title="Leads sempre quentes"
              description="CRM visual com heat score por contato. Você sabe quem está perto de fechar — e quem precisa de follow-up."
            />
            <FeatureCard
              bg="#f5c846"
              sealColor="#a89af2"
              sealIcon={<Star className="h-5 w-5" />}
              title="Propostas que fecham"
              description="Link público, branding da banda, expiração automática e aceite online. Adeus PDF improvisado."
            />
            <FeatureCard
              bg="#a89af2"
              sealColor="#e26ebf"
              sealIcon={<Wallet className="h-5 w-5" />}
              title="Pagamento sem WhatsApp"
              description="PIX, cartão, boleto e parcelamento. Lembrete automático até o cliente pagar a última parcela."
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-[#ede5d3] text-[#0c1a18]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-16 lg:py-28">
          <div className="relative">
            <div className="v2-card-outline overflow-hidden rounded-3xl bg-[#f5c0c4]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://picsum.photos/seed/singer-portrait/600/780?grayscale"
                alt="Cantora"
                className="v2-photo-mask aspect-[3/4] w-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="v2-display text-4xl sm:text-5xl">
              Um parceiro de verdade na operação.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#0c1a18]/75">
              &ldquo;Em 60 dias trocamos planilha, grupo de WhatsApp e PDF improvisado
              pelo BandFlow. Dobrei o número de shows fechados no mês e nunca mais
              perdi uma data. A banda virou empresa de verdade.&rdquo;
            </p>
            <div className="mt-6">
              <div className="text-base font-semibold">Camila Reis</div>
              <div className="text-sm text-[#0c1a18]/55">Vocalista, Velvet Skies</div>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <button className="v2-card-outline inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#5630f0]">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="v2-card-outline inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#5630f0]">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* WHY OUTPERFORMS — yellow */}
      <section id="why" className="bg-[#f5c846] text-[#0c1a18]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <h2 className="v2-display mx-auto max-w-3xl text-center text-5xl sm:text-6xl lg:text-7xl">
            Por que BandFlow
            <span className="inline-flex items-center align-middle mx-2">
              <Seal color="#5630f0" outline="#0c1a18" size={48}>
                <Search className="h-4 w-4 text-white" strokeWidth={2.5} />
              </Seal>
            </span>
            ganha do WhatsApp
          </h2>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Respondeu em minutos",
                body: "Modelo de proposta pronto: você responde em 5 min, não em 3 dias. Lead quente não espera.",
              },
              {
                title: "Pipeline visual",
                body: "Veja todos os leads, propostas e shows numa só tela. Nunca mais um cliente cai entre as conversas.",
              },
              {
                title: "Cobrança que cobra sozinha",
                body: "Follow-up automático até o pagamento. O cliente paga, você toca. Você cobra, o sistema cobra.",
              },
              {
                title: "Pronto em 10 minutos",
                body: "Cadastra a banda, importa contatos e começa. Sem treinamento, sem onboarding caro.",
              },
            ].map((c) => (
              <div key={c.title} className="flex flex-col items-center text-center">
                <Seal color="#a89af2" outline="#0c1a18" size={56}>
                  <Star className="h-5 w-5" fill="#0c1a18" />
                </Seal>
                <div className="mt-5 v2-display-tight text-xl sm:text-2xl">{c.title}</div>
                <p className="mt-3 text-sm leading-relaxed text-[#0c1a18]/75">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STACKED DECK */}
      <section className="bg-[#0c1a18]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
          <div>
            <h2 className="v2-display text-5xl sm:text-6xl lg:text-7xl text-white">
              Um app.
              <br />
              Zero
              <br />
              planilha.
            </h2>
            <p className="mt-6 max-w-md text-base text-white/55">
              Tudo o que sua banda precisa pra virar negócio profissional cabe num
              login. Trial PRO de 14 dias, sem cartão.
            </p>
            <div className="mt-8">
              <PillButton href="/login" size="lg" variant="cream">
                Iniciar trial grátis
              </PillButton>
            </div>
          </div>

          <div className="relative h-[520px] sm:h-[560px]">
            {[
              { c: "#e26ebf", t: 0, label: "Leads", icon: <Mic2 className="h-4 w-4" /> },
              { c: "#c8f36d", t: 80, label: "Propostas", icon: <Star className="h-4 w-4" /> },
              { c: "#f5c846", t: 160, label: "Agenda", icon: <CalendarCheck className="h-4 w-4" /> },
              {
                c: "#a89af2",
                t: 240,
                label: "Pagamentos",
                icon: <Wallet className="h-4 w-4" />,
                primary: true,
              },
            ].map((row, i) => (
              <div
                key={i}
                className="v2-card-outline absolute left-0 right-0 rounded-3xl"
                style={{
                  top: row.t,
                  backgroundColor: row.c,
                  height: row.primary ? 280 : 110,
                  zIndex: i,
                }}
              >
                <div className="absolute left-1/2 top-2.5 -translate-x-1/2">
                  <Seal color="#e26ebf" outline="#0c1a18" size={40}>
                    <div className="text-[#0c1a18]">{row.icon}</div>
                  </Seal>
                </div>
                {row.primary && (
                  <div className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-12 text-center text-[#0c1a18]">
                    <div className="v2-display-tight text-2xl sm:text-3xl">
                      Receba via PIX em 1 clique
                    </div>
                    <p className="mt-2 text-sm opacity-80">
                      Parcele em até 6x e deixe o sistema cobrar atrasados por você.
                      Caso real: +R$ 28k em 3 meses recuperando inadimplência.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS STEPS */}
      <section id="process" className="bg-[#ede5d3] text-[#0c1a18]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="v2-display text-5xl sm:text-6xl lg:text-7xl">
              O upgrade que sua
              <br />
              banda precisa.
            </h2>
            <p className="mt-5 max-w-xl text-sm text-[#0c1a18]/70 sm:text-base">
              Escale o número de shows sem virar gerente de WhatsApp. O BandFlow cuida
              do funil — você cuida da música.
            </p>
          </div>

          <div className="relative mt-16 grid grid-cols-2 gap-12 sm:grid-cols-4 sm:gap-6">
            <div className="absolute left-[12%] right-[12%] top-7 hidden h-px sm:block">
              <div className="v2-dotted-line" />
            </div>
            {[
              { n: 1, label: "Lead chega", body: "Captura do WhatsApp, Instagram ou form. Heat score automático." },
              { n: 2, label: "Proposta enviada", body: "Link público com pacotes, preço e aceite digital." },
              { n: 3, label: "Contrato online", body: "Assinatura, parcelamento e confirmação num único fluxo." },
              { n: 4, label: "Pagamento", body: "PIX, cartão, boleto. Cobrança automática até a última parcela." },
            ].map((s) => (
              <div key={s.n} className="relative flex flex-col items-center text-center">
                <Seal color="#a89af2" outline="#0c1a18" size={56}>
                  <span className="v2-display-tight text-xl">{s.n}</span>
                </Seal>
                <div className="mt-5 v2-display-tight text-2xl">{s.label}</div>
                <p className="mt-2 text-sm text-[#0c1a18]/70">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-[#5630f0]">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 sm:py-20">
          <Seal color="#c8f36d" outline="#0c1a18" size={56}>
            <Zap className="h-5 w-5 text-[#0c1a18]" />
          </Seal>
          <h2 className="v2-display text-4xl sm:text-5xl lg:text-6xl text-white">
            Sua banda. Sua agenda. Seu dinheiro.
          </h2>
          <p className="max-w-xl text-base text-white/75">
            14 dias de Trial PRO. Sem cartão, sem amarração. Cancela quando quiser.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <PillButton href="/login" size="lg" variant="cream">
              Começar trial agora
            </PillButton>
            <Link
              href="/v2/app"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              <Briefcase className="h-4 w-4" />
              Ver demo do app
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0c1a18] text-white/55">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <div className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#5630f0]">
              <Music className="h-4 w-4 text-white" />
            </div>
            BandFlow
            <span className="font-normal text-white/45">© {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-5 text-xs">
            <Link href="/">Versão original</Link>
            <a href="https://github.com/lbrezende/BandFlow" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
