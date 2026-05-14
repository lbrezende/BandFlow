"use client";

import { useState } from "react";
import { Crown, Save, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/dashboard/page-header";

export default function SettingsPage() {
  const band = useStore((s) => s.band);
  const setBand = useStore((s) => s.setBand);
  const plan = useStore((s) => s.plan);
  const setPlan = useStore((s) => s.setPlan);
  const trialEndsAt = useStore((s) => s.trialEndsAt);
  const resetDemo = useStore((s) => s.resetDemo);

  const [form, setForm] = useState({
    name: band.name,
    description: band.description,
    genres: band.genres.join(", "),
    city: band.city,
    contactPhone: band.contactPhone,
    instagram: band.socialLinks.instagram ?? "",
    youtube: band.socialLinks.youtube ?? "",
    spotify: band.socialLinks.spotify ?? "",
    website: band.socialLinks.website ?? "",
  });

  const daysLeft = trialEndsAt
    ? Math.max(0, Math.ceil((new Date(trialEndsAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  return (
    <div className="space-y-6">
      <PageHeader title="Configurações" description="Banda, plano e preferências." />

      <Tabs defaultValue="band" className="w-full">
        <TabsList>
          <TabsTrigger value="band">Banda</TabsTrigger>
          <TabsTrigger value="billing">Plano</TabsTrigger>
          <TabsTrigger value="demo">Demo</TabsTrigger>
        </TabsList>

        <TabsContent value="band">
          <Card>
            <CardContent className="p-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setBand({
                    name: form.name,
                    description: form.description,
                    genres: form.genres.split(",").map((g) => g.trim()).filter(Boolean),
                    city: form.city,
                    contactPhone: form.contactPhone,
                    socialLinks: {
                      instagram: form.instagram,
                      youtube: form.youtube,
                      spotify: form.spotify,
                      website: form.website,
                    },
                  });
                  toast.success("Banda atualizada");
                }}
                className="grid gap-4 sm:grid-cols-2"
              >
                <div className="space-y-1.5 sm:col-span-2">
                  <Label>Nome da banda</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label>Descrição</Label>
                  <Textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Gêneros (separados por vírgula)</Label>
                  <Input
                    value={form.genres}
                    onChange={(e) => setForm({ ...form, genres: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Cidade</Label>
                  <Input
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Telefone</Label>
                  <Input
                    value={form.contactPhone}
                    onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Instagram</Label>
                  <Input
                    placeholder="@suabanda"
                    value={form.instagram}
                    onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>YouTube</Label>
                  <Input
                    value={form.youtube}
                    onChange={(e) => setForm({ ...form, youtube: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Spotify</Label>
                  <Input
                    value={form.spotify}
                    onChange={(e) => setForm({ ...form, spotify: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label>Website</Label>
                  <Input
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-2 flex justify-end">
                  <Button type="submit" variant="accent">
                    <Save className="h-4 w-4" />
                    Salvar alterações
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Plano atual</span>
                    <Badge variant={plan === "PRO" ? "success" : plan === "TRIAL" ? "accent" : "secondary"}>
                      {plan}
                    </Badge>
                  </div>
                  {plan === "TRIAL" && (
                    <div className="mt-1 text-xs text-[var(--muted-foreground)]">
                      {daysLeft} dias restantes no Trial PRO
                    </div>
                  )}
                </div>
                {plan !== "PRO" && (
                  <Button
                    variant="accent"
                    size="lg"
                    onClick={() => {
                      setPlan("PRO");
                      toast.success("Bem-vindo ao PRO! 🎉");
                    }}
                  >
                    <Crown className="h-4 w-4" />
                    Fazer upgrade — R$ 147/mês
                  </Button>
                )}
              </div>

              <Separator className="my-6" />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[var(--border)] p-5">
                  <div className="text-sm font-medium text-[var(--muted-foreground)]">FREE</div>
                  <div className="mt-1 text-2xl font-bold">R$ 0</div>
                  <ul className="mt-3 space-y-1.5 text-xs text-[var(--muted-foreground)]">
                    <li>Até 10 leads/mês</li>
                    <li>3 propostas ativas</li>
                    <li>Sem automações</li>
                    <li>Sem assinatura digital</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-[var(--primary)]/50 bg-gradient-to-br from-purple-900/20 to-orange-900/10 p-5">
                  <div className="flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
                    <Crown className="h-3.5 w-3.5" /> PRO
                  </div>
                  <div className="mt-1 text-2xl font-bold">R$ 147 / mês</div>
                  <ul className="mt-3 space-y-1.5 text-xs text-[var(--muted-foreground)]">
                    <li>Leads ilimitados</li>
                    <li>Propostas ilimitadas</li>
                    <li>Automações de follow-up</li>
                    <li>Contratos com assinatura</li>
                    <li>Pagamento online (PIX, cartão)</li>
                  </ul>
                </div>
              </div>

              {plan === "PRO" && (
                <div className="mt-6 flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setPlan("TRIAL");
                      toast.message("Voltou para TRIAL (modo demo)");
                    }}
                  >
                    Cancelar assinatura
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demo">
          <Card>
            <CardContent className="p-6">
              <div className="text-sm font-semibold">Modo Demo</div>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                Os dados são salvos localmente no seu navegador (localStorage). Você pode
                resetar e voltar para os dados iniciais a qualquer momento.
              </p>
              <Separator className="my-4" />
              <Button
                variant="outline"
                onClick={() => {
                  resetDemo();
                  toast.success("Dados restaurados ao estado inicial");
                }}
              >
                <RefreshCw className="h-4 w-4" />
                Resetar dados da demo
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
