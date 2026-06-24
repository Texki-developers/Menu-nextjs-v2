import { cn } from "@/lib/utils";

interface PhotoProps {
  tint: [string, string];
  className?: string;
  children?: React.ReactNode;
  /** show the small camera glyph (image slot marker) */
  cameraGlyph?: boolean;
}

/**
 * Gradient placeholder for a dish photo. Reused by menu cards, search rows,
 * cart lines, the detail sheet header and chef picks. Swap the gradient for a
 * real <Image> when the API is wired.
 */
export function Photo({ tint, className, children, cameraGlyph }: PhotoProps) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ background: `linear-gradient(135deg, ${tint[0]}, ${tint[1]})` }}
    >
      {cameraGlyph && (
        <span className="absolute end-3 top-[10px] text-[15px] text-[rgba(36,27,22,0.3)]">📷</span>
      )}
      {children}
    </div>
  );
}
