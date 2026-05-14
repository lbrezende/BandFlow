"use client";

import { useState } from "react";
import { Plus, Music2, Phone, Trash2 } from "lucide-react";
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
import { formatBRL } from "@/lib/utils";
import {
  AVAILABILITY_LABEL,
  availabilityVariant,
} from "@/lib/labels";
import type { Musician, Availability } from "@/types/entities";

export default function MusiciansPage() {
  const musicians = useStore((s) => s.musicians);
  const addMusician = useStore((s) => s.addMusician);
  const updateMusician = useStore((s) => s.updateMusician);
  const deleteMusician = useStore((s) => s.deleteMusician);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Musician | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Músicos"
        description="Cadastro de músicos da banda com cachê, transporte e disponibilidade."
        action={
          <Button
            variant="accent"
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            <Plus className="h-4 w-4" /> Novo músico
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {musicians.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-sm text-[var(--muted-foreground)]">
              Sem músicos cadastrados.
            </CardContent>
          </Card>
        ) : (
          musicians.map((m) => (
            <button
              key={m.id}
              className="text-left"
              onClick={() => {
                setEditing(m);
                setOpen(true);
              }}
            >
              <Card className="h-full transition-all hover:border-[var(--primary)]/40 hover:shadow-lg">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <Music2 className="h-4 w-4 text-[var(--accent)]" />
                        <div className="font-semibold">{m.name}</div>
                      </div>
                      <div className="mt-1 text-xs text-[var(--muted-foreground)]">
                        {m.instrument}
                      </div>
                    </div>
                    <Badge variant={availabilityVariant(m.availability)}>
                      {AVAILABILITY_LABEL[m.availability]}
                    </Badge>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-lg border border-[var(--border)] bg-[var(--background)]/40 p-2">
                      <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                        Cachê
                      </div>
                      <div className="mt-0.5 font-semibold">{formatBRL(m.cacheValue)}</div>
                    </div>
                    <div className="rounded-lg border border-[var(--border)] bg-[var(--background)]/40 p-2">
                      <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                        Transporte
                      </div>
                      <div className="mt-0.5 font-semibold">{formatBRL(m.transportCost)}</div>
                    </div>
                  </div>

                  {m.phone && (
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
                      <Phone className="h-3 w-3" />
                      {m.phone}
                    </div>
                  )}
                </CardContent>
              </Card>
            </button>
          ))
        )}
      </div>

      <MusicianDialog
        open={open}
        onOpenChange={setOpen}
        editing={editing}
        onSave={(data) => {
          if (editing) {
            updateMusician(editing.id, data);
            toast.success("Músico atualizado");
          } else {
            addMusician(data);
            toast.success("Músico adicionado");
          }
          setOpen(false);
        }}
        onDelete={
          editing
            ? () => {
                deleteMusician(editing.id);
                toast.success("Músico removido");
                setOpen(false);
              }
            : undefined
        }
      />
    </div>
  );
}

function MusicianDialog({
  open,
  onOpenChange,
  editing,
  onSave,
  onDelete,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  editing: Musician | null;
  onSave: (data: Omit<Musician, "id">) => void;
  onDelete?: () => void;
}) {
  const empty: Omit<Musician, "id"> = {
    name: "",
    instrument: "",
    cacheValue: 800,
    availability: "AVAILABLE",
    transportCost: 60,
    phone: "",
    notes: "",
  };

  const [form, setForm] = useState<Omit<Musician, "id">>(
    editing
      ? {
          name: editing.name,
          instrument: editing.instrument,
          cacheValue: editing.cacheValue,
          availability: editing.availability,
          transportCost: editing.transportCost,
          phone: editing.phone ?? "",
          notes: editing.notes ?? "",
        }
      : empty,
  );

  if (open && editing && form.name !== editing.name) {
    setForm({
      name: editing.name,
      instrument: editing.instrument,
      cacheValue: editing.cacheValue,
      availability: editing.availability,
      transportCost: editing.transportCost,
      phone: editing.phone ?? "",
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
          <DialogTitle>{editing ? "Editar músico" : "Novo músico"}</DialogTitle>
          <DialogDescription>
            Cadastro com cachê padrão e disponibilidade atual.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(form);
          }}
          className="grid gap-3 sm:grid-cols-2"
        >
          <div className="space-y-1.5">
            <Label>Nome</Label>
            <Input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Instrumento</Label>
            <Input
              required
              value={form.instrument}
              onChange={(e) => setForm({ ...form, instrument: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Cachê (R$)</Label>
            <Input
              type="number"
              min={0}
              value={form.cacheValue}
              onChange={(e) => setForm({ ...form, cacheValue: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Custo transporte (R$)</Label>
            <Input
              type="number"
              min={0}
              value={form.transportCost}
              onChange={(e) =>
                setForm({ ...form, transportCost: parseFloat(e.target.value) || 0 })
              }
            />
          </div>
          <div className="space-y-1.5">
            <Label>Disponibilidade</Label>
            <Select
              value={form.availability}
              onValueChange={(v) => setForm({ ...form, availability: v as Availability })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(AVAILABILITY_LABEL).map(([k, v]) => (
                  <SelectItem key={k} value={k}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Telefone</Label>
            <Input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Anotações</Label>
            <Textarea
              rows={2}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
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
              {editing ? "Salvar" : "Adicionar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
