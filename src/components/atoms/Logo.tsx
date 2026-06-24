import { cn } from "@/lib/utils";

/** The Saffra "S" monogram on an ink tile. */
export function Logo({ size = 38, className }: { size?: number; className?: string }) {
  return (
    <div
      className={cn("flex flex-none items-center justify-center bg-ink", className)}
      style={{ width: size, height: size, borderRadius: Math.round(size * 0.32) }}
    >
      <span
        className="font-display font-bold text-saffron"
        style={{ fontSize: Math.round(size * 0.5) }}
      >
        S
      </span>
    </div>
  );
}
