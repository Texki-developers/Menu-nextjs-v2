import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

/** Pill used for category filters, recent searches and quick filters. */
export function Chip({ active, className, children, ...rest }: ChipProps) {
  return (
    <button
      className={cn(
        "flex-none whitespace-nowrap rounded-full border-0 px-[14px] py-2 text-[13px] font-semibold transition",
        rest.onClick && "cursor-pointer",
        active ? "bg-saffron text-white" : "bg-sand text-muted",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
