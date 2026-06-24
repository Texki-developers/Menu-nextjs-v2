"use client";

import { cn } from "@/lib/utils";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** tall sheet that fills 90% of the frame (item detail) */
  full?: boolean;
  className?: string;
}

/** Backdrop + slide-up sheet, mounted inside the phone container. */
export function BottomSheet({ open, onClose, children, full, className }: BottomSheetProps) {
  if (!open) return null;
  return (
    <>
      <div
        onClick={onClose}
        className="absolute inset-0 z-[100] bg-[rgba(36,27,22,0.55)]"
        aria-hidden
      />
      <div
        className={cn(
          "animate-sheet absolute inset-x-0 bottom-0 z-[101] flex flex-col overflow-hidden rounded-t-[28px] bg-surface",
          full && "h-[90%]",
          className,
        )}
      >
        {children}
      </div>
    </>
  );
}

/** Centered grab handle used at the top of a sheet. */
export function SheetHandle({ className }: { className?: string }) {
  return (
    <div className={cn("mx-auto h-1 w-10 rounded-full bg-[rgba(36,27,22,0.18)]", className)} />
  );
}
