# BandFlow

> Pare de perder eventos por demora, bagunça e orçamento no WhatsApp.
> O sistema que transforma sua banda em uma máquina profissional de fechar eventos.

## Stack

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS 4**
- **Auth.js v5** (credentials provider)
- **shadcn/ui** + **Radix UI** + **lucide-react**
- **Zustand** (persistência em localStorage para a demo)
- **TanStack Query**, **Zod**, **sonner**, **date-fns**

## Como rodar localmente

```bash
npm install --legacy-peer-deps
npm run dev
# abra http://localhost:3050
```

### Credenciais de teste

- **Usuário:** `teste`
- **Senha:** `teste`

## Features

- Orçamentos automáticos com link público
- Follow-ups inteligentes por WhatsApp/email/SMS
- Agenda profissional com detecção de conflitos
- CRM visual (Kanban + Lista) com heat score
- Contratos com assinatura e parcelamento
- Pagamentos com múltiplos métodos
- 100% responsivo (mobile-first)

## Deploy

```bash
npx vercel --prod
```

Variáveis de ambiente obrigatórias na Vercel:

```env
AUTH_SECRET=...   # openssl rand -base64 32
AUTH_TRUST_HOST=true
NEXT_PUBLIC_APP_URL=https://seu-projeto.vercel.app
```
