import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "purple" | "cream" | "ghost";

const styles: Record<Variant, { bg: string; text: string; iconBg: string; iconText: string }> = {
  purple: {
    bg: "bg-[#5630f0]",
    text: "text-white",
    iconBg: "bg-white",
    iconText: "text-[#5630f0]",
  },
  cream: {
    bg: "bg-[#fcfaf5]",
    text: "text-[#0c1a18]",
    iconBg: "bg-[#5630f0]",
    iconText: "text-white",
  },
  ghost: {
    bg: "bg-transparent border border-[rgba(255,255,255,0.18)]",
    text: "text-white",
    iconBg: "bg-white",
    iconText: "text-[#0c1a18]",
  },
};

export function PillButton({
  children,
  href,
  variant = "purple",
  size = "md",
  className,
}: {
  children: React.ReactNode;
  href: string;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const s = styles[variant];
  const sizeCls =
    size === "lg"
      ? "py-2 pl-2 pr-7 text-base"
      : size === "sm"
        ? "py-1 pl-1 pr-4 text-xs"
        : "py-1.5 pl-1.5 pr-6 text-sm";
  const iconSize = size === "lg" ? "h-9 w-9" : size === "sm" ? "h-6 w-6" : "h-7 w-7";

  return (
    <Link
      href={href}
      className={cn(
        "v2-pill-shadow inline-flex items-center gap-3 rounded-full font-semibold tracking-tight transition-transform hover:-translate-y-0.5",
        s.bg,
        s.text,
        sizeCls,
        className,
      )}
    >
      <span className={cn("inline-flex items-center justify-center rounded-full", s.iconBg, iconSize)}>
        <ArrowRight className={cn("h-3.5 w-3.5", s.iconText)} />
      </span>
      <span>{children}</span>
    </Link>
  );
}
