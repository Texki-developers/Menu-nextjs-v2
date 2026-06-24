import { create } from "zustand";

export type ToastType = "ok" | "err" | "ready";

export interface Toast {
  msg: string;
  type: ToastType;
}

interface ToastState {
  toast: Toast | null;
  show: (msg: string, type?: ToastType) => void;
  hide: () => void;
}

let timer: ReturnType<typeof setTimeout> | null = null;

export const useToast = create<ToastState>((set) => ({
  toast: null,
  show: (msg, type = "ok") => {
    if (timer) clearTimeout(timer);
    set({ toast: { msg, type } });
    timer = setTimeout(() => set({ toast: null }), 2400);
  },
  hide: () => {
    if (timer) clearTimeout(timer);
    set({ toast: null });
  },
}));
