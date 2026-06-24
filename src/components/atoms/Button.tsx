import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "dark" | "ghost" | "dashed";
type Size = "sm" | "md" | "lg";

const VARIANT: Record<Variant, string> = {
  primary: "bg-saffron text-white shadow-[0_8px_18px_rgba(232,146,12,0.3)]",
  secondary: "bg-sand text-ink",
  dark: "bg-ink text-white",
  ghost: "bg-transparent text-muted",
  dashed: "bg-transparent border border-dashed border-[#DCCFBE] text-muted",
};

const SIZE: Record<Size, string> = {
  sm: "text-[13px] py-[9px] px-3",
  md: "text-sm py-3 px-[18px]",
  lg: "text-[15px] py-[14px] px-5",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  block?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  block,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[14px] border-0 font-semibold transition active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-50",
        VARIANT[variant],
        SIZE[size],
        block && "w-full",
        rest.disabled ? "" : "cursor-pointer",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
