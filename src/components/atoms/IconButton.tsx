import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: number;
}

/** Round sand-coloured action button (back arrow, bell, close, …). */
export function IconButton({ size = 36, className, children, ...rest }: IconButtonProps) {
  return (
    <button
      className={cn(
        "flex flex-none cursor-pointer items-center justify-center rounded-full border-0 bg-sand text-ink",
        className,
      )}
      style={{ width: size, height: size }}
      {...rest}
    >
      {children}
    </button>
  );
}
