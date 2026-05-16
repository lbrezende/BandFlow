import { V2AppShell } from "@/components/v2/app-shell";

export default function V2AppLayout({ children }: { children: React.ReactNode }) {
  return <V2AppShell>{children}</V2AppShell>;
}
