import type { ToastType } from "@/store/toast.store";

const BG: Record<ToastType, string> = {
  ok: "bg-ink",
  err: "bg-pom",
  ready: "bg-green",
};

const ICON: Record<ToastType, string> = {
  ok: "✓",
  err: "✕",
  ready: "✓",
};

export function Toast({ msg, type }: { msg: string; type: ToastType }) {
  return (
    <div className="animate-rise absolute inset-x-4 bottom-[108px] z-[90]">
      <div
        className={`flex items-center gap-[10px] rounded-[14px] px-4 py-[13px] text-sm font-medium text-white shadow-[0_10px_28px_rgba(36,27,22,0.28)] ${BG[type]}`}
      >
        <span>{ICON[type]}</span>
        <span className="flex-1">{msg}</span>
      </div>
    </div>
  );
}
