"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, FileText, ExternalLink, Copy, Trash2 } from "lucide-react";
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
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { PageHeader } from "@/components/dashboard/page-header";
import { formatBRL, formatDate } from "@/lib/utils";
import {
  PROPOSAL_STATUS_LABEL,
  proposalStatusVariant,
  PACKAGE_TYPE_LABEL,
} from "@/lib/labels";
import type { Proposal, PackageType, ProposalStatus } from "@/types/entities";

export default function ProposalsPage() {
  const proposals = useStore((s) => s.proposals);
  const leads = useStore((s) => s.leads);
  const plan = useStore((s) => s.plan);
  const addProposal = useStore((s) => s.addProposal);
  const updateProposal = useStore((s) => s.updateProposal);
  const deleteProposal = useStore((s) => s.deleteProposal);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Proposal | null>(null);

  const activeCount = useMemo(
    () =>
      proposals.filter((p) =>
        ["DRAFT", "SENT", "VIEWED"].includes(p.status),
      ).length,
    [proposals],
  );

  function openNew() {
    if (plan === "FREE" && activeCount >= 3) {
      toast.error("Plano FREE permite só 3 propostas ativas", {
        description: "Faça upgrade para o PRO.",
      });
      return;
    }
    setEditing(null);
    setOpen(true);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Propostas"
        description="Crie e acompanhe propostas com link público e aceite online."
        action={
          <Button variant="accent" onClick={openNew}>
            <Plus className="h-4 w-4" />
            Nova proposta
          </Button>
        }
      />

      <div className="grid gap-3 md:grid-cols-4">
        <SummaryStat label="Total" value={proposals.length} />
        <SummaryStat
          label="Ativas"
          value={activeCount}
          accent="text-[var(--accent)]"
        />
        <SummaryStat
          label="Aceitas"
          value={proposals.filter((p) => p.status === "ACCEPTED").length}
          accent="text-emerald-400"
        />
        <SummaryStat
          label="Receita aceita"
          value={formatBRL(
            proposals
              .filter((p) => p.status === "ACCEPTED")
              .reduce((a, p) => a + p.price, 0),
          )}
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-[var(--border)] text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
                <tr>
                  <th className="px-4 py-3 text-left">Proposta</th>
                  <th className="hidden px-4 py-3 text-left md:table-cell">Lead</th>
                  <th className="hidden px-4 py-3 text-left lg:table-cell">Pacote</th>
                  <th className="px-4 py-3 text-left">Valor</th>
                  <th className="hidden px-4 py-3 text-left md:table-cell">Expira</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-right">Link</th>
                </tr>
              </thead>
              <tbody>
                {proposals.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center text-[var(--muted-foreground)]">
                      Nenhuma proposta criada ainda.
                    </td>
                  </tr>
                ) : (
                  proposals.map((p) => {
                    const lead = leads.find((l) => l.id === p.leadId);
                    return (
                      <tr
                        key={p.id}
                        onClick={() => {
                          setEditing(p);
                          setOpen(true);
                        }}
                        className="cursor-pointer border-b border-[var(--border)] transition-colors hover:bg-[var(--secondary)]/40"
                      >
                        <td className="px-4 py-3 font-medium">{p.title}</td>
                        <td className="hidden px-4 py-3 md:table-cell text-[var(--muted-foreground)]">
                          {lead?.name ?? "—"}
                        </td>
                        <td className="hidden px-4 py-3 lg:table-cell">
                          <Badge variant="secondary">{PACKAGE_TYPE_LABEL[p.packageType]}</Badge>
                        </td>
                        <td className="px-4 py-3 font-semibold">{formatBRL(p.price)}</td>
                        <td className="hidden px-4 py-3 md:table-cell text-[var(--muted-foreground)]">
                          {formatDate(p.expiresAt)}
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={proposalStatusVariant(p.status)}>
                            {PROPOSAL_STATUS_LABEL[p.status]}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard?.writeText(
                                `${window.location.origin}${p.publicLink}`,
                              );
                              toast.success("Link copiado!");
                            }}
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <ProposalDialog
        open={open}
        onOpenChange={setOpen}
        editing={editing}
        leadOptions={leads.map((l) => ({ value: l.id, label: l.name }))}
        onSave={(data) => {
          if (editing) {
            updateProposal(editing.id, data);
            toast.success("Proposta atualizada");
          } else {
            addProposal(data);
            toast.success("Proposta criada");
          }
          setOpen(false);
        }}
        onDelete={
          editing
            ? () => {
                deleteProposal(editing.id);
                toast.success("Proposta excluída");
                setOpen(false);
              }
            : undefined
        }
      />
    </div>
  );
}

function SummaryStat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent?: string;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
          {label}
        </div>
        <div className={`mt-1 text-2xl font-bold ${accent ?? ""}`}>{value}</div>
      </CardContent>
    </Card>
  );
}

