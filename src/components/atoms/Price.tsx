import { cn } from "@/lib/utils";

interface PriceProps {
  children: React.ReactNode;
  tone?: "saffron" | "ink" | "muted";
  className?: string;
}

const TONE = {
  saffron: "text-saffron",
  ink: "text-ink",
  muted: "text-muted",
} as const;

/** Monospace price / numeric label. */
export function Price({ children, tone = "saffron", className }: PriceProps) {
  return (
    <span className={cn("whitespace-nowrap font-mono font-semibold", TONE[tone], className)}>
      {children}
    </span>
  );
}
