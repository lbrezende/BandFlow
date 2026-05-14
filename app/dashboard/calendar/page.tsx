"use client";

import { useMemo, useState } from "react";
import { Calendar as CalendarIcon, Plus, MapPin, Clock, Users, Trash2 } from "lucide-react";
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
import type { EventBooking } from "@/types/entities";

const STATUS_LABEL: Record<EventBooking["status"], string> = {
  SCHEDULED: "Agendado",
  CONFIRMED: "Confirmado",
  COMPLETED: "Realizado",
  CANCELED: "Cancelado",
};

function statusVariant(s: EventBooking["status"]) {
  switch (s) {
    case "CONFIRMED":
      return "success" as const;
    case "COMPLETED":
      return "secondary" as const;
    case "CANCELED":
      return "destructive" as const;
    default:
      return "info" as const;
  }
}

export default function CalendarPage() {
  const bookings = useStore((s) => s.bookings);
  const musicians = useStore((s) => s.musicians);
  const addBooking = useStore((s) => s.addBooking);
  const updateBooking = useStore((s) => s.updateBooking);
  const deleteBooking = useStore((s) => s.deleteBooking);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<EventBooking | null>(null);

  const ordered = useMemo(
    () =>
      [...bookings].sort(
        (a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime(),
      ),
    [bookings],
  );

  const conflicts = useMemo(() => {
    const byDate = new Map<string, EventBooking[]>();
    ordered.forEach((b) => {
      if (b.status === "CANCELED") return;
      const key = b.eventDate.slice(0, 10);
      const arr = byDate.get(key) ?? [];
      arr.push(b);
      byDate.set(key, arr);
    });
    const result = new Set<string>();
    byDate.forEach((arr) => {
      if (arr.length > 1) arr.forEach((b) => result.add(b.id));
    });
    return result;
  }, [ordered]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Agenda"
        description="Todos os eventos da sua banda, com detecção de conflitos."
        action={
          <Button
            variant="accent"
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            <Plus className="h-4 w-4" />
            Novo evento
          </Button>
        }
      />

      {conflicts.size > 0 && (
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardContent className="flex items-center gap-3 p-4 text-sm">
            <CalendarIcon className="h-4 w-4 text-amber-400" />
            <div className="text-amber-300">
              Atenção: existem eventos no mesmo dia. Verifique disponibilidade dos músicos.
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {ordered.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-sm text-[var(--muted-foreground)]">
              Nenhum evento agendado.
            </CardContent>
          </Card>
        ) : (
          ordered.map((b) => {
            const inConflict = conflicts.has(b.id);
            return (
              <button
                key={b.id}
                onClick={() => {
                  setEditing(b);
                  setOpen(true);
                }}
                className="text-left"
              >
                <Card
                  className={`h-full transition-all hover:border-[var(--primary)]/40 hover:shadow-xl ${
                    inConflict ? "border-amber-500/40" : ""
                  }`}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="truncate text-base font-semibold">{b.title}</div>
                        <div className="mt-0.5 flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                          <CalendarIcon className="h-3 w-3" />
                          {formatDate(b.eventDate)}
                        </div>
                      </div>
                      <Badge variant={statusVariant(b.status)}>
                        {STATUS_LABEL[b.status]}
                      </Badge>
                    </div>
                    <div className="mt-3 space-y-1.5 text-xs text-[var(--muted-foreground)]">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{b.venue}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3" />
                        {b.duration}h show + {b.setupTime}h setup
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3 w-3" />
                        {b.musicianIds.length} músicos
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-[var(--border)] pt-3 text-xs">
                      <span className="text-[var(--muted-foreground)]">Lucro</span>
                      <span className="font-semibold text-emerald-400">
                        {formatBRL(b.profit)}
                      </span>
                    </div>
                    {inConflict && (
                      <div className="mt-2 rounded-md bg-amber-500/10 px-2 py-1 text-xs text-amber-300">
                        ⚠️ Conflito de data
                      </div>
                    )}
                  </CardContent>
                </Card>
              </button>
            );
          })
        )}
      </div>

      <BookingDialog
        open={open}
        onOpenChange={setOpen}
        editing={editing}
        musicians={musicians}
        onSave={(data) => {
          if (editing) {
            updateBooking(editing.id, data);
            toast.success("Evento atualizado");
          } else {
            addBooking(data);
            toast.success("Evento criado");
          }
          setOpen(false);
        }}
        onDelete={
          editing
            ? () => {
                deleteBooking(editing.id);
                toast.success("Evento removido");
                setOpen(false);
              }
            : undefined
        }
      />
    </div>
  );
}

function BookingDialog({
  open,
  onOpenChange,
  editing,
  musicians,
  onSave,
  onDelete,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  editing: EventBooking | null;
  musicians: { id: string; name: string; instrument: string }[];
  onSave: (data: Omit<EventBooking, "id">) => void;
  onDelete?: () => void;
}) {
  type FormShape = Omit<EventBooking, "id">;
  const empty: FormShape = {
    title: "",
    eventDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    venue: "",
    duration: 3,
    setupTime: 1.5,
    totalCost: 4000,
    profit: 3500,
    musicianIds: [],
    status: "SCHEDULED",
    notes: "",
  };

  const [form, setForm] = useState<FormShape>(
    editing
      ? {
          title: editing.title,
          eventDate: editing.eventDate.slice(0, 10),
          venue: editing.venue,
          duration: editing.duration,
          setupTime: editing.setupTime,
          totalCost: editing.totalCost,
          profit: editing.profit,
          musicianIds: editing.musicianIds,
          status: editing.status,
          notes: editing.notes ?? "",
          leadId: editing.leadId,
          proposalId: editing.proposalId,
        }
      : empty,
  );

  if (open && editing && form.title !== editing.title) {
    setForm({
      title: editing.title,
      eventDate: editing.eventDate.slice(0, 10),
      venue: editing.venue,
      duration: editing.duration,
      setupTime: editing.setupTime,
      totalCost: editing.totalCost,
      profit: editing.profit,
      musicianIds: editing.musicianIds,
      status: editing.status,
      notes: editing.notes ?? "",
      leadId: editing.leadId,
      proposalId: editing.proposalId,
    });
  }

  function toggleMusician(id: string) {
    setForm((f) => ({
      ...f,
      musicianIds: f.musicianIds.includes(id)
        ? f.musicianIds.filter((m) => m !== id)
        : [...f.musicianIds, id],
    }));
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) setForm(empty);
      }}
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{editing ? "Editar evento" : "Novo evento"}</DialogTitle>
          <DialogDescription>
            Defina data, local, músicos escalados e o custo total.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave({ ...form, eventDate: new Date(form.eventDate).toISOString() });
          }}
          className="grid gap-3 sm:grid-cols-2"
        >
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Título do evento</Label>
            <Input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Data</Label>
            <Input
              type="date"
              value={form.eventDate}
              onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Local</Label>
            <Input
              value={form.venue}
              onChange={(e) => setForm({ ...form, venue: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Duração (h)</Label>
            <Input
              type="number"
              step="0.5"
              min={0}
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Setup (h)</Label>
            <Input
              type="number"
              step="0.5"
              min={0}
              value={form.setupTime}
              onChange={(e) => setForm({ ...form, setupTime: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Custo total (R$)</Label>
            <Input
              type="number"
              min={0}
              value={form.totalCost}
              onChange={(e) => setForm({ ...form, totalCost: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Lucro previsto (R$)</Label>
            <Input
              type="number"
              min={0}
              value={form.profit}
              onChange={(e) => setForm({ ...form, profit: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Status</Label>
            <Select
              value={form.status}
              onValueChange={(v) => setForm({ ...form, status: v as EventBooking["status"] })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(STATUS_LABEL).map(([k, v]) => (
                  <SelectItem key={k} value={k}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Músicos escalados</Label>
            <div className="grid gap-1.5 sm:grid-cols-2">
              {musicians.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => toggleMusician(m.id)}
                  className={`flex items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                    form.musicianIds.includes(m.id)
                      ? "border-[var(--primary)] bg-[var(--primary)]/10"
                      : "border-[var(--border)] hover:bg-[var(--secondary)]"
                  }`}
                >
                  <div>
                    <div className="text-sm font-medium">{m.name}</div>
                    <div className="text-xs text-[var(--muted-foreground)]">{m.instrument}</div>
                  </div>
                  {form.musicianIds.includes(m.id) && (
                    <Badge variant="accent" className="text-[10px]">
                      Escalado
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Notas</Label>
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
              {editing ? "Salvar" : "Criar evento"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