function ProposalDialog({
  open,
  onOpenChange,
  editing,
  leadOptions,
  onSave,
  onDelete,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  editing: Proposal | null;
  leadOptions: { value: string; label: string }[];
  onSave: (data: Omit<Proposal, "id" | "createdAt" | "publicLink">) => void;
  onDelete?: () => void;
}) {
  type FormShape = Omit<Proposal, "id" | "createdAt" | "publicLink">;
  const empty: FormShape = {
    leadId: leadOptions[0]?.value ?? "",
    title: "",
    packageType: "STANDARD",
    price: 5000,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10),
    status: "DRAFT",
    notes: "",
  };

  const [form, setForm] = useState<FormShape>(
    editing
      ? {
          leadId: editing.leadId,
          title: editing.title,
          packageType: editing.packageType,
          price: editing.price,
          expiresAt: editing.expiresAt.slice(0, 10),
          status: editing.status,
          notes: editing.notes ?? "",
          acceptedAt: editing.acceptedAt,
        }
      : empty,
  );

  if (open && editing && form.title !== editing.title) {
    setForm({
      leadId: editing.leadId,
      title: editing.title,
      packageType: editing.packageType,
      price: editing.price,
      expiresAt: editing.expiresAt.slice(0, 10),
      status: editing.status,
      notes: editing.notes ?? "",
      acceptedAt: editing.acceptedAt,
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
          <DialogTitle>{editing ? "Editar proposta" : "Nova proposta"}</DialogTitle>
          <DialogDescription>
            Cada proposta gera um link público para o cliente visualizar e aceitar.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave({ ...form, expiresAt: new Date(form.expiresAt).toISOString() });
          }}
          className="grid gap-3 sm:grid-cols-2"
        >
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Título</Label>
            <Input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Pacote Premium — Casamento 4h ao vivo"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Lead</Label>
            <Select value={form.leadId} onValueChange={(v) => setForm({ ...form, leadId: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um lead" />
              </SelectTrigger>
              <SelectContent>
                {leadOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Pacote</Label>
            <Select
              value={form.packageType}
              onValueChange={(v) => setForm({ ...form, packageType: v as PackageType })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(PACKAGE_TYPE_LABEL).map(([k, v]) => (
                  <SelectItem key={k} value={k}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Valor (R$)</Label>
            <Input
              type="number"
              min={0}
              value={form.price}
              onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Expira em</Label>
            <Input
              type="date"
              value={form.expiresAt}
              onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Status</Label>
            <Select
              value={form.status}
              onValueChange={(v) => setForm({ ...form, status: v as ProposalStatus })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(PROPOSAL_STATUS_LABEL).map(([k, v]) => (
                  <SelectItem key={k} value={k}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Anotações internas</Label>
            <Textarea
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>

          {editing && (
            <div className="sm:col-span-2 flex flex-col gap-2 rounded-lg border border-[var(--border)] bg-[var(--background)]/40 p-3 text-xs sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-[var(--accent)]" />
                <span className="truncate">{editing.publicLink}</span>
              </div>
              <Link
                href={editing.publicLink}
                target="_blank"
                className="inline-flex items-center gap-1 text-[var(--accent)] hover:underline"
              >
                Abrir link público
                <ExternalLink className="h-3 w-3" />
              </Link>
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
              {editing ? "Salvar" : "Criar proposta"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
