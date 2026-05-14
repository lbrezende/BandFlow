"use client";

import { useMemo, useState } from "react";
import { Plus, Flame, Phone, Mail, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { PageHeader } from "@/components/dashboard/page-header";
import { formatDate, cn } from "@/lib/utils";
import {
  LEAD_STATUS_LABEL,
  LEAD_STATUS_ORDER,
  leadStatusVariant,
} from "@/lib/labels";
import type { EventLead, LeadStatus } from "@/types/entities";

const KANBAN_COLUMNS: LeadStatus[] = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL_SENT",
  "NEGOTIATION",
  "WON",
];

export default function LeadsPage() {
  const leads = useStore((s) => s.leads);
  const addLead = useStore((s) => s.addLead);
  const updateLead = useStore((s) => s.updateLead);
  const deleteLead = useStore((s) => s.deleteLead);
  const plan = useStore((s) => s.plan);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<LeadStatus | "ALL">("ALL");
  const [view, setView] = useState<"kanban" | "list">("kanban");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<EventLead | null>(null);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (filter !== "ALL" && l.status !== filter) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.eventType.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q)
      );
    });
  }, [leads, filter, search]);

  function openNew() {
    if (plan === "FREE" && leads.length >= 10) {
      toast.error("Limite do plano FREE atingido", {
        description: "Faça upgrade para o PRO para leads ilimitados.",
      });
      return;
    }
    setEditing(null);
    setOpen(true);
  }

  function openEdit(lead: EventLead) {
    setEditing(lead);
    setOpen(true);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leads & CRM"
        description="Pipeline visual dos seus eventos. Nunca mais perca um cliente."
        action={
          <Button variant="accent" onClick={openNew}>
            <Plus className="h-4 w-4" />
            Novo lead
          </Button>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
          <Input
            placeholder="Buscar por nome, email ou cidade..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={filter} onValueChange={(v) => setFilter(v as LeadStatus | "ALL")}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todos os status</SelectItem>
              {LEAD_STATUS_ORDER.map((s) => (
                <SelectItem key={s} value={s}>
                  {LEAD_STATUS_LABEL[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex rounded-lg border border-[var(--border)] p-0.5">
            <button
              onClick={() => setView("kanban")}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition",
                view === "kanban"
                  ? "bg-[var(--primary)] text-white"
                  : "text-[var(--muted-foreground)]",
              )}
            >
              Kanban
            </button>
            <button
              onClick={() => setView("list")}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition",
                view === "list"
                  ? "bg-[var(--primary)] text-white"
                  : "text-[var(--muted-foreground)]",
              )}
            >
              Lista
            </button>
          </div>
        </div>
      </div>

      {view === "kanban" ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {KANBAN_COLUMNS.map((col) => {
            const colLeads = filtered.filter((l) => l.status === col);
            return (
              <div key={col} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                    {LEAD_STATUS_LABEL[col]}
                  </span>
                  <Badge variant="secondary" className="rounded-full text-xs">
                    {colLeads.length}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {colLeads.map((lead) => (
                    <button
                      key={lead.id}
                      onClick={() => openEdit(lead)}
                      className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] p-3 text-left transition-all hover:border-[var(--primary)]/40 hover:shadow-lg"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-semibold">{lead.name}</div>
                          <div className="truncate text-xs text-[var(--muted-foreground)]">
                            {lead.eventType}
                          </div>
                        </div>
                        <span className="flex items-center gap-0.5 text-xs text-orange-400">
                          <Flame className="h-3 w-3" />
                          {lead.heatScore}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1 text-[10px] text-[var(--muted-foreground)]">
                        <span>{lead.guests} conv.</span>
                        <span>·</span>
                        <span>{formatDate(lead.date)}</span>
                      </div>
                    </button>
                  ))}
                  {colLeads.length === 0 && (
                    <div className="rounded-lg border border-dashed border-[var(--border)] px-3 py-4 text-center text-xs text-[var(--muted-foreground)]">
                      Vazio
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-[var(--border)] text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
                  <tr>
                    <th className="px-4 py-3 text-left">Cliente</th>
                    <th className="px-4 py-3 text-left">Evento</th>
                    <th className="hidden px-4 py-3 text-left md:table-cell">Data</th>
                    <th className="hidden px-4 py-3 text-left lg:table-cell">Cidade</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-right">Heat</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-[var(--muted-foreground)]">
                        Nenhum lead encontrado.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((lead) => (
                      <tr
                        key={lead.id}
                        onClick={() => openEdit(lead)}
                        className="cursor-pointer border-b border-[var(--border)] transition-colors hover:bg-[var(--secondary)]/40"
                      >
                        <td className="px-4 py-3">
                          <div className="font-medium">{lead.name}</div>
                          <div className="text-xs text-[var(--muted-foreground)]">{lead.email}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div>{lead.eventType}</div>
                          <div className="text-xs text-[var(--muted-foreground)]">
                            {lead.guests} convidados
                          </div>
                        </td>
                        <td className="hidden px-4 py-3 md:table-cell">
                          {formatDate(lead.date)}
                        </td>
                        <td className="hidden px-4 py-3 lg:table-cell text-[var(--muted-foreground)]">
                          {lead.city}
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={leadStatusVariant(lead.status)}>
                            {LEAD_STATUS_LABEL[lead.status]}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="inline-flex items-center gap-0.5 text-xs text-orange-400">
                            <Flame className="h-3 w-3" />
                            {lead.heatScore}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <LeadDialog
        open={open}
        onOpenChange={setOpen}
        editing={editing}
        onSave={(data) => {
          if (editing) {
            updateLead(editing.id, data);
            toast.success("Lead atualizado");
          } else {
            addLead(data);
            toast.success("Lead criado");
          }
          setOpen(false);
        }}
        onDelete={
          editing
            ? () => {
                deleteLead(editing.id);
                toast.success("Lead removido");
                setOpen(false);
              }
            : undefined
        }
      />
    </div>
  );
}

function LeadDialog({
  open,
  onOpenChange,
  editing,
  onSave,
  onDelete,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  editing: EventLead | null;
  onSave: (data: Omit<EventLead, "id" | "createdAt">) => void;
  onDelete?: () => void;
}) {
  const empty: Omit<EventLead, "id" | "createdAt"> = {
    name: "",
    phone: "",
    email: "",
    eventType: "Casamento",
    guests: 100,
    city: "",
    date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    status: "NEW",
    heatScore: 50,
    notes: "",
  };

  const [form, setForm] = useState<Omit<EventLead, "id" | "createdAt">>(
    editing
      ? {
          name: editing.name,
          phone: editing.phone,
          email: editing.email,
          eventType: editing.eventType,
          guests: editing.guests,
          city: editing.city,
          date: editing.date.slice(0, 10),
          status: editing.status,
          heatScore: editing.heatScore,
          notes: editing.notes ?? "",
        }
      : empty,
  );

  // Reset on open change
  if (open && editing && form.name !== editing.name) {
    setForm({
      name: editing.name,
      phone: editing.phone,
      email: editing.email,
      eventType: editing.eventType,
      guests: editing.guests,
      city: editing.city,
      date: editing.date.slice(0, 10),
      status: editing.status,
      heatScore: editing.heatScore,
      notes: editing.notes ?? "",
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) setForm(empty);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editing ? "Editar lead" : "Novo lead"}</DialogTitle>
          <DialogDescription>
            Cadastre informações do cliente e do evento para acompanhar no pipeline.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave({ ...form, date: new Date(form.date).toISOString() });
          }}
          className="grid gap-3 sm:grid-cols-2"
        >
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Nome</Label>
            <Input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Telefone</Label>
            <Input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>E-mail</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Tipo de evento</Label>
            <Input
              value={form.eventType}
              onChange={(e) => setForm({ ...form, eventType: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Convidados</Label>
            <Input
              type="number"
              min={0}
              value={form.guests}
              onChange={(e) => setForm({ ...form, guests: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Data do evento</Label>
            <Input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
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
            <Label>Status</Label>
            <Select
              value={form.status}
              onValueChange={(v) => setForm({ ...form, status: v as LeadStatus })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LEAD_STATUS_ORDER.map((s) => (
                  <SelectItem key={s} value={s}>
                    {LEAD_STATUS_LABEL[s]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Heat score (0–100)</Label>
            <Input
              type="number"
              min={0}
              max={100}
              value={form.heatScore}
              onChange={(e) =>
                setForm({ ...form, heatScore: Math.max(0, Math.min(100, parseInt(e.target.value) || 0)) })
              }
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Anotações</Label>
            <Textarea
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>

          {editing && (
            <div className="sm:col-span-2 flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--background)]/40 p-3 text-xs">
              <Phone className="h-3.5 w-3.5 text-[var(--accent)]" />
              <span>{form.phone || "—"}</span>
              <Mail className="ml-3 h-3.5 w-3.5 text-[var(--accent)]" />
              <span>{form.email || "—"}</span>
            </div>
          )}

          <DialogFooter className="sm:col-span-2">
            {onDelete && (
              <Button type="button" variant="outline" onClick={onDelete} className="text-red-400">
                <Trash2 className="h-4 w-4" />
                Excluir
              </Button>
            )}
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="accent">
              {editing ? "Salvar" : "Criar lead"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
