import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center gap-3 py-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--secondary)]">
          <Icon className="h-5 w-5 text-[var(--muted-foreground)]" />
        </div>
        <div>
          <div className="text-base font-semibold">{title}</div>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">{description}</p>
        </div>
        {action}
      </CardContent>
    </Card>
  );
}
