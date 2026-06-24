import { cn } from "@/lib/utils";

interface AvatarProps {
  ini: string;
  color: string;
  size?: number;
  /** show a ring border (used when overlapping in a stack) */
  ring?: boolean;
  ringColor?: string;
  className?: string;
}

export function Avatar({ ini, color, size = 32, ring, ringColor = "#fff", className }: AvatarProps) {
  return (
    <div
      className={cn(
        "flex flex-none items-center justify-center rounded-full font-mono font-semibold text-white",
        className,
      )}
      style={{
        width: size,
        height: size,
        background: color,
        fontSize: Math.round(size * 0.34),
        border: ring ? `2px solid ${ringColor}` : undefined,
      }}
    >
      {ini}
    </div>
  );
}
