import { cn } from "@/lib/utils";

/** Saffron "Table 12" pill. */
export function TableBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-[rgba(232,146,12,0.14)] px-[11px] py-1 font-mono text-[11px] font-semibold text-saffron-dark",
        className,
      )}
    >
      {children}
    </span>
  );
}
