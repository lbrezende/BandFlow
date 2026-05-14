"use client";

import { Wallet, TrendingUp, Clock } from "lucide-react";
import { useStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/dashboard/page-header";
import { formatBRL, formatDate } from "@/lib/utils";
import {
  PAYMENT_METHOD_LABEL,
  PAYMENT_STATUS_LABEL,
  paymentStatusVariant,
} from "@/lib/labels";

export default function PaymentsPage() {
  const payments = useStore((s) => s.payments);
  const contracts = useStore((s) => s.contracts);
  const bookings = useStore((s) => s.bookings);

  const sortedPayments = [...payments].sort(
    (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime(),
  );

  const totalReceived = payments
    .filter((p) => p.status === "PAID")
    .reduce((a, p) => a + p.amount, 0);
  const pending = payments
    .filter((p) => p.status === "PENDING" || p.status === "LATE")
    .reduce((a, p) => a + p.amount, 0);
  const late = payments.filter((p) => p.status === "LATE").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pagamentos"
        description="Acompanhe entradas, parcelas e inadimplência."
      />

      <div className="grid gap-3 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
              Recebido
              <Wallet className="h-3.5 w-3.5 text-emerald-400" />
            </div>
            <div className="mt-1 text-2xl font-bold text-emerald-400">
              {formatBRL(totalReceived)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
              Em aberto
              <TrendingUp className="h-3.5 w-3.5 text-[var(--accent)]" />
            </div>
            <div className="mt-1 text-2xl font-bold">{formatBRL(pending)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
              Atrasados
              <Clock className="h-3.5 w-3.5 text-red-400" />
            </div>
            <div className="mt-1 text-2xl font-bold">{late}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-[var(--border)] text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
                <tr>
                  <th className="px-4 py-3 text-left">Evento</th>
                  <th className="px-4 py-3 text-left">Parcela</th>
                  <th className="px-4 py-3 text-left">Valor</th>
                  <th className="hidden px-4 py-3 text-left md:table-cell">Método</th>
                  <th className="px-4 py-3 text-left">Vencimento</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedPayments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-[var(--muted-foreground)]">
                      Nenhum pagamento registrado.
                    </td>
                  </tr>
                ) : (
                  sortedPayments.map((p) => {
                    const contract = contracts.find((c) => c.id === p.contractId);
                    const booking = contract
                      ? bookings.find((b) => b.id === contract.bookingId)
                      : undefined;
                    return (
                      <tr key={p.id} className="border-b border-[var(--border)]">
                        <td className="px-4 py-3 font-medium">{booking?.title ?? "—"}</td>
                        <td className="px-4 py-3">
                          {p.installmentNumber}/{contract?.installmentCount ?? "?"}
                        </td>
                        <td className="px-4 py-3 font-semibold">{formatBRL(p.amount)}</td>
                        <td className="hidden px-4 py-3 md:table-cell text-[var(--muted-foreground)]">
                          {PAYMENT_METHOD_LABEL[p.method]}
                        </td>
                        <td className="px-4 py-3 text-[var(--muted-foreground)]">
                          {formatDate(p.dueDate)}
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={paymentStatusVariant(p.status)}>
                            {PAYMENT_STATUS_LABEL[p.status]}
                          </Badge>
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
    </div>
  );
}
