"use client";

import Link from "next/link";
import { FileSignature, CheckCircle2, AlertCircle, FileText } from "lucide-react";
import { useStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/page-header";
import { formatBRL, formatDate } from "@/lib/utils";
import { PAYMENT_STATUS_LABEL, paymentStatusVariant } from "@/lib/labels";

export default function ContractsPage() {
  const contracts = useStore((s) => s.contracts);
  const bookings = useStore((s) => s.bookings);

  const totalValue = contracts.reduce((a, c) => a + c.totalValue, 0);
  const signedCount = contracts.filter((c) => c.signedAt).length;
  const pendingCount = contracts.filter((c) => c.paymentStatus !== "PAID").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contratos"
        description="Assinatura digital, status de pagamento e arquivo final."
      />

      <div className="grid gap-3 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
              Valor total contratado
              <FileSignature className="h-3.5 w-3.5 text-[var(--primary)]" />
            </div>
            <div className="mt-1 text-2xl font-bold">{formatBRL(totalValue)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
              Contratos assinados
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            </div>
            <div className="mt-1 text-2xl font-bold">{signedCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
              Pendentes pagamento
              <AlertCircle className="h-3.5 w-3.5 text-amber-400" />
            </div>
            <div className="mt-1 text-2xl font-bold">{pendingCount}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-[var(--border)] text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
                <tr>
                  <th className="px-4 py-3 text-left">Contrato</th>
                  <th className="hidden px-4 py-3 text-left md:table-cell">Evento</th>
                  <th className="px-4 py-3 text-left">Valor</th>
                  <th className="hidden px-4 py-3 text-left lg:table-cell">Parcelas</th>
                  <th className="hidden px-4 py-3 text-left md:table-cell">Assinado em</th>
                  <th className="px-4 py-3 text-left">Pagamento</th>
                  <th className="px-4 py-3 text-right">Arquivo</th>
                </tr>
              </thead>
              <tbody>
                {contracts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center text-[var(--muted-foreground)]">
                      Nenhum contrato emitido ainda.
                    </td>
                  </tr>
                ) : (
                  contracts.map((c) => {
                    const booking = bookings.find((b) => b.id === c.bookingId);
                    return (
                      <tr key={c.id} className="border-b border-[var(--border)]">
                        <td className="px-4 py-3 font-medium">{c.id.toUpperCase().slice(0, 10)}</td>
                        <td className="hidden px-4 py-3 md:table-cell">
                          <div>{booking?.title ?? "—"}</div>
                          <div className="text-xs text-[var(--muted-foreground)]">
                            {booking ? formatDate(booking.eventDate) : ""}
                          </div>
                        </td>
                        <td className="px-4 py-3 font-semibold">{formatBRL(c.totalValue)}</td>
                        <td className="hidden px-4 py-3 lg:table-cell">{c.installmentCount}x</td>
                        <td className="hidden px-4 py-3 md:table-cell">
                          {c.signedAt ? (
                            formatDate(c.signedAt)
                          ) : (
                            <Badge variant="warning">Aguardando</Badge>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={paymentStatusVariant(c.paymentStatus)}>
                            {PAYMENT_STATUS_LABEL[c.paymentStatus]}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-right">
                          {c.fileUrl ? (
                            <Link href={c.fileUrl}>
                              <Button variant="ghost" size="icon">
                                <FileText className="h-3.5 w-3.5" />
                              </Button>
                            </Link>
                          ) : (
                            <span className="text-xs text-[var(--muted-foreground)]">—</span>
                          )}
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
