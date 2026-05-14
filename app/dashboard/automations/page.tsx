"use client";

import { useState } from "react";
import { Plus, Zap, Trash2 } from "lucide-react";
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
import {
  AUTOMATION_CHANNEL_LABEL,
  AUTOMATION_TRIGGER_LABEL,
} from "@/lib/labels";
import type {
  AutomationChannel,
  AutomationTrigger,
  FollowUpAutomation,
} from "@/types/entities";

export default function AutomationsPage() {
  const automations = useStore((s) => s.automations);
  const plan = useStore((s) => s.plan);
  const addAutomation = useStore((s) => s.addAutomation);
  const updateAutomation = useStore((s) => s.updateAutomation);
  const deleteAutomation = useStore((s) => s.deleteAutomation);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<FollowUpAutomation | null>(null);

  function tryOpenNew() {
    if (plan === "FREE") {
      toast.error("Automações estão disponíveis no plano PRO");
      return;
    }
    setEditing(null);
    setOpen(true);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Automações de follow-up"
        description="O sistema persegue o cliente até o fechamento. Você só assina o contrato."
        action={
          <Button variant="accent" onClick={tryOpenNew}>
            <Plus className="h-4 w-4" /> Nova automação
          </Button>
        }
      />

      <div className="grid gap-3 md:grid-cols-2">
        {automations.length === 0 ? (
          <Card className="md:col-span-2">
            <CardContent className="p-8 text-center text-sm text-[var(--muted-foreground)]">
              Nenhuma automação configurada.
            </CardContent>
          </Card>
        ) : (
          automations.map((a) => (
            <button
              key={a.id}
              className="text-left"
              onClick={() => {
                setEditing(a);
                setOpen(true);
              }}
            >
              <Card className="h-full transition-all hover:border-[var(--primary)]/40 hover:shadow-lg">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="bandflow-gradient inline-flex h-7 w-7 items-center justify-center rounded-lg">
                          <Zap className="h-3.5 w-3.5 text-white" />
                        </div>
                        <div className="font-semibold">{a.name}</div>
                      </div>
                      <div className="mt-1 text-xs text-[var(--muted-foreground)]">
                        Gatilho: {AUTOMATION_TRIGGER_LABEL[a.triggerType]}
                      </div>
                    </div>
                    <Badge variant={a.active ? "success" : "secondary"}>
                      {a.active ? "Ativa" : "Pausada"}
                    </Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-[var(--muted-foreground)]">
                    <span className="rounded-full border border-[var(--border)] px-2 py-0.5">
                      Canal: {AUTOMATION_CHANNEL_LABEL[a.channel]}
                    </span>
                    <span className="rounded-full border border-[var(--border)] px-2 py-0.5">
                      Atraso: {a.delayDays} dia{a.delayDays !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="mt-3 rounded-lg border border-[var(--border)] bg-[var(--background)]/40 p-3 text-xs text-[var(--muted-foreground)]">
                    {a.messageTemplate}
                  </div>
                </CardContent>
              </Card>
            </button>
          ))
        )}
      </div>

      <AutomationDialog
        open={open}
        onOpenChange={setOpen}
        editing={editing}
        onSave={(data) => {
          if (editing) {
            updateAutomation(editing.id, data);
            toast.success("Automação atualizada");
          } else {
            addAutomation(data);
            toast.success("Automação criada");
          }
          setOpen(false);
        }}
        onDelete={
          editing
            ? () => {
                deleteAutomation(editing.id);
                toast.success("Automação removida");
                setOpen(false);
              }
            : undefined
        }
      />
    </div>
  );
}

function AutomationDialog({
  open,
  onOpenChange,
  editing,
  onSave,
  onDelete,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  editing: FollowUpAutomation | null;
  onSave: (data: Omit<FollowUpAutomation, "id">) => void;
  onDelete?: () => void;
}) {
  const empty: Omit<FollowUpAutomation, "id"> = {
    name: "",
    triggerType: "LEAD_CREATED",
    delayDays: 0,
    channel: "WHATSAPP",
    messageTemplate: "",
    active: true,
  };

  const [form, setForm] = useState<Omit<FollowUpAutomation, "id">>(
    editing
      ? {
          name: editing.name,
          triggerType: editing.triggerType,
          delayDays: editing.delayDays,
          channel: editing.channel,
          messageTemplate: editing.messageTemplate,
          active: editing.active,
        }
      : empty,
  );

  if (open && editing && form.name !== editing.name) {
    setForm({
      name: editing.name,
      triggerType: editing.triggerType,
      delayDays: editing.delayDays,
      channel: editing.channel,
      messageTemplate: editing.messageTemplate,
      active: editing.active,
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
          <DialogTitle>{editing ? "Editar automação" : "Nova automação"}</DialogTitle>
          <DialogDescription>
            Defina o gatilho, canal e mensagem que será enviada automaticamente.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(form);
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
            <Label>Gatilho</Label>
            <Select
              value={form.triggerType}
              onValueChange={(v) => setForm({ ...form, triggerType: v as AutomationTrigger })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(AUTOMATION_TRIGGER_LABEL).map(([k, v]) => (
                  <SelectItem key={k} value={k}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Canal</Label>
            <Select
              value={form.channel}
              onValueChange={(v) => setForm({ ...form, channel: v as AutomationChannel })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(AUTOMATION_CHANNEL_LABEL).map(([k, v]) => (
                  <SelectItem key={k} value={k}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Atraso (dias)</Label>
            <Input
              type="number"
              min={0}
              value={form.delayDays}
              onChange={(e) => setForm({ ...form, delayDays: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Ativa?</Label>
            <Select
              value={form.active ? "yes" : "no"}
              onValueChange={(v) => setForm({ ...form, active: v === "yes" })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Sim</SelectItem>
                <SelectItem value="no">Não</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Mensagem</Label>
            <Textarea
              rows={4}
              required
              value={form.messageTemplate}
              onChange={(e) => setForm({ ...form, messageTemplate: e.target.value })}
              placeholder="Use {nome}, {evento}, {data} como variáveis."
            />
          </div>

          <DialogFooter className="sm:col-span-2">
            {onDelete && (
              <Button type="button" variant="outline" onClick={onDelete} className="text-red-400">
                <Trash2 className="h-4 w-4" /> Excluir
              </Button>
            )}
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="accent">
              {editing ? "Salvar" : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
