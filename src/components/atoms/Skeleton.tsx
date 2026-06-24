import { cn } from "@/lib/utils";

/** Shimmering placeholder bar. */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("sf-skel rounded-full", className)} />;
}
